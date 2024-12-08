from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Item
from .serializers import (
    CategorySerializer,
    CategoryCreateUpdateSerializer,
    ItemSerializer,
    ItemCreteUpdateSerializer
)
from rest_framework import status, generics

# Category views
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    """
    Handles listing all categories (GET) and creating a new category (POST).
    """
    queryset = Category.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CategoryCreateUpdateSerializer
        return CategorySerializer

class CategoryDetailAPIView(APIView):
    """
    Handles retrieving, updating, and deleting a category.
    """
    def get(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
            serializer = CategorySerializer(category)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CategoryCreateUpdateSerializer(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
            category.delete()
            return Response({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        
# Item views
class ItemListCreateAPIView(generics.ListCreateAPIView):
    """
    Handles listing all items (GET) and creating a new item (POST).
    """
    queryset = Item.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ItemCreteUpdateSerializer
        return ItemSerializer
    
class ItemDetailAPIView(APIView):
    """
    Handles retrieving, updating, and deleting an item.
    """
    def get(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
            serializer = ItemSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ItemCreteUpdateSerializer(instance=item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            item = Item.objects.get(pk=pk)
            item.delete()
            return Response({'message': 'Item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)