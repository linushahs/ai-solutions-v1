from rest_framework import serializers
from .models import Blog, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class BlogSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 
            'featured_image', 'author', 'author_name', 
            'category', 'category_name', 'status', 
            'published_at', 'created_at', 'updated_at', 'views'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at', 'views']


class BlogListSerializer(serializers.ModelSerializer):
    """Lighter serializer for list views"""
    author_name = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'author_name', 'category', 'category_name', 'status',
            'published_at', 'views', 'created_at'
        ]
