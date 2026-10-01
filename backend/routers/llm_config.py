from fastapi import APIRouter
from config import settings
from services.llm.provider_factory import get_provider

router = APIRouter(prefix="/api/llm", tags=["llm"])

PROVIDERS = ["ollama", "groq", "gemini", "openai", "openai_compatible"]


@router.get("/health")
async def llm_health():
    """Check current LLM provider health."""
    try:
        provider = get_provider()
        result = await provider.health_check()
        return result
    except Exception as e:
        return {"status": "error", "error": str(e)}


@router.get("/providers")
async def list_providers():
    """Return list of available providers and current config."""
    return {
        "current_provider": settings.LLM_PROVIDER,
        "available_providers": PROVIDERS,
        "config": {
            "ollama": {
                "base_url": settings.OLLAMA_BASE_URL,
                "model": settings.OLLAMA_MODEL,
            },
            "groq": {
                "model": settings.GROQ_MODEL,
                "has_key": bool(settings.GROQ_API_KEY),
            },
            "gemini": {
                "model": settings.GEMINI_MODEL,
                "has_key": bool(settings.GEMINI_API_KEY),
            },
            "openai": {
                "base_url": settings.OPENAI_BASE_URL,
                "model": settings.OPENAI_MODEL,
                "has_key": bool(settings.OPENAI_API_KEY),
            },
        },
    }
