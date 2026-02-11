from rest_framework import serializers
from .models import PatientRequest, Volunteer, ContactMessage
class PatientRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientRequest
        fields = '__all__'
        read_only_fields = ['summary', 'created_at']
class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
        read_only_fields = ['created_at']
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['created_at']
