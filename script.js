// Select DOM elements
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoCategory = document.getElementById("todo-category");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterCompleted = document.getElementById("filter-completed");

// Array to hold todos (loaded from localStorage)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add a new todo
addTodoBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  const dueDate = todoDate.value.trim();
  const category = todoCategory.value.trim();

  if (task) {
    todos.push({
      id: Date.now(),
      task,
      dueDate: dueDate || "No due date",
      category: category || "Uncategorized",
      completed: false
    });
    todoInput.value = "";
    todoDate.value = "";
    todoCategory.value = "";
    saveTodos();
    renderTodos();
  }
});

// Render todos based on the filter
function renderTodos(filter = "all") {
  todoList.innerHTML = ""; // Clear the list
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach(todo => {
    const todoItem = document.createElement("li");
    todoItem.className = `todo-item ${todo.completed ? "completed" : ""}`;
    todoItem.innerHTML = `
      <span>
        ${todo.task}
        <small>Due: ${todo.dueDate}</small>
        <small>Category: ${todo.category}</small>
      </span>
      <div>
        <button class="complete-btn" onclick="toggleComplete(${todo.id})">
          ${todo.completed ? "Undo" : "Complete"}
        </button>
        <button class="edit-btn" onclick="editTask(${todo.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${todo.id})">Delete</button>
      </div>
    `;
    todoList.appendChild(todoItem);
  });
}

// Toggle completion status
function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

// Edit a todo
function editTask(id) {
  const task = prompt("Edit the task:");
  const dueDate = prompt("Edit the due date (YYYY-MM-DD):");
  const category = prompt("Edit the category:");

  if (task) {
    todos = todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            task,
            dueDate: dueDate || todo.dueDate,
            category: category || todo.category
          }
        : todo
    );
    saveTodos();
    renderTodos();
  }
}

// Delete a todo
function deleteTask(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

// Filter buttons
filterAll.addEventListener("click", () => {
  renderTodos("all");
  setActiveFilter(filterAll);
});
filterActive.addEventListener("click", () => {
  renderTodos("active");
  setActiveFilter(filterActive);
});
filterCompleted.addEventListener("click", () => {
  renderTodos("completed");
  setActiveFilter(filterCompleted);
});

// Set active filter button styling
function setActiveFilter(activeButton) {
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
}

// Initial render
renderTodos();
