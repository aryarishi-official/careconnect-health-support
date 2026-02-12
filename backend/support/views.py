from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services.chatbot_engine import ChatbotEngine

from .models import PatientRequest, Volunteer, ContactMessage
from .serializers import (
    PatientRequestSerializer,
    VolunteerSerializer,
    ContactSerializer
)
@api_view(['POST'])
def create_patient_request(request):
    serializer = PatientRequestSerializer(data=request.data)

    if serializer.is_valid():
        patient = serializer.save()

        # Auto Summary Logic
        summary = (
            f"{patient.urgency.capitalize()} urgency "
            f"{patient.get_support_type_display()} request "
            f"from {patient.location}. "
            f"Contact provided."
        )

        patient.summary = summary
        patient.save()

        return Response({
            "message": "Request submitted successfully.",
            "summary": summary
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_volunteer(request):
    serializer = VolunteerSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Volunteer registered successfully."},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Message sent successfully."},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def chatbot_response(request):
    message = request.data.get("message", "")

    if not message:
        return Response(
            {"error": "Message is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    result = ChatbotEngine.process_message(message)

    return Response(result, status=status.HTTP_200_OK)

# Create your views here.
