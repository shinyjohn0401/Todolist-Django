from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from .models import Todo

def todoListIndex(request):
    template = loader.get_template("todo_index.html")
    title = "DJANGO | TODOLIST"
    todos = list(Todo.objects.all().values())
    context = {
        'title': title,
        'todos': todos
    }
    return HttpResponse(template.render(context, request))
