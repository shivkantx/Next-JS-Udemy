document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render saved tasks
  tasks.forEach((task) => renderTask(task));

  // Add new task
  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newtask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newtask);
    saveTasks();
    renderTask(newtask);

    console.log("Added task:", newtask);
    todoInput.value = "";
  });

  // Save to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render task
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span class="status-icon">${task.completed ? "✔" : "○"}</span>
      <span class="task-text">${task.text}</span>
      <button>delete</button>
    `;

    const statusIcon = li.querySelector(".status-icon");

    // Toggle completed
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;

      task.completed = !task.completed;
      li.classList.toggle("completed");

      // update icon
      statusIcon.textContent = task.completed ? "✔" : "○";

      saveTasks();
      console.log("Updated task:", task);
    });

    // Delete task
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();

      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();

      console.log("Deleted task:", task);
    });

    todoList.appendChild(li);
  }
});
