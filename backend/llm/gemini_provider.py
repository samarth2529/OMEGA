import os
from typing import AsyncGenerator
from google import genai
from google.genai import types
from .provider_interface import LLMProvider

class GeminiProvider(LLMProvider):
    def __init__(self, api_key: str, model: str = "gemini-3.5-flash"):
        self.client = genai.Client(api_key=api_key)
        self.model = model

    def _convert_history(self, history: list[dict]) -> list[types.Content]:
        contents = []
        for msg in history:
            role = "user" if msg["role"] == "user" else "model"
            parts = []
            
            # Handle text content
            if "content" in msg and msg["content"]:
                parts.append(types.Part.from_text(text=msg["content"]))
                
            # Handle image contents
            if "images" in msg and msg["images"]:
                for img_data in msg["images"]:
                    # img_data is assumed to be base64 data URL e.g., data:image/jpeg;base64,...
                    try:
                        mime_type, base64_str = img_data.split(';base64,')
                        mime_type = mime_type.replace('data:', '')
                        import base64
                        raw_bytes = base64.b64decode(base64_str)
                        parts.append(types.Part.from_bytes(data=raw_bytes, mime_type=mime_type))
                    except Exception as e:
                        print(f"Failed to parse image part: {e}")
            
            if parts:
                contents.append(types.Content(role=role, parts=parts))
        return contents

    async def generate_response(self, system_prompt: str, history: list[dict], user_input: str, images: list[str] = None) -> str:
        contents = self._convert_history(history)
        
        user_parts = []
        if user_input:
            user_parts.append(types.Part.from_text(text=user_input))
            
        if images:
            for img_data in images:
                try:
                    mime_type, base64_str = img_data.split(';base64,')
                    mime_type = mime_type.replace('data:', '')
                    import base64
                    raw_bytes = base64.b64decode(base64_str)
                    user_parts.append(types.Part.from_bytes(data=raw_bytes, mime_type=mime_type))
                except Exception as e:
                    print(f"Failed to parse user image part: {e}")
                    
        contents.append(types.Content(role="user", parts=user_parts))
        
        response = await self.client.aio.models.generate_content(
            model=self.model,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
            )
        )
        return response.text

    async def stream_response(self, system_prompt: str, history: list[dict], user_input: str, images: list[str] = None) -> AsyncGenerator[str, None]:
        contents = self._convert_history(history)
        
        user_parts = []
        if user_input:
            user_parts.append(types.Part.from_text(text=user_input))
            
        if images:
            for img_data in images:
                try:
                    mime_type, base64_str = img_data.split(';base64,')
                    mime_type = mime_type.replace('data:', '')
                    import base64
                    raw_bytes = base64.b64decode(base64_str)
                    user_parts.append(types.Part.from_bytes(data=raw_bytes, mime_type=mime_type))
                except Exception as e:
                    print(f"Failed to parse user image part: {e}")
                    
        contents.append(types.Content(role="user", parts=user_parts))
        
        response = await self.client.aio.models.generate_content_stream(
            model=self.model,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
            )
        )
        
        async for chunk in response:
            if chunk.text:
                yield chunk.text
