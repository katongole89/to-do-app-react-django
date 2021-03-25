from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.
class MyAccountManager(BaseUserManager):
    def create_user(self, username, password = None):
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(
            username = username,
        )
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, username, password):
        user = self.create_user(
            username = username,
            password = password,

        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser):
    username = models.CharField( max_length= 700, unique=True)
    first_name = models.CharField(verbose_name= 'First Name', blank = True, max_length= 700)
    last_name = models.CharField(verbose_name= 'Last Name', blank= True, max_length= 700)
    email = models.EmailField(blank = True, max_length= 700)
    is_verified = models.BooleanField(default= False)
    is_admin = models.BooleanField(default= False)
    is_active = models.BooleanField(default= True)
    is_staff = models.BooleanField(default= False)
    is_superuser = models.BooleanField(default= False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = MyAccountManager()

    def __str__(self):
        return self.username + '--'+ str(self.email)

    def has_perm(self, perm, obj= None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        Token.objects.create(user = instance)
