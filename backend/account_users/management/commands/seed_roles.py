from django.core.management.base import BaseCommand
from account_users.models import Role

class Command(BaseCommand):
    help = "Seed initial roles"

    def handle(self, *args, **kwargs):
        roles = ["Student", "Instructor", "Institution"]
        for role in roles:
            Role.objects.get_or_create(name=role)
        self.stdout.write(self.style.SUCCESS("Roles seeded successfully!"))
