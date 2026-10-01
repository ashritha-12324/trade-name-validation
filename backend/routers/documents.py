from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import List, Optional
import PIL.Image

from services.ocr_processor import convert_upload_to_images
from services.ai_extractor import extract_from_documents

router = APIRouter(prefix="/api/documents", tags=["documents"])


@router.post("/analyze")
async def analyze_documents(
    screenshot: Optional[UploadFile] = File(None),
    site_plan: Optional[UploadFile] = File(None),
    social_media_url: Optional[str] = Form(None),
):
    """
    Accept uploaded documents, run AI extraction, return field-level results.
    """
    all_images: List[PIL.Image.Image] = []

    for upload in [screenshot, site_plan]:
        if upload and upload.filename:
            content = await upload.read()
            if content:
                imgs = convert_upload_to_images(content, upload.filename)
                all_images.extend(imgs)

    if not all_images:
        raise HTTPException(
            status_code=400,
            detail="At least one document must be uploaded (screenshot or site plan).",
        )

    # Cap to 4 images to keep prompt size manageable
    all_images = all_images[:4]

    result = await extract_from_documents(all_images)
    return {"success": True, "extraction": result, "social_media_url": social_media_url}
