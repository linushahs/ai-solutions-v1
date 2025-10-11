from rest_framework import serializers
from .models import Event, EventImage

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image', 'caption', 'uploaded_at']
        read_only_fields = ['uploaded_at']


class EventSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    images = EventImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'location', 
            'event_date', 'end_date', 'event_type', 
            'event_type_display', 'attendees', 'extra_information',
            'created_by', 'created_by_name', 
            'created_at', 'updated_at', 'is_active', 'images'
        ]
        read_only_fields = ['created_at', 'updated_at']
