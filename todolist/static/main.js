function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function getAllTodos(url) {
  console.log("Requesting to get all todos");
  fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRFToken": getCookie("csrftoken"),
    }
  })
  .then(response => response.json())
  .then(data =>{
    let todoList = document.getElementById("todolist");
    
    console.log(data.context);
    todoList.innerHTML = "";
    (data.context).forEach(todo => {
      const todoHTMLElement = `
          <div class="col-xl-4 col-sm-6">
            <div class="card border shadow-none">
                <div class="d-flex flex-wrap align-items-start  justify-content-md-end">
                    <button class="btn btn-light w-30 m-2"
                        id="delete-${ todo.id }">DEL</button>
                    <input type="checkbox" class="form-check-input m-2"
                        id="completed-${ todo.id }" ${ Boolean(todo.is_completed) ? "checked=true" : "" }>
                </div>
                <div class="card-body p-4">
                    <div class="d-flex align-items-start">
                        <div
                            class="flex-shrink-0 avatar rounded-circle justify-content-md-end me-3">
                        </div>
                        <div class="flex-grow-1 overflow-hidden">
                            <h5 class="font-size-15 mb-1 text-truncate"><button class="btn btn-link btn-lg text-dark ps-0">${todo.title}</button></h5>
                            <p class="text-muted mb-0">${todo.content}</p>
                        </div>
                    </div>
                </div>
                <!-- end card body -->
            </div><!-- end card -->
          </div>`;
        todoList.innerHTML += todoHTMLElement;
        setDeleteAction();
        setCompleteAction();
    });
  });
}

function addTodo(url, payload) {
  console.log("Requesting to add todo");
  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({payload})
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    let refreshBtn = document.getElementById("btn_refresh");
    refreshBtn.click();
  });
}

function deleteTodo(url) {
  console.log("Requesting to delete todo");
  fetch(url, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRFToken": getCookie("csrftoken"),
    }
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    let refreshBtn = document.getElementById("btn_refresh");
    refreshBtn.click();
  });
}

function completeTodo(url, payload) {
  console.log("Requesting to complete todo");
  fetch(url, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({payload})
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    let refreshBtn = document.getElementById("btn_refresh");
    refreshBtn.click();
  });
}

function setDeleteAction() {
  const todoList = document.getElementById("todolist");
  let btn_deletes = todoList.getElementsByClassName("btn-light");
  for(let i = 0; i < btn_deletes.length; i++) {
      btn_deletes[i].addEventListener("click", () => {
          const todoId = String(btn_deletes[i].id).substring(7);
          const singleTodoUrl = `todo/${todoId}/`;
          deleteTodo(singleTodoUrl);
      });
  }
}

function setCompleteAction() {
  const todoList = document.getElementById("todolist");
  let checkboxes = todoList.getElementsByTagName("input");
  let titles = todoList.getElementsByClassName("text-dark");
  for(let i = 0; i < checkboxes.length; i++) {
    const todoId = String(checkboxes[i].id).substring(10);
    const singleTodoUrl = `todo/${todoId}/`;
    checkboxes[i].addEventListener("change", () => {
      completeTodo(singleTodoUrl, {is_completed: Number(checkboxes[i].checked)});
      });
    titles[i].addEventListener("click", () => {
      completeTodo(singleTodoUrl, {is_completed: Number(!checkboxes[i].checked)});
    });
  }
}