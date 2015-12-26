from django.conf.urls import url

from sheet import views

urlpatterns = [
	# the 'name' value as called by the {% url %} template tag
	url(r'^login/$', views.login, name='login'),
	url(r'^index/$', views.index, name='index'),
]
