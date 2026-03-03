import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import YouTubeVideo

def seed_videos():
    # Clear existing videos
    YouTubeVideo.objects.all().delete()
    
    videos = [
        {
            "title": "Numerology & Success - Puskaar Pokharel",
            "video_id": "3ONZUCOhAFk",
            "thumbnail": "https://img.youtube.com/vi/3ONZUCOhAFk/mqdefault.jpg"
        },
        {
            "title": "Secret of Numbers - Puskaar Pokharel",
            "video_id": "9BsiQjitRHk",
            "thumbnail": "https://img.youtube.com/vi/9BsiQjitRHk/mqdefault.jpg"
        }
    ]
    
    for v in videos:
        YouTubeVideo.objects.create(**v)
    
    print("Default videos updated successfully!")

if __name__ == "__main__":
    seed_videos()
