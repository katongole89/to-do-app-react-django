from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.index.as_view(), name = 'index'),
    ]
urlpatterns= format_suffix_patterns(urlpatterns)