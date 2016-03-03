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


def user_profile(request):
    return render_to_response('content/user/profile.html', locals())


def dashboard(request):
    return render_to_response('content/dashboard.html', locals())


def expense(request):
    return render_to_response('content/expense/expense.html', locals())


def library_book_list(request):
    return render_to_response('content/library/book_list.html', locals())


def library_rent(request):
    return render_to_response('content/library/rent.html', locals())


def library_search(request):
    return render_to_response('content/library/search.html', locals())


def report_daily(request):
    return render_to_response('content/report/daily.html', locals())


def report_monthly(request):
    return render_to_response('content/report/monthly.html', locals())


def report_weekly(request):
    return render_to_response('content/report/weekly.html', locals())


def ts_payment_holiday(request):
    return render_to_response('content/timesheet/payholiday.html', locals())


def ts_time_sheet(request):
    return render_to_response('content/timesheet/timesheet.html', locals())


def ts_working_on_holiday(request):
    return render_to_response('content/timesheet/workingholiday.html', locals())
