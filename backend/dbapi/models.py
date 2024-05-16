from django.db import models

class ChatMessage(models.Model):
    text = models.TextField()
    sender = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)