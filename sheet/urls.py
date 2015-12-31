from django.conf.urls import url

from sheet import views

urlpatterns = [
	# the 'name' value as called by the {% url %} template tag
	# common
	url(r'^login/$', views.login, name='login'),
	url(r'^index/$', views.dashboard, name='index'),
	# user
	url(r'^user/profile$', views.user_profile, name='profile'),
	# expense
	url(r'^expense/$', views.expense, name='expense'),
	# library
	url(r'^library/book_list$', views.library_book_list, name='book_list'),
	url(r'^library/rent$', views.library_rent, name='book_rent'),
	url(r'^library/search$', views.library_search, name='book_search'),
	# report
	url(r'^report/daily$', views.report_daily, name='report_daily'),
	url(r'^report/weekly$', views.report_weekly, name='report_weekly'),
	url(r'^report/monthly$', views.report_monthly, name='report_monthly'),
	# time sheet
	url(r'^time-sheet/time$', views.ts_time_sheet, name='ts_time'),
	url(r'^time-sheet/pay-holiday$', views.ts_payment_holiday, name='ts_pay'),
	url(r'^time-sheet/working-holiday$', views.ts_working_on_holiday, name='ts_work'),
]
