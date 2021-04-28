from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('to-dos/', views.listToDos.as_view(), name = 'listToDos'),
    path('updateIsDone/<slug:id>/',views.updateIsDone.as_view(), name='updateIsDone'),
    ]
urlpatterns= format_suffix_patterns(urlpatterns)