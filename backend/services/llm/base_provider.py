from abc import ABC, abstractmethod
from typing import List
import PIL.Image


class BaseVisionProvider(ABC):
    """Abstract base class for all LLM vision providers."""

    @abstractmethod
    async def analyze_document(
        self,
        images: List[PIL.Image.Image],
        prompt: str,
    ) -> str:
        """
        Analyze document images and return raw LLM response text (expected JSON).

        Args:
            images: List of PIL Image objects (one per page/document)
            prompt: Dynamic extraction prompt built per form context

        Returns:
            Raw text response from the LLM (should be valid JSON)
        """
        ...

    @abstractmethod
    async def health_check(self) -> dict:
        """Check if the provider is reachable and configured correctly."""
        ...
