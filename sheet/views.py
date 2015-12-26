import datetime

from django.shortcuts import render_to_response

from sheet.models import User


# Create your views here.


def login(request):
	title = "Time Sheet Login"

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
		return render_to_response('login/login.html', locals())
	else:
		return render_to_response('login/login.html', {'error': False})


def index(request):
	return render_to_response('content/__base.html', locals())
