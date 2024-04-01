## Requriements
Python: 3.12.2
Django: 5.0.3

Download python installation wizard for windows and install it to install python packages and execute the project.

## Want to use this project?

1. Run:

    ```bash
    (env)$ pip install -r requirements.txt

    (env)$ python manage.py migrate
    (env)$ python manage.py seed_db
    (env)$ python manage.py runserver
    ```

    Navigate to [http://localhost:8000/](http://localhost:8000/).

## Start a new project

    "pip install -r requirements.txt" will install django package then you can use "djang-admin" command.

    ```bash    
    (env)$ django-admin startproject project_name
    ```

## Making a new app

    ```bash
    (env)$ python manage.py startapp app_name
    ```

## Creating and migrating a model

    In models.py create a new model as below.

    class Todo(models.Model):
        title = models.CharField(max_length=50)
        content = models.CharField(max_length=200)
        is_completed = models.IntegerField(default=0)
        def __str__(self):
            return self.id

    Then you need to migrate the model.

    ```bash
    (env)$ python manage.py makemigrations
    (env)$ python manage.py migrate
    ```