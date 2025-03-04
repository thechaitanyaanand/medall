# accounts/ai_views.py
import requests
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

class ChatbotQueryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        query = request.data.get("query")
        # Replace with your actual Flask AI endpoint URL
        flask_url = "http://your-flask-service-url/ai-query/"
        try:
            response = requests.post(flask_url, json={"query": query})
            data = response.json()
            return Response(data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
