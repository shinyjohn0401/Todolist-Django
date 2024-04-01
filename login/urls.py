from django.urls import path
from django.conf.urls.static import static
from . import views, apis

app_name = 'login'
urlpatterns = [
    path("",                views.LogInView.as_view(),            name="login"),
    path("signup",          views.registerUser,         name="register"),
    path("login",           apis.signIn,                name="api_login"),
    path("api_signup",      apis.signUp,                name="api_register"),
    path("api_signout",     apis.signOut,               name="api_logout"),
]