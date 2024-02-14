let todos = [
  {
    id: 0,
    category: "User Story",
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
    subtasks: [],
    assignedTo: ["max mustermann"],
    priority: "medium",
    status: "inProgress",
  },
  {
    id: 1,
    category: "Technical Task",
    title: "HTML Base Template Creation",
    description: "Create reusable HTML base templates...",
    subtasks: [],
    assignedTo: ["max mustermann", "Mara Musterfrau"],
    priority: "low",
    status: "awaitFeedback",
  },
  {
    id: 2,
    category: "Technical Task",
    title: "CSS Architecture Planning",
    description: "Define CSS naming conventions and structure...",
    subtasks: [],
    assignedTo: ["Molly May"],
    priority: "high",
    status: "closed",
  },
  {
    id: 3,
    category: "User Story",
    title: "Daily Kochwelt Recipe",
    description: "Implement daily recipe and portion calculator...",
    subtasks: [],
    assignedTo: ["Molly May", "Stephan S-Bahn", "Olga Oman"],
    priority: "medium",
    status: "awaitFeedback",
  },
];

let taskColor = {
  technicalTask: "#1FD7C1",
  userStory: "#0038FF",
};

let currentDraggedElement;

function updateHTML() {
  updateToDos();
  updateInProgress();
  updateAwaitFeedback();
  updateDone();
  updateTaskColor();
}

function updateToDos() {
  let toDo = todos.filter((todo) => todo["status"] == "toDo");
  let content = document.getElementById("toDo");
  content.innerHTML = "";
  if (toDo.length == 0) {
    content.innerHTML = generateEmptyHTML("to do");
  } else {
    for (let index = 0; index < toDo.length; index++) {
      const element = toDo[index];
      content.innerHTML += generateTaskCard(element);
    }
  }
}

function updateInProgress() {
  let inProgress = todos.filter(
    (inProgress) => inProgress["status"] == "inProgress"
  );
  let content = document.getElementById("inProgress");
  content.innerHTML = "";
  if (inProgress.length == 0) {
    content.innerHTML = generateEmptyHTML("in progress");
  } else {
    for (let index = 0; index < inProgress.length; index++) {
      const element = inProgress[index];
      content.innerHTML += generateTaskCard(element);
    }
  }
}

function updateAwaitFeedback() {
  let awaitFeedback = todos.filter(
    (awaitFeedback) => awaitFeedback["status"] == "awaitFeedback"
  );
  let content = document.getElementById("awaitFeedback");
  content.innerHTML = "";
  if (awaitFeedback.length == 0) {
    content.innerHTML = generateEmptyHTML("await feedback");
  } else {
    for (let index = 0; index < awaitFeedback.length; index++) {
      const element = awaitFeedback[index];
      content.innerHTML += generateTaskCard(element);
    }
  }
}

function updateDone() {
  let closed = todos.filter((todo) => todo["status"] == "closed");
  let content = document.getElementById("closed");
  content.innerHTML = "";
  if (closed.length == 0) {
    content.innerHTML = generateEmptyHTML("are closed");
  } else content.innerHTML = "";
  for (let index = 0; index < closed.length; index++) {
    const element = closed[index];
    content.innerHTML += generateTaskCard(element);
  }
}

function updateTaskColor() {
  let elements = document.getElementsByClassName("category-of-task");
  Array.from(elements).forEach((element) => {
    if (element.innerText.trim() === "User Story") {
      element.classList.add("user-story-task-color");
    } else {
      element.classList.add("technical-task-color");
    }
  });
}

function startDragging(id) {
  currentDraggedElement = id;
}

function generateEmptyHTML(text) {
  return `<div draggable="true" class="empty-task drag-and-drop-container-border">No tasks ${text}</div>`;
}

function generateTaskCard(element) {
  return `<div draggable="true" 
  ondragstart="startDragging(${element["id"]})" 
  id="${element["id"]}" class="task-card">
  <div class="category-of-task">${element["category"]}</div>
  <div class="title-of-task">${element["title"]}</div>
  <div class="description-of-task">${element["description"]}</div>
  <div class="subtasks-of-task">${element["subtasks"]}</div>
  <div class="assigned-and-priority-container">
    <div class="assigned-to-of-task">${element["assignedTo"]}</div>
    <div class="priority-of-task">${element["priority"]}</div>
  </div>

  </div>`;
}

function allowDrop(event) {
  event.preventDefault();
}

function moveTo(status) {
  todos[currentDraggedElement]["status"] = status;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function openAddTaskOverlay() {
  let overlay = document.getElementById("add-task-content-overlay");
  overlay.classList.remove("slide-in", "d-none");
  setTimeout(() => {
    overlay.classList.add("slide-in");
  }, 0);
  overlay.classList.remove("d-none");
}

function closeAddTaskOverlay() {
  let content = document.getElementById("add-task-content-overlay");
  content.classList.add("d-none");
}

function clearForm() {
  let inputs = document.querySelectorAll("input");
  let textarea = document.getElementById("description");
  let selects = document.querySelectorAll("select");
  inputs.forEach(function (input) {
    input.value = "";
  });
  selects.forEach(function (select) {
    select.selectedIndex = -1;
  });
  textarea.value = "";
}
