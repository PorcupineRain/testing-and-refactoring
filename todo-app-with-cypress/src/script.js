let state = {
  currentFilter: "filterNone",
  todos: [
    { description: "Learn HTML", id: "learnhtml", done: true },
    { description: "Learn CSS", id: "learncss", done: true },
    { description: "Learn JavaScript", id: "learnjavascipt", done: false },
  ],
};
let json = localStorage.getItem("listState");
if (json !== null) {
  state = JSON.parse(json);
}
function saveState() {
  json = JSON.stringify(state);
  localStorage.setItem("listState", json);
}

function renderTodos() {
  const list = document.querySelector("#list");
  list.innerHTML = "";
  state.todos.forEach((todo) => {
    if (state.currentFilter === "filterDone") {
      if (todo.done === false) {
        return;
      }
    }
    if (state.currentFilter === "filterOpen") {
      if (todo.done === true) {
        return;
      }
    }
    const todoLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", (e) => {
      let newTodoState = e.target.checked;
      todo.done = newTodoState;
      saveState();
      renderTodos();
    });

    todoLi.appendChild(checkbox);

    const todoText = document.createTextNode(todo.description);
    todoLi.append(todoText);

    list.appendChild(todoLi);
  });
}
renderTodos();

const addBtn = document.querySelector("#addButton");
const input = document.querySelector("#toDoInput");
addBtn.addEventListener("click", function () {
  input.value = input.value.trimEnd();
  for (let i = 0; i < state.todos.length; i++) {
    if (
      input.value.toLowerCase() === state.todos[i].description.toLowerCase()
    ) {
      input.value = "";
    }
  }
  if (input.value !== "") {
    state.todos.push({
      description: input.value,
      id: input.value.toLowerCase().replaceAll(" ", ""),
      done: false,
    });
    input.value = "";
    renderTodos();
    saveState();
  }
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

const clearBtn = document.querySelector("#clearButton");
clearBtn.addEventListener("click", function () {
  state.todos = [];
  renderTodos();
  saveState();
});

const removeDoneTaskBtn = document.querySelector("#removeDone");
removeDoneTaskBtn.addEventListener("click", function () {
  for (let i = state.todos.length - 1; i >= 0; i--) {
    if (state.todos[i].done === true) {
      state.todos.splice([i], 1);
    }
  }
  renderTodos();
  saveState();
});

const filterNone = document.querySelector("#filterNone");
filterNone.addEventListener("change", (e) => {
  state.currentFilter = "filterNone";
  saveState();
  renderTodos();
});

const filterDone = document.querySelector("#filterDone");
filterDone.addEventListener("change", (e) => {
  state.currentFilter = "filterDone";
  saveState();
  renderTodos();
});

const filterOpen = document.querySelector("#filterOpen");
filterOpen.addEventListener("change", (e) => {
  state.currentFilter = "filterOpen";
  saveState();
  renderTodos();
});

if (state.currentFilter === "filterNone") {
  filterNone.checked = true;
} else if (state.currentFilter === "filterDone") {
  filterDone.checked = true;
} else if (state.currentFilter === "filterOpen") {
  filterOpen.checked = true;
}
