# otp_service.py
import logging

logger = logging.getLogger(__name__)

class BaseOTPService:
    def send_otp(self, phone_number, otp_code):
        raise NotImplementedError("Subclasses must implement send_otp()")

class DummyOTPService(BaseOTPService):
    def send_otp(self, phone_number, otp_code):
        # Simulate sending OTP by logging it
        logger.info(f"Dummy OTP sent to {phone_number}: {otp_code}")
        return {"Message": "Dummy OTP sent successfully."}

# Later, you can implement the AWS SNS version:
# from aws_sns_utils import AWSSNSClient
#
# class AWSSNSOTPService(BaseOTPService):
#     def __init__(self):
#         self.sns_client = AWSSNSClient()
#
#     def send_otp(self, phone_number, otp_code):
#         return self.sns_client.send_otp(phone_number, otp_code)
