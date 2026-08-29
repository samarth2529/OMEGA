import edge_tts
import base64

async def stream_tts(text: str, voice: str = "en-US-ChristopherNeural"):
    """
    Takes a string of text and yields a single base64 encoded MP3 audio chunk.
    """
    communicate = edge_tts.Communicate(text, voice)
    full_audio = b""
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            full_audio += chunk["data"]
            
    if full_audio:
        yield base64.b64encode(full_audio).decode('utf-8')

