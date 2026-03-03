import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Profile

def create_admin():
    username = os.environ.get('ADMIN_USERNAME', 'admin')
    password = os.environ.get('ADMIN_PASSWORD', 'admin123')
    email = 'admin@example.com'

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"Successfully created superuser: {username}")
    else:
        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()
        print(f"Updated password for existing user: {username}")

def ensure_profile():
    if not Profile.objects.exists():
        Profile.objects.create(
            name="Numerologist Puskaar Pokharel",
            bio="Enter your biography here...",
            experience="3 Years",
            services="Numerology, Life Path Analysis",
            past_works="200+ Clients",
            achievements="Published Author"
        )
        print("Created default professional profile.")

if __name__ == "__main__":
    create_admin()
    ensure_profile()
