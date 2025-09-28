from django.contrib import admin
from .models import ReviewModel

@admin.register(ReviewModel)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'services', 'rating', 'created_at']
    list_filter = ['rating', 'services', 'created_at']
    search_fields = ['name', 'email', 'company']
    ordering = ['-created_at']
