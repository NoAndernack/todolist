document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const taskList = document.querySelector(".list");
  const taskInput = document.querySelector("#taskId");
  const taskLabel = document.querySelector(".content__text");
  let tasks = []; // Déclarer la variable en dehors de la fonction pour qu'elle soit accessible dans tout le script

  loadTasks();

  function addTask() {
    const input = taskInput.value;
    const checkbox = document.createElement("input");
    const taskItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "-";
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    taskItem.textContent = input;
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    taskItem.insertBefore(checkbox, taskItem.firstChild);

    checkbox.addEventListener("change", function () {
      taskItem.classList.toggle("complet");
      saveTasks();
    });
    deleteButton.addEventListener("click", function () {
      taskItem.remove();
      removeTaskFromArray(taskItem.textContent);
      saveTasks();
    });

    saveTasks();
  }

  function saveTasks() {
    tasks = [];
    document.querySelectorAll(".list li").forEach(function (taskItem) {
      tasks.push({
        text: taskItem.textContent,
        completed: taskItem.classList.contains("complet"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
      const taskItem = document.createElement("li");
      taskItem.textContent = task.text;
      if (task.completed) {
        taskItem.classList.add("complet");
      }
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      taskItem.appendChild(checkbox);
      taskList.appendChild(taskItem);

      checkbox.addEventListener("change", function () {
        taskItem.classList.toggle("complet");
        saveTasks();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "-";
      taskItem.appendChild(deleteButton);

      deleteButton.addEventListener("click", function () {
        taskItem.remove();
        removeTaskFromArray(task.text);
        saveTasks();
      });
    });
  }

  function removeTaskFromArray(text) {
    tasks = tasks.filter(function (task) {
      return task.text !== text;
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
  });
});