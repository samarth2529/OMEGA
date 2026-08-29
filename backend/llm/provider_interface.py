from abc import ABC, abstractmethod
from typing import AsyncGenerator

class LLMProvider(ABC):
    @abstractmethod
    async def generate_response(self, system_prompt: str, history: list[dict], user_input: str) -> str:
        pass

    @abstractmethod
    async def stream_response(self, system_prompt: str, history: list[dict], user_input: str) -> AsyncGenerator[str, None]:
        pass
