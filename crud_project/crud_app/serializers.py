from rest_framework import serializers
from .models import Category, Item

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving category details
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']

class CategoryCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating categories
    """
    description = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    class Meta:
        model = Category
        fields = ['name', 'description']


class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving item details
    """
    category = CategorySerializer() # Nested serializer for category details
    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'category', 'created_at', 'updated_at']

class ItemCreteUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating items
    """
    class Meta:
        model = Item
        fields = ['name', 'description', 'category']