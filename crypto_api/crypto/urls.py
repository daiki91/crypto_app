from django.urls import path
from .views import ChiffrementViewSet, process_text
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"history", ChiffrementViewSet, basename="history")

urlpatterns = [
    path("process/", process_text, name="process_text"),
]+ router.urls
