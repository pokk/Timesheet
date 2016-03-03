from mongoengine import Document, StringField, connect, DateTimeField

# Create your models here.
connect('user_database')


class User(Document):
    user = StringField(required=True)
    password = StringField(max_length=50, required=True)
    lastUpdate = DateTimeField(required=True)
