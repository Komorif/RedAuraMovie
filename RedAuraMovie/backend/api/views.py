from django.http import HttpResponse
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .serializer import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound

#Register API
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully. Now perform Login to get your token",
        })

class VideoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        output = [
            {
                "title_en": video.title_en,
                "title_ru": video.title_ru,
                "season": video.season,
                "episode": video.episode,
                "age": video.age,
                "time": video.time,
                "date": video.date,
                "description": video.description,
                "main_genre": video.main_genre,
                "genre": video.genre,
                "country": video.country,
                "rating": video.rating, 
            } for video in ModelVideo.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = AnimeVideoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class VideoDetailView(APIView):
    def get(self, request, slug, *args, **kwargs):
        try:
            # Ищем видео по slug
            video = ModelVideo.objects.get(slug=slug)
            serializer = AnimeVideoSerializer(video)
            return Response(serializer.data)
        except ModelVideo.DoesNotExist:
            raise NotFound({"detail": "Video not found"})