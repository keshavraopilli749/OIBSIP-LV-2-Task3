// Get elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const pendingTasksList = document.getElementById("pending-tasks");
const completedTasksList = document.getElementById("completed-tasks");

// Initialize arrays to hold tasks
let pendingTasks = [];
let completedTasks = [];

// Helper function to render tasks
function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    // Render pending tasks
    pendingTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.text} <span class="task-time">Added: ${task.timestamp}</span>
            <button class="mark-complete-btn" onclick="markComplete(${index})">Mark Complete</button>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index}, 'pending')">Delete</button>
        `;
        pendingTasksList.appendChild(li);
    });

    // Render completed tasks
    completedTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("completed");
        li.innerHTML = `
            ${task.text} <span class="task-time">Completed: ${task.timestamp}</span>
            <button class="delete-btn" onclick="deleteTask(${index}, 'completed')">Delete</button>
        `;
        completedTasksList.appendChild(li);
    });
}

// Add a new task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const timestamp = new Date().toLocaleString();
        const newTask = { text: taskText, timestamp: timestamp };

        // Add task to pending tasks
        pendingTasks.push(newTask);
        renderTasks();
        taskInput.value = '';  // Clear the input field
    }
});

// Mark task as complete
function markComplete(index) {
    const completedTask = pendingTasks.splice(index, 1)[0];
    completedTasks.push(completedTask);
    renderTasks();
}

// Edit a task
function editTask(index) {
    const newText = prompt("Edit your task:", pendingTasks[index].text);
    if (newText !== null) {
        pendingTasks[index].text = newText;
        renderTasks();
    }
}

// Delete a task
function deleteTask(index, listType) {
    if (listType === 'pending') {
        pendingTasks.splice(index, 1);
    } else if (listType === 'completed') {
        completedTasks.splice(index, 1);
    }
    renderTasks();
}

// Initial render
renderTasks();
