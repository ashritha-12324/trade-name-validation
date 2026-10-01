import base64
import io
import PIL.Image
from typing import List
from .base_provider import BaseVisionProvider
from config import settings


def _pil_to_base64(image: PIL.Image.Image) -> str:
    buf = io.BytesIO()
    image.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


class GeminiProvider(BaseVisionProvider):
    """Google Gemini Vision API provider."""

    def __init__(self):
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model_name = settings.GEMINI_MODEL
        self.genai = genai

    async def analyze_document(
        self, images: List[PIL.Image.Image], prompt: str
    ) -> str:
        import asyncio
        model = self.genai.GenerativeModel(self.model_name)
        parts = [prompt] + images  # Gemini accepts PIL images directly

        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None, lambda: model.generate_content(parts)
        )
        text = response.text.strip()
        # Strip markdown code fences if present
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        return text.strip()

    async def health_check(self) -> dict:
        try:
            import asyncio
            models_list = await asyncio.get_event_loop().run_in_executor(
                None, lambda: list(self.genai.list_models())
            )
            return {
                "status": "ok",
                "provider": "gemini",
                "model": self.model_name,
                "available_models": [m.name for m in models_list[:5]],
            }
        except Exception as e:
            return {"status": "error", "provider": "gemini", "error": str(e)}
