let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const deadlineInput = document.getElementById("deadlineInput");
  const priorityInput = document.getElementById("priorityInput");

  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;
  const priority = priorityInput.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    deadline,
    priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  deadlineInput.value = "";
  priorityInput.value = "low";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(`priority-${task.priority}`);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      task.completed = checkbox.checked;
      saveTasks();
    };

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const text = document.createElement("span");
    text.textContent = task.text;
    if (task.completed) {
      text.style.textDecoration = "line-through";
    }

    const deadline = document.createElement("span");
    deadline.className = "deadline";
    if (task.deadline) {
      deadline.textContent = "Due: " + new Date(task.deadline).toLocaleString();
    }

    taskContent.appendChild(text);
    taskContent.appendChild(deadline);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function deleteTask(index) {
  const deleted = JSON.parse(localStorage.getItem("deletedTasks")) || [];
  deleted.push(tasks[index]);
  localStorage.setItem("deletedTasks", JSON.stringify(deleted));

  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

document.addEventListener("DOMContentLoaded", renderTasks);
