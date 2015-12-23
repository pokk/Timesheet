import datetime

from django.shortcuts import render_to_response

from login.models import User


# Create your views here.


def index(request):
	title = "Index"

	if 'username' and 'password' in request.POST:
		print(request.POST['username'], request.POST['password'])
		user = request.POST['username']
		pwd = request.POST['password']
		s = User.objects(user=user, password=pwd)

		if s is not None:
			print("Yes we have")
		else:
			post = User(user=user)
			post.password = pwd
			post.lastUpdate = datetime.datetime.now()
			post.save()
		return render_to_response('login/index.html', locals())
	else:
		return render_to_response('login/index.html', {'error': False})
