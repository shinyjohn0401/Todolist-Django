from django.urls import path
from django.http import JsonResponse, HttpResponseRedirect
from . import views, apis

app_name = "todolist"
urlpatterns = [
    path("",                            views.todoListIndex,            name="todolist_index"),
    path("todos",                       apis.todos,                    name="todos"),
    path("todo/<int:todoId>/",          apis.todo,                     name="todo"),
]
