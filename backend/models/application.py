from pydantic import BaseModel
from typing import List, Optional


class ApplicationSubmission(BaseModel):
    # Applicant
    email: str
    mobile: str
    emirates_id: str

    # Ibdaa Details
    trade_name: str
    main_activity: str
    activity_sections: List[str]
    social_media_account: str
    license_mobile_number: str
    license_email: str
    social_media_url: str

    # Location
    location: str
    address: str
    makani_number: str

    # Meta
    terms_accepted: bool
