import uuid
from fastapi import APIRouter, HTTPException
from models.application import ApplicationSubmission

router = APIRouter(prefix="/api/license", tags=["license"])


@router.post("/submit")
async def submit_application(payload: ApplicationSubmission):
    """Accept final reviewed application and return confirmation reference."""
    if not payload.terms_accepted:
        raise HTTPException(status_code=400, detail="Terms and conditions must be accepted.")

    ref_number = f"UAQ-IBDAA-{uuid.uuid4().hex[:8].upper()}"
    return {
        "success": True,
        "reference_number": ref_number,
        "message": "Your Ibdaa License application has been submitted successfully.",
        "trade_name": payload.trade_name,
        "status": "under_review",
    }
