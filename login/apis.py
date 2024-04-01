import json

from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.urls import reverse

def signIn(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        print("Login Success")
        return HttpResponseRedirect(reverse("todolist:todolist_index"))
    else:
        return HttpResponseRedirect(reverse("login:login"))

def signOut(request):
    logout(request)
    return HttpResponseRedirect(reverse("login:login"))

def signUp(request):
    username = request.POST["username"]
    password = request.POST["password"]
    email = request.POST["email"]
    user = User.objects.create_user(username, email, password)
    user.save()
    return HttpResponseRedirect(reverse("login:login"))
    
