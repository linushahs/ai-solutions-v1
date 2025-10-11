from django.contrib import admin
from .models import Event, EventImage

class EventImageInline(admin.TabularInline):
    model = EventImage
    extra = 1
    max_num = 4
    fields = ['image', 'caption']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'event_type', 'event_date', 'attendees', 'is_active', 'created_by', 'created_at']
    list_filter = ['is_active', 'event_type', 'event_date', 'location']
    search_fields = ['title', 'description', 'location']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'event_date'
    inlines = [EventImageInline]
    
    fieldsets = (
        ('Event Information', {
            'fields': ('title', 'description', 'location', 'event_type', 'attendees', 'is_active', 'extra_information', 'created_by')
        }),
        ('Date & Time', {
            'fields': ('event_date', 'end_date')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    list_display = ['event', 'caption', 'uploaded_at']
    list_filter = ['uploaded_at']
    search_fields = ['event__title', 'caption']
