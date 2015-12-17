from django.shortcuts import render_to_response


# Create your views here.


def index(request):
	title = "Index"
	return render_to_response('login/index.html', locals())
