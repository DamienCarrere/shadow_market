let tableauKanban = [];
const addListBtn = document.getElementById("add-list-btn");
const kanbanBoardContainer = document.getElementById("kanban-board-container");
let draggedTask = null;

document.addEventListener("DOMContentLoaded", () => {
  chargerDonnees();
});

// créer nouvelle liste
addListBtn.addEventListener("click", () => {
  const listeNom = prompt("Créer une nouvelle liste");
  if (listeNom) {
    addList(listeNom);
  }
});

// localStorage
function sauvegarderDonnees() {
  localStorage.setItem("tableauKanban", JSON.stringify(tableauKanban));
}
function chargerDonnees() {
  const savedData = localStorage.getItem("tableauKanban");
  tableauKanban = JSON.parse(savedData) || [];
  kanbanBoardContainer.innerHTML = "";
  tableauKanban.forEach((list) => creerListeDansDOM(list));
}

// créer liste
function addList(listName) {
  const newList = {
    id: Date.now().toString(),
    nomListe: listName,
    taches: [],
  };
  tableauKanban.push(newList);
  creerListeDansDOM(newList);
  sauvegarderDonnees();
}

// DOM liste
function creerListeDansDOM(list) {
  const listElement = document.createElement("div");
  listElement.className = "kanban-list";
  listElement.id = `list-${list.id}`;
  kanbanBoardContainer.appendChild(listElement);

  const listHeader = document.createElement("div");
  listHeader.className = "kanban-list-header";
  listElement.appendChild(listHeader);

  const listTitle = document.createElement("h2");
  listTitle.textContent = list.nomListe;
  listHeader.appendChild(listTitle);

  const deleteListBtn = document.createElement("button");
  deleteListBtn.className = "delete-list-btn";
  deleteListBtn.textContent = "X";
  listHeader.appendChild(deleteListBtn);
  deleteListBtn.setAttribute("aria-label", "Supprimer la liste");

  deleteListBtn.addEventListener("click", () => deleteList(list.id));

  // Conteneur de tâches

  const tasksList = document.createElement("ul");
  tasksList.className = "kanban-tasks";
  listElement.appendChild(tasksList);

  tasksList.addEventListener("dragover", (event) => event.preventDefault());
  tasksList.addEventListener("drop", (event) => handleDrop(event));

  // Rendre les tâches existantes
  list.taches.forEach((task) => creeTacheDansDom(tasksList, task));

  // Ajouter un formulaire de tâche
  const addTaskForm = document.createElement("div");
  addTaskForm.className = "add-task-form";
  listElement.appendChild(addTaskForm);

  // *      +label
  const taskLabel = document.createElement("label");
  taskLabel.textContent = "Créer une nouvelle Tâche";
  taskLabel.setAttribute("for", "new-task");
  addTaskForm.appendChild(taskLabel);

  taskLabel.className = "visually-hidden";

  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.className = "add-task-input";
  taskInput.placeholder = "Nouvelle Tâche";
  taskInput.id = "new-task";
  taskInput.setAttribute("aria-required", "true");
  addTaskForm.appendChild(taskInput);

  taskInput.removeAttribute("aria-label");

  const addTaskBtn = document.createElement("button");
  addTaskBtn.className = "add-task-btn";
  addTaskBtn.textContent = "Ajouter une tâche";
  addTaskForm.appendChild(addTaskBtn);

  addTaskBtn.addEventListener("click", () => {
    if (taskInput.value) {
      addTask(list.id, taskInput.value);
      taskInput.value = "";
    }
  });
}

// Ajouter une tâche (données + DOM)
function addTask(listId, taskText) {
  const list = tableauKanban.find((l) => l.id === listId);
  if (list) {
    list.taches.push(taskText);

    const listElement = document.getElementById(`list-${listId}`);
    const tasksList = listElement.querySelector(".kanban-tasks");
    creeTacheDansDom(tasksList, taskText);

    sauvegarderDonnees();
  }
}

// Structure du DOM des tâches
function creeTacheDansDom(taskListElement, taskText) {
  const taskId = Date.now().toString();
  const taskElement = document.createElement("li");
  taskElement.className = "kanban-task";
  taskElement.id = `task-${taskId}`;
  taskElement.draggable = true;
  taskListElement.appendChild(taskElement);

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskElement.appendChild(taskSpan);

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.className = "delete-task-btn";
  deleteTaskBtn.textContent = "X";
  taskElement.appendChild(deleteTaskBtn);
  deleteTaskBtn.setAttribute("aria-label", "Supprimer la tache");

  deleteTaskBtn.addEventListener("click", () => deleteTask(taskId));

  taskElement.addEventListener("dragstart", handleDragStart);
  taskElement.addEventListener("dragend", handleDragEnd);
}

// Supprimer la liste
function deleteList(listId) {
  tableauKanban = tableauKanban.filter((list) => list.id !== listId);
  document.getElementById(`list-${listId}`).remove();
  sauvegarderDonnees();
}

// Supprimer les tâches
function deleteTask(taskId) {
  const taskElement = document.getElementById(`task-${taskId}`);
  if (!taskElement) return;

  tableauKanban.forEach((list) => {
    list.taches = list.taches.filter(
      (task) => task !== taskElement.querySelector("span").textContent
    );
  });
  taskElement.remove();
  sauvegarderDonnees();
}

// Drag & Drop
function handleDragStart(event) {
  draggedTask = event.target;
  event.dataTransfer.setData("text/plain", draggedTask.id);
  setTimeout(() => draggedTask.classList.add("dragging"), 0);
}

function handleDragEnd(event) {
  if (draggedTask) {
    draggedTask.classList.remove("dragging");
    draggedTask = null;
  }
}

function handleDrop(event) {
  event.preventDefault();
  const targetTaskList = event.target.closest(".kanban-tasks");

  if (draggedTask && targetTaskList) {
    targetTaskList.appendChild(draggedTask);
    updateDataOnDrop();
    sauvegarderDonnees();
  }
}

// Mettre à jour les données après Drag & Drop
function updateDataOnDrop() {
  const domLists = document.querySelectorAll(".kanban-list");
  const nouvelleTableauKanban = [];

  domLists.forEach((domList) => {
    const listId = domList.id.replace("list-", "");
    const listName = domList.querySelector("h2").textContent;
    const domTasks = domList.querySelectorAll(".kanban-task");

    const newTasks = [];
    domTasks.forEach((domTask) => {
      newTasks.push(domTask.querySelector("span").textContent);
    });

    nouvelleTableauKanban.push({
      id: listId,
      nomListe: listName,
      taches: newTasks,
    });
  });

  tableauKanban = nouvelleTableauKanban;
}
