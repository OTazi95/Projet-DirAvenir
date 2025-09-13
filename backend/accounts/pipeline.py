from .models import Profile

def save_profile(strategy, user, *args, **kwargs):
    if user:
        profile, created = Profile.objects.get_or_create(user=user)
        if created:
            profile.role = "etudiant"
            profile.save()
