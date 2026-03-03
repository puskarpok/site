from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileViewSet, AppointmentViewSet, BlogPostViewSet,
    YouTubeVideoViewSet, AboutContentViewSet, calculate_numerology
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'blogs', BlogPostViewSet)
router.register(r'videos', YouTubeVideoViewSet)
router.register(r'about', AboutContentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('calculate/', calculate_numerology, name='calculate_numerology'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
