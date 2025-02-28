# utils/aws_sns_utils.py
import os
import boto3
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter('[%(asctime)s] %(levelname)s in %(module)s: %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

class AWSSNSClient:
    def __init__(self, region_name=None):
        self.region_name = region_name or os.getenv('AWS_REGION', 'us-east-1')
        try:
            self.client = boto3.client('sns', region_name=self.region_name)
            logger.info(f"Initialized AWS SNS client in region {self.region_name}")
        except Exception as e:
            logger.error("Failed to initialize AWS SNS client", exc_info=True)
            raise e

    def send_otp(self, phone_number, otp_code):
        message = f"Your OTP is: {otp_code}"
        try:
            response = self.client.publish(
                PhoneNumber=phone_number,
                Message=message
            )
            logger.info(f"Successfully sent OTP via SNS: {response}")
            return response
        except Exception as e:
            logger.error("Error sending OTP via AWS SNS", exc_info=True)
            raise e
