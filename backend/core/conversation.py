import asyncio
import json
import re
from pydantic import BaseModel
from llm.provider_interface import LLMProvider
from tts.tts_provider import stream_tts

class ConversationContext(BaseModel):
    history: list[dict] = []
    recent_images: list[str] = []
    max_turns: int = 20
    max_images: int = 5

    def add_image(self, image_b64: str):
        self.recent_images.append(image_b64)
        if len(self.recent_images) > self.max_images:
            self.recent_images.pop(0)
            
    def get_images(self) -> list[str]:
        return list(self.recent_images)

    def add_user_message(self, content: str, images: list[str] = None):
        msg = {"role": "user", "content": content}
        if images:
            msg["images"] = images
        self.history.append(msg)
        self._trim()

    def add_ai_message(self, content: str):
        self.history.append({"role": "assistant", "content": content})
        self._trim()

    def _trim(self):
        if len(self.history) > self.max_turns:
            self.history = self.history[-self.max_turns:]

class ConversationEngine:
    def __init__(self, provider: LLMProvider, system_prompt: str):
        self.provider = provider
        self.system_prompt = system_prompt
        self.context = ConversationContext()

    async def process_input_stream(self, user_input: str):
        images = self.context.get_images()
        self.context.add_user_message(user_input, images)
        
        full_response = ""
        sentence_buffer = ""
        history_for_llm = self.context.history[:-1]
        
        parsing_buffer = ""
        in_ui_block = False
        ui_block_text = ""
        
        async for chunk in self.provider.stream_response(self.system_prompt, history_for_llm, user_input, images):
            full_response += chunk
            parsing_buffer += chunk
            
            while True:
                if not in_ui_block:
                    if "<UI_COMMAND>" in parsing_buffer:
                        split_parts = parsing_buffer.split("<UI_COMMAND>", 1)
                        text_before = split_parts[0]
                        
                        if text_before:
                            sentence_buffer += text_before
                            yield json.dumps({"type": "text", "data": text_before})
                            
                        parsing_buffer = split_parts[1]
                        in_ui_block = True
                        ui_block_text = ""
                    else:
                        possible_tag = False
                        # Check if parsing_buffer ends with a partial "<UI_COMMAND>" tag
                        tag_str = "<UI_COMMAND>"
                        for i in range(1, len(tag_str)):
                            if parsing_buffer.endswith(tag_str[:i]):
                                possible_tag = True
                                break
                        
                        if possible_tag:
                            # Flush safe prefix, keep suffix
                            flush_idx = len(parsing_buffer) - i
                            if flush_idx > 0:
                                safe_text = parsing_buffer[:flush_idx]
                                sentence_buffer += safe_text
                                yield json.dumps({"type": "text", "data": safe_text})
                                parsing_buffer = parsing_buffer[flush_idx:]
                            break # Wait for more chunks
                        else:
                            # Safe to flush completely
                            if parsing_buffer:
                                sentence_buffer += parsing_buffer
                                yield json.dumps({"type": "text", "data": parsing_buffer})
                            parsing_buffer = ""
                            break
                else:
                    if "</UI_COMMAND>" in parsing_buffer:
                        split_parts = parsing_buffer.split("</UI_COMMAND>", 1)
                        ui_block_text += split_parts[0]
                        
                        try:
                            cmd_json = json.loads(ui_block_text.strip())
                            yield json.dumps({"type": "ui_command", "data": cmd_json})
                        except Exception as e:
                            print(f"Failed to parse UI_COMMAND JSON: {e}")
                            
                        parsing_buffer = split_parts[1]
                        in_ui_block = False
                    else:
                        ui_block_text += parsing_buffer
                        parsing_buffer = ""
                        break

            # Voice Sentence Boundary Logic
            if re.search(r'([.!?]\s+|\n)$', sentence_buffer) or len(sentence_buffer) > 120:
                text_to_speak = sentence_buffer.strip()
                sentence_buffer = ""
                text_to_speak = text_to_speak.replace("*", "")
                if text_to_speak:
                    async for audio_b64 in stream_tts(text_to_speak):
                        yield json.dumps({"type": "audio", "data": audio_b64})

        # Flush remaining sentence buffer
        if sentence_buffer.strip():
            text_to_speak = sentence_buffer.strip().replace("*", "")
            async for audio_b64 in stream_tts(text_to_speak):
                yield json.dumps({"type": "audio", "data": audio_b64})
                
        self.context.add_ai_message(full_response)
