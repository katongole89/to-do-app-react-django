from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('login/', views.login.as_view(), name = 'login'),
    path('registration/', views.registration.as_view(), name = 'registration'),
    ]
urlpatterns= format_suffix_patterns(urlpatterns)