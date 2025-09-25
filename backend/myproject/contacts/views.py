# app/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from .serializers import ContactSerializer

class ContactViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            subject = f"New Inquiry from {data.get('firstName')} {data.get('lastName', '')}"
            message = f"Hey {data.get('firstName')}, we got your message. We will contact you soon."

            send_mail(
                subject,
                message,
                None,  # uses DEFAULT_FROM_EMAIL from settings
                [data["email"]],  # recipient
                fail_silently=False,
            )

            return Response({"message": "Email sent successfully!"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
