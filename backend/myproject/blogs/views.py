from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Blog, Category
from .serializers import BlogSerializer, BlogListSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category', 'author']
    search_fields = ['title', 'excerpt']
    ordering_fields = ['published_at', 'created_at', 'views']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return BlogListSerializer
        return BlogSerializer
    
    def get_queryset(self):
        queryset = Blog.objects.all()
        # Non-authenticated users only see published blogs
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(status='published')
            
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def published(self, request):
        """Get only published blogs"""
        published_blogs = self.get_queryset().filter(status='published')
        page = self.paginate_queryset(published_blogs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(published_blogs, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def publish(self, request, slug=None):
        """Publish a draft blog"""
        blog = self.get_object()
        blog.status = 'published'
        blog.published_at = timezone.now()
        blog.save()
        serializer = self.get_serializer(blog)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def my_blogs(self, request):
        """Get current user's blogs"""
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        my_blogs = self.get_queryset().filter(author=request.user)
        page = self.paginate_queryset(my_blogs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(my_blogs, many=True)
        return Response(serializer.data)
