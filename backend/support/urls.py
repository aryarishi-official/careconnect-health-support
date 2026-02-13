from django.urls import path
from . import views

urlpatterns = [
    path('patient/', views.create_patient_request),
    path('volunteer/', views.create_volunteer),
    path('contact/', views.create_contact),
    path('chatbot/', views.chatbot_response),
    path('query/', views.create_general_query),
    path('volunteer/', views.create_volunteer),
    



    
    
]
