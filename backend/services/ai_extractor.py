import io
import json
import re
from typing import List
import PIL.Image

from services.llm.provider_factory import get_provider


EXTRACTION_PROMPT = """You are a document analysis AI for the UAE Department of Economic Development.
Analyze the provided document image(s) carefully and extract the following business license information.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{{
  "trade_name": {{"value": "", "confidence": 0.0}},
  "main_activity": {{"value": "", "confidence": 0.0}},
  "activity_sections": {{"value": [], "confidence": 0.0}},
  "social_media_account": {{"value": "", "confidence": 0.0}},
  "license_mobile_number": {{"value": "", "confidence": 0.0}},
  "license_email": {{"value": "", "confidence": 0.0}},
  "location": {{"value": "", "confidence": 0.0}},
  "address": {{"value": "", "confidence": 0.0}},
  "makani_number": {{"value": "", "confidence": 0.0}},
  "trade_name_arabic": {{"value": "", "confidence": 0.0}},
  "activity_arabic": {{"value": "", "confidence": 0.0}}
}}

Rules:
- confidence is a float between 0.0 and 1.0 (1.0 = certain, 0.0 = not found)
- For activity_sections: return an array of strings like ["12849 - Printing product design", "43469 - Social media marketing"]
- If a field is not found or unclear, set value to "" and confidence to 0.0
- Extract the social media handle/URL from any social media page screenshot
- For location/address, extract from any address, logo, or watermark visible in the document
- Do not hallucinate - only extract what is clearly visible in the document
"""


def _extract_json(text: str) -> dict:
    """Robustly extract JSON from LLM response text."""
    text = text.strip()
    # Remove markdown code fences
    text = re.sub(r"```(?:json)?", "", text).strip()
    # Find first { ... } block
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return json.loads(match.group())
    return json.loads(text)


async def extract_from_documents(images: List[PIL.Image.Image]) -> dict:
    """
    Run document extraction using the configured LLM provider.
    Returns a dict with field-level results: {field: {value, confidence, status}}
    """
    provider = get_provider()
    raw_response = await provider.analyze_document(images, EXTRACTION_PROMPT)

    try:
        extracted = _extract_json(raw_response)
    except Exception:
        # Return all empty on parse failure
        return _empty_result()

    result = {}
    for field, data in extracted.items():
        if isinstance(data, dict):
            value = data.get("value", "")
            confidence = float(data.get("confidence", 0.0))
        else:
            value = data
            confidence = 0.5

        if confidence >= 0.85:
            status = "auto_filled"
        elif confidence >= 0.5:
            status = "needs_review"
        else:
            status = "not_found"

        result[field] = {
            "value": value,
            "confidence": confidence,
            "status": status,
        }

    return result


def _empty_result() -> dict:
    fields = [
        "trade_name", "main_activity", "activity_sections",
        "social_media_account", "license_mobile_number", "license_email",
        "location", "address", "makani_number",
        "trade_name_arabic", "activity_arabic",
    ]
    return {
        f: {"value": "" if f != "activity_sections" else [], "confidence": 0.0, "status": "not_found"}
        for f in fields
    }
