from django.conf.urls import url

from login import views

urlpatterns = {
	# the 'name' value as called by the {% url %} template tag
	url(r'^$', views.index, name='index'),
}
