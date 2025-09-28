from rest_framework import serializers
from .models import ReviewModel

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewModel
        fields = ['id', 'name', 'email', 'company', 'services', 'rating', 'comments', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value
    
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required")
        return value
