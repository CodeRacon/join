let taskColor = {
  userStory: "#0038FF", // category 1
  technicalTask: "#1FD7C1", //category 2
};

let low = "assets/img/icons/add-task/low.svg";
let medium = "assets/img/icons/add-task/medium-orange.svg";
let high = "assets/img/icons/add-task/urgent.svg";

let currentDraggedElement;

async function updateHTML() {
  await loadUserData();
  updateToDos();
  updateInProgress();
  updateAwaitFeedback();
  updateDone();
  updateTaskColorAndCategory();
  updatePriority();
}

function updateToDos() {
  let content = document.getElementById("toDo");
  content.innerHTML = "";
  for (let i = 0; i < startData["users"].length; i++) {
    const element = startData["users"][i];
    if (element.hasOwnProperty("tasks")) {
      let toDo = element["tasks"].filter((todo) => todo["status"] == "toDo");
      for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        content.innerHTML += generateTaskCard(element);
        showInitials(element);
        generateProgressBar(element);
      }
    } else if (toDo.length == 0) {
      content.innerHTML = generateEmptyHTML("to do");
    }
  }
}

function updateInProgress() {
  let content = document.getElementById("inProgress");
  content.innerHTML = "";
  for (let i = 0; i < startData["users"].length; i++) {
    const element = startData["users"][i];
    if (element.hasOwnProperty("tasks")) {
      let inProgress = element["tasks"].filter(
        (task) => task["status"] == "inProgress"
      );
      for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        content.innerHTML += generateTaskCard(element);
        showInitials(element);
        generateProgressBar(element);
      }
    } else if (inProgress.length == 0) {
      content.innerHTML = generateEmptyHTML("in progress");
    }
  }
}

function updateAwaitFeedback() {
  let content = document.getElementById("awaitFeedback");
  content.innerHTML = "";

  for (let i = 0; i < startData["users"].length; i++) {
    const element = startData["users"][i];
    if (element.hasOwnProperty("tasks")) {
      let awaitFeedback = element["tasks"].filter(
        (task) => task["status"] == "awaitFeedback"
      );
      for (let index = 0; index < awaitFeedback.length; index++) {
        const element = awaitFeedback[index];
        content.innerHTML += generateTaskCard(element);
        showInitials(element);
        generateProgressBar(element);
      }
    } else if (awaitFeedback.length == 0) {
      content.innerHTML = generateEmptyHTML("await Feedback");
    }
  }
}

function updateDone() {
  let content = document.getElementById("closed");
  content.innerHTML = "";
  for (let i = 0; i < startData["users"].length; i++) {
    const element = startData["users"][i];
    if (element.hasOwnProperty("tasks")) {
      let closed = element["tasks"].filter((task) => task["status"] == "done");
      for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        content.innerHTML += generateTaskCard(element);
        showInitials(element);
        generateProgressBar(element);
      }
    } else if (closed.length == 0) {
      content.innerHTML = generateEmptyHTML("are closed");
    }
  }
}

function updateTaskColorAndCategory() {
  let elements = document.getElementsByClassName("category-of-task");
  Array.from(elements).forEach((element) => {
    if (element.innerText.trim() == 1) {
      element.classList.add("user-story-task-color");
      element.innerHTML = "User Story";
    } else {
      element.classList.add("technical-task-color");
      element.innerHTML = "Technical Task";
    }
  });
}

function updatePriority() {
  let prioBoxes = document.getElementsByClassName("priority-of-task");
  Array.from(prioBoxes).forEach((prioBox) => {
    if (prioBox.innerText.trim() == 1) {
      prioBox.innerHTML = `<img src="${low}" alt="Low Priority">`;
    } else if (prioBox.innerText.trim() == "2") {
      prioBox.innerHTML = `<img src="${medium}" alt="Low Priority">`;
    } else if (prioBox.innerText.trim() == "3") {
      prioBox.innerHTML = `<img src="${high}" alt="Low Priority">`;
    }
  });
}

function showInitials(element) {
  let allInitials = element.assignedTo;
  let container = document.getElementById(`assignedCircle${element["id"]}`);
  container.innerHTML = "";
  allInitials.forEach((name) => {
    const initial = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    let user = startData["users"].find((user) => user.userData.name === name);
    let color = user ? user.color : "#d98973";
    container.innerHTML += `
    <div
    class="initialsCircleOfTasks"
        style="background-color: ${color}">
        ${initial}
  </div>
`;
  });
}

function generateProgressBar(element) {
  let container = document.getElementById(`progress${element["id"]}`);
  let subtasks = element["subtasks"];
  if (!element.hasOwnProperty("subtasks")) {
    return;
  } else {
    let doneSubtasks = subtasks.filter((subtask) => subtask.done).length;
    let progress = (doneSubtasks / subtasks.length) * 100;

    container.innerHTML = ` <div class="progress-bar-container">
        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="height: 0.5rem">
        <div class="progress-bar" style="width: ${progress}%"></div>
      </div>
      
      </div>
      <div class="amount-of-subtasks-container">
        <div>
        ${doneSubtasks}/${subtasks.length}
        Subtasks
        </div>
      </div> 
      </div>`;
  }
}

// funktioniert noch nicht, muss angepasst werden!!! //
function generateEmptyHTML(text) {
  return `<div draggable="true" class="empty-task drag-and-drop-container-border">No tasks ${text}</div>`;
}

function generateTaskCard(element) {
  return `
  <div draggable="true" 
    ondragstart="startDragging(${element["id"]})" 
    id="${element["id"]}" class="task-card">
      <div class="category-of-task">${element["category"]}</div>
      <div class="title-of-task">${element["title"]}</div>
      <div class="description-of-task">${element["description"]}</div>
      <div class="subtasks-of-task" id="progress${element["id"]}"></div>
      <div class="assigned-and-priority-container">
      <div id="assignedCircle${element["id"]}" class="assigned-to-of-task">${element["assignedTo"]}</div>
      <div class="priority-of-task">${element["priority"]}</div>
  </div>
   `;
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(event) {
  event.preventDefault();
}

function moveTo(status) {
  let id = currentDraggedElement;
  gotIt = false;
  for (let i = 0; i < startData["users"].length && gotIt == false; i++) {
    let element = startData["users"][i]["tasks"];
    for (let j = 0; j < element.length; j++) {
      if (element[j].id === id) {
        startData["users"][i]["tasks"][j].status = status;
        gotIt = true;
      }
    }
  }
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

// :::::::::::::::::::::: Task - Card - PopUp :::::::::::::::::::::://

// :::::::::::::::::::::: Add - Task - PopUp :::::::::::::::::::::://

// clear assigned to - is missing //
function clearForm() {
  let inputs = document.querySelectorAll("input");
  let textarea = document.getElementById("description");
  let selects = document.querySelectorAll("select");
  let subtask = document.getElementById("show-subtasks-container");
  inputs.forEach(function (input) {
    input.value = "";
  });
  selects.forEach(function (select) {
    select.selectedIndex = -1;
  });
  textarea.value = "";
  subtasks.innerHTML = "";
}

function openAddTaskOverlay() {
  let overlay = document.getElementById("add-task-content-overlay");
  overlay.classList.remove("box-slide-out", "d-none");
  setTimeout(() => {
    overlay.classList.add("box-slide-in");
  }, 0);
  overlay.classList.remove("d-none");
}

function closeAddTaskOverlay() {
  let overlay = document.getElementById("add-task-content-overlay");
  overlay.classList.remove("box-slide-in", "d-none");
  setTimeout(() => {
    overlay.classList.add("box-slide-out");
  }, 0);
  overlay.classList.remove("d-none");
}
