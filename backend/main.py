from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio
import json
from core.config import settings
from core.conversation import ConversationEngine
from core.mode_manager import ModeManager
from core.spider_sense import SpiderSense
from llm.gemini_provider import GeminiProvider
from telemetry import telemetry_service

app = FastAPI(title=settings.PROJECT_NAME)

active_connections = []

async def broadcast_telemetry():
    while True:
        if active_connections:
            data = telemetry_service.get_system_metrics()
            payload = json.dumps(data)
            for connection in active_connections:
                try:
                    await connection.send_text(payload)
                except:
                    pass
        await asyncio.sleep(2) # Send telemetry every 2 seconds

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(broadcast_telemetry())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Core Components
llm_provider = None
conversation_engine = None
mode_manager = ModeManager()

async def spider_sense_alert(message: str):
    print(f"[SPIDER SENSE] {message}")
    # We would broadcast this to the active websocket connection here
    pass

spider_sense = SpiderSense(callback=spider_sense_alert)

if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
    llm_provider = GeminiProvider(api_key=settings.GEMINI_API_KEY)
    system_prompt = """You are OMEGA (Omnidirectional Multimodal Evolving General Autonomous Intelligence). 
You are a highly capable, calm, and concise personal AI assistant. 
Respond efficiently. Do not say 'How can I help you?'. Use short, precise confirmations. Keep your answers brief so they are pleasant to hear out loud.

CRITICAL INSTRUCTION:
You have the ability to dynamically construct and control your UI workspace. 
When you need to show the user visual information (like System Status, Vision Analysis, Terminal, Data, Memory, etc) or when the user asks you to manipulate the UI, you MUST output a <UI_COMMAND> block containing a JSON instruction.
Valid command types: CREATE_SURFACE, CLOSE_SURFACE, CLOSE_ALL_SURFACES.
Valid surface types: SYSTEM, VISION, TERMINAL, DATA, MEMORY, TASK, ALERT, CODE.

Format exactly like this:
<UI_COMMAND>
{
  "command": "CREATE_SURFACE",
  "type": "SYSTEM",
  "title": "SYSTEM DIAGNOSTICS",
  "data": {"cpu": "24%", "ram": "45%"}
}
</UI_COMMAND>

You can intersperse this block within your spoken response. Ensure it is valid JSON."""
    conversation_engine = ConversationEngine(provider=llm_provider, system_prompt=system_prompt)
else:
    print("WARNING: GEMINI_API_KEY not set. OMEGA logic will be disabled.")

@app.get("/")
def read_root():
    return {"status": "OMEGA execution engine is online."}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if not conversation_engine:
                await websocket.send_text(json.dumps({"type": "error", "data": "Gemini API Key is missing. OMEGA cannot process requests."}))
                continue
                
            try:
                payload = json.loads(data)
                
                if payload.get("type") == "image":
                    img_data = payload.get("data")
                    source = payload.get("source", "camera")
                    conversation_engine.context.add_image(img_data)
                    await spider_sense.analyze_frame(img_data, source)
                    continue
                elif payload.get("type") == "text":
                    user_text = payload.get("data")
                    async for msg_json in conversation_engine.process_input_stream(user_text):
                        await websocket.send_text(msg_json)
                    await websocket.send_text(json.dumps({"type": "done"}))
                    
            except json.JSONDecodeError:
                # Fallback for plain text
                try:
                    async for msg_json in conversation_engine.process_input_stream(data):
                        await websocket.send_text(msg_json)
                    await websocket.send_text(json.dumps({"type": "done"}))
                except Exception as e:
                    print(f"LLM Error: {e}")
                    await websocket.send_text(json.dumps({"type": "error", "data": f"Something went wrong processing your request. {e}"}))
            except Exception as e:
                print(f"LLM Error: {e}")
                await websocket.send_text(json.dumps({"type": "error", "data": f"Something went wrong processing your request. {e}"}))
    except WebSocketDisconnect:
        print("Client disconnected")
    finally:
        if websocket in active_connections:
            active_connections.remove(websocket)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
