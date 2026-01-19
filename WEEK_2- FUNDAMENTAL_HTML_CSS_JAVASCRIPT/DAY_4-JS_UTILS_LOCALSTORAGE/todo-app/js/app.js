const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

/* ---------- Utilities ---------- */
function getTodos() {
  try {
    return JSON.parse(localStorage.getItem("todos")) || [];
  } catch (error) {
    logError(error);
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* ---------- Error Logger ---------- */
function logError(error) {
  console.error(error);
}

/* ---------- Core Logic ---------- */
function renderTodos() {
  list.innerHTML = "";
  const todos = getTodos();

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo}</span>
      <div>
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTodo(text) {
  const todos = getTodos();
  todos.push(text);
  saveTodos(todos);
  renderTodos();
}

function deleteTodo(index) {
  const todos = getTodos();
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}

function editTodo(index) {
  const todos = getTodos();
  const updated = prompt("Edit todo:", todos[index]);
  if (updated !== null) {
    todos[index] = updated;
    saveTodos(todos);
    renderTodos();
  }
}

/* ---------- Events ---------- */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo(input.value);
  input.value = "";
});

/* ---------- Init ---------- */
renderTodos();
