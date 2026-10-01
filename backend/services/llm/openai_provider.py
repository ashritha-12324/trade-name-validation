import base64
import io
import PIL.Image
from typing import List
from .base_provider import BaseVisionProvider
from config import settings


def _pil_to_base64_url(image: PIL.Image.Image) -> str:
    buf = io.BytesIO()
    image.save(buf, format="PNG")
    b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{b64}"


class OpenAIProvider(BaseVisionProvider):
    """OpenAI and OpenAI-compatible provider (LM Studio, vLLM, Together AI, etc.)"""

    def __init__(self):
        from openai import AsyncOpenAI
        self.client = AsyncOpenAI(
            api_key=settings.OPENAI_API_KEY or "not-needed",
            base_url=settings.OPENAI_BASE_URL,
        )
        self.model = settings.OPENAI_MODEL

    async def analyze_document(
        self, images: List[PIL.Image.Image], prompt: str
    ) -> str:
        content = [{"type": "text", "text": prompt}]
        for img in images:
            content.append({
                "type": "image_url",
                "image_url": {
                    "url": _pil_to_base64_url(img),
                    "detail": "high",
                },
            })

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": content}],
            response_format={"type": "json_object"},
            max_tokens=4096,
        )
        return response.choices[0].message.content

    async def health_check(self) -> dict:
        try:
            models = await self.client.models.list()
            return {
                "status": "ok",
                "provider": "openai_compatible",
                "model": self.model,
                "base_url": settings.OPENAI_BASE_URL,
                "available_models": [m.id for m in models.data[:10]],
            }
        except Exception as e:
            return {
                "status": "error",
                "provider": "openai_compatible",
                "error": str(e),
            }
