import base64
import io
import httpx
import PIL.Image
from typing import List
from .base_provider import BaseVisionProvider
from config import settings


def _pil_to_base64(image: PIL.Image.Image) -> str:
    buf = io.BytesIO()
    image.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


class OllamaProvider(BaseVisionProvider):
    """Ollama local inference provider (supports qwen2.5vl, llava, etc.)"""

    def __init__(self):
        self.base_url = settings.OLLAMA_BASE_URL
        self.model = settings.OLLAMA_MODEL

    async def analyze_document(
        self, images: List[PIL.Image.Image], prompt: str
    ) -> str:
        images_b64 = [_pil_to_base64(img) for img in images]

        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "user",
                    "content": prompt,
                    "images": images_b64,
                }
            ],
            "stream": False,
            "format": "json",
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self.base_url}/api/chat", json=payload
            )
            response.raise_for_status()
            data = response.json()
            return data["message"]["content"]

    async def health_check(self) -> dict:
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                r = await client.get(f"{self.base_url}/api/tags")
                models = [m["name"] for m in r.json().get("models", [])]
                return {
                    "status": "ok",
                    "provider": "ollama",
                    "model": self.model,
                    "available_models": models,
                }
        except Exception as e:
            return {"status": "error", "provider": "ollama", "error": str(e)}
