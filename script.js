document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("checked");
      const spanText = document.createElement("span");
      spanText.classList.add("task-text");
      spanText.textContent = task.text;
      li.appendChild(spanText);

      const delBtn = document.createElement("span");
      delBtn.classList.add("delete-btn");
      delBtn.textContent = "- ";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      };

      li.onclick = (e) => {
        if (e.target === delBtn) return;
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      };

      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  }

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  renderTasks();
});
