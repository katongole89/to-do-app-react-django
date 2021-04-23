from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('to-dos/', views.listToDos.as_view(), name = 'listToDos'),
    ]
urlpatterns= format_suffix_patterns(urlpatterns)