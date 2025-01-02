## Enhanced Todo List Application
## Introduction
The Enhanced Todo List Application is a lightweight, interactive web-based task manager.
Designed with scalability and user-friendliness in mind, this application provides an intuitive
interface for managing tasks effectively. It includes functionalities such as task creation,
editing, deletion, completion toggling, filtering, and persistent storage.
Key Features
1. Add Tasks
Users can add new tasks with the following attributes:
• Task Description: Mandatory text input.
• Due Date: Optional date input to specify deadlines.
• Category: Optional dropdown for task categorization (e.g., Work, Personal,
Shopping).
2. Edit Tasks
Users can:
• Modify the task description.
• Update the due date.
• Change the category.
3. Delete Tasks
Tasks can be permanently removed from the list.
4. Mark as Completed
Users can toggle the completion status of tasks. Completed tasks are visually distinguished
with a line-through and a shaded background.
5. Filter Tasks
Users can filter tasks based on their status:
• All: Displays all tasks.
• Active: Shows tasks not marked as completed.
• Completed: Displays only completed tasks.
6. Persistent Storage
Tasks are stored in the browser's localStorage to ensure they persist across sessions. This
eliminates the need for a backend database for basic functionality.
Technologies Used
• HTML: Structures the application's interface.
• CSS: Provides styling for a clean, modern, and responsive design.
• JavaScript: Implements functionality, including task management, filtering, and
localStorage operations.
## Code Breakdown
1. Adding Tasks
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
• Captures input values for the task description, due date, and category.
• Adds the task to the todos array and updates localStorage.
• Renders the updated task list.
2. Rendering Tasks
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
<button class="edit-btn"
onclick="editTask(${todo.id})">Edit</button>
<button class="delete-btn"
onclick="deleteTask(${todo.id})">Delete</button>
</div>
`;
});
todoList.appendChild(todoItem);
}
• Filters tasks based on the selected status (All, Active, Completed).
• Dynamically generates and displays tasks in the task list.
3. Task Management Functions
Toggle Completion
function toggleComplete(id) {
todos = todos.map(todo =>
todo.id === id ? { ...todo, completed: !todo.completed } : todo
);
saveTodos();
renderTodos();
}
• Toggles the completed status of a task.
• Updates localStorage and re-renders the task list.
Edit Task
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
• Prompts the user to update task details.
• Saves changes and re-renders the task list.
Delete Task
function deleteTask(id) {
todos = todos.filter(todo => todo.id !== id);
saveTodos();
renderTodos();
}
• Removes the task with the matching id from the todos array.
• Updates localStorage and re-renders the task list.
## User Experience Enhancements
• Visual Feedback:
o Completed tasks are visually distinct (line-through and faded background).
o Active filter buttons are highlighted.
• Intuitive Controls:
o Clear prompts for editing tasks.
o Easily accessible buttons for task actions (complete, edit, delete).
• Error Handling:
o Prevents adding empty tasks.
Scalability and Future Enhancements
The application is designed to be modular and scalable, making it easy to extend. Potential
enhancements include:
• Backend Integration: Synchronize tasks with a server for multi-device access.
• Advanced Filters: Filter by category or due date.
• Notifications: Remind users of approaching deadlines.
• Progress Tracking: Add charts or stats to show task completion progress.
Conclusion
The Enhanced Todo List Application demonstrates a strong foundation in front-end
development. It combines essential features, clean styling, and robust functionality with a
focus on user experience and scalability. This application serves as an excellent example of
efficient task management through modern web technologies.