from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class ChatbotQueryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user_query = request.data.get('query')
        if not user_query:
            return Response({"error": "Query not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        payload = {
            "model": "deepseek-r1:7b",
            "prompt": user_query,
            "max_tokens": 1500,
            "temperature": 0.7
        }
        
        try:
            llm_response = requests.post("http://localhost:11434/api/generate", json=payload, stream=True)

            if llm_response.status_code == 200:
                response_text = ""
                
                # Read the streaming response line by line
                for line in llm_response.iter_lines():
                    if line:
                        try:
                            data = requests.utils.json.loads(line)
                            if "response" in data:
                                response_text += data["response"]
                        except Exception as e:
                            print(f"JSON parsing error: {e}")

                return Response({"response": response_text.strip()}, status=status.HTTP_200_OK)

            else:
                return Response({
                    "error": "LLM returned an error.",
                    "details": llm_response.text
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            import traceback
            return Response({
                "error": "Failed to connect to the LLM service.",
                "details": str(e),
                "traceback": traceback.format_exc()
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
