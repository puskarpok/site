from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Profile, Appointment, BlogPost, YouTubeVideo, AboutContent
from .serializers import (
    ProfileSerializer, AppointmentSerializer, BlogPostSerializer,
    YouTubeVideoSerializer, AboutContentSerializer
)
from .utils.numerology_logic import calculate_all

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-date')
    serializer_class = BlogPostSerializer

class YouTubeVideoViewSet(viewsets.ModelViewSet):
    queryset = YouTubeVideo.objects.all()
    serializer_class = YouTubeVideoSerializer

class AboutContentViewSet(viewsets.ModelViewSet):
    queryset = AboutContent.objects.all()
    serializer_class = AboutContentSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def calculate_numerology(request):
    name = request.data.get('name')
    dob = request.data.get('dob')
    if not name or not dob:
        return Response({"error": "Name and DOB are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    results = calculate_all(name, dob)
    return Response(results)
