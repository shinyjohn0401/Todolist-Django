import json

from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.models import User

from .models import Todo

def todos(request):
    is_ajax = request.headers.get('X-Requested-With') == "XMLHttpRequest"
    print ("addTodo Requested")
    if is_ajax:
        if request.method == "GET":
            print ("Proceeding GET request")
            todos = list(Todo.objects.all().values())
            print ("returning all todos")
            return JsonResponse({'context': todos})
        elif request.method == "POST":
            print ("Proceeding POST request")
            data = json.load(request)
            todo = data.get('payload')
            print(todo)
            Todo.objects.create(title=todo["title"], content=todo["content"], is_completed=0)
            print ("todoAdded")
            return JsonResponse({'status': 'Todo added!'})
        else:
            HttpResponseBadRequest('Invalid Request')

def todo(request, todoId):
    is_ajax = request.headers.get('X-Requested-With') == "XMLHttpRequest"

    print ("single todo url Requested")
    if is_ajax:
        todo = get_object_or_404(Todo, id=todoId)
        if request.method == "PUT":
            print ("Proceeding PUT request")
            data = json.load(request)
            print(data)
            updated_values = data.get('payload')
            todo.is_completed = updated_values["is_completed"]
            todo.save()
            return JsonResponse({'status': 'Todo Updated!'})
        elif request.method == "DELETE":
            print ("Proceeding DELETE request")
            todo.delete()
            return JsonResponse({'status': 'Todo Deleted!'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        HttpResponseBadRequest('Invalid Request')
