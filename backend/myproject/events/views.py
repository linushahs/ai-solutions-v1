from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event, EventImage
from .serializers import EventSerializer, EventImageSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active', 'location', 'event_type']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['event_date', 'created_at']
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def upload_images(self, request, pk=None):
        """Upload up to 4 images for an event"""
        event = self.get_object()
        
        # Check current image count
        current_count = event.images.count()
        if current_count >= 4:
            return Response(
                {'error': 'Maximum 4 images allowed per event'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get uploaded files
        files = request.FILES.getlist('images')
        
        if not files:
            return Response(
                {'error': 'No images provided'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if adding these would exceed limit
        if current_count + len(files) > 4:
            return Response(
                {'error': f'Can only upload {4 - current_count} more image(s)'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create EventImage instances
        images = []
        for image_file in files:
            event_image = EventImage.objects.create(
                event=event,
                image=image_file,
                caption=request.data.get('caption', '')
            )
            images.append(event_image)
        
        serializer = EventImageSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_image(self, request, pk=None):
        """Delete a specific image by image_id"""
        event = self.get_object()
        image_id = request.data.get('image_id')
        
        if not image_id:
            return Response(
                {'error': 'image_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            image = EventImage.objects.get(id=image_id, event=event)
            image.delete()
            return Response(
                {'message': 'Image deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except EventImage.DoesNotExist:
            return Response(
                {'error': 'Image not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events"""
        from django.utils import timezone
        upcoming_events = Event.objects.filter(
            event_date__gte=timezone.now(),
            is_active=True
        )
        serializer = self.get_serializer(upcoming_events, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def past(self, request):
        """Get past events"""
        from django.utils import timezone
        past_events = Event.objects.filter(
            event_date__lt=timezone.now(),
            is_active=True
        )
        serializer = self.get_serializer(past_events, many=True)
        return Response(serializer.data)
