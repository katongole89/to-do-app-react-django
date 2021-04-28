from django.db import models
from Accounts.models import Users

# Create your models here.
class ToDo(models.Model):
    user = models.ForeignKey(Users ,on_delete=models.CASCADE)
    category = models.CharField(max_length= 200, blank=False)
    text = models.TextField()
    isDone = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username + '--'+ self.category