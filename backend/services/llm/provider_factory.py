from config import settings
from .base_provider import BaseVisionProvider


def get_provider() -> BaseVisionProvider:
    """Factory: reads LLM_PROVIDER env var and returns correct provider instance."""
    provider = settings.LLM_PROVIDER.lower()

    if provider == "ollama":
        from .ollama_provider import OllamaProvider
        return OllamaProvider()

    elif provider == "groq":
        from .groq_provider import GroqProvider
        return GroqProvider()

    elif provider == "gemini":
        from .gemini_provider import GeminiProvider
        return GeminiProvider()

    elif provider in ("openai", "openai_compatible"):
        from .openai_provider import OpenAIProvider
        return OpenAIProvider()

    else:
        raise ValueError(
            f"Unknown LLM_PROVIDER='{provider}'. "
            f"Valid options: ollama, groq, gemini, openai, openai_compatible"
        )
