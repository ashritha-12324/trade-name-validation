from pydantic_settings import BaseSettings
from typing import Literal


class Settings(BaseSettings):
    # Provider selection
    LLM_PROVIDER: Literal["ollama", "groq", "gemini", "openai", "openai_compatible"] = "ollama"

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen2.5vl:7b"

    # Groq
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "meta-llama/llama-4-maverick-17b-128e-instruct"

    # Gemini
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # OpenAI / OpenAI-compatible
    OPENAI_API_KEY: str = ""
    OPENAI_BASE_URL: str = "https://api.openai.com/v1"
    OPENAI_MODEL: str = "gpt-4o"

    # App
    CORS_ORIGINS: str = "http://localhost:5173"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
