let taskColor = {
  userStory: "#0038FF", // category 1
  technicalTask: "#1FD7C1", //category 2
};

let low = "assets/img/icons/add-task/low.svg";
let medium = "assets/img/icons/add-task/medium-orange.svg";
let high = "assets/img/icons/add-task/urgent.svg";

let taskDone = "assets/img/icons/board/cf_checked.svg";
let taskNotDone = "assets/img/icons/board/cf_unchecked.svg";

let currentDraggedElement;

let actualCard;

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
  for (let i = 0; i < localUserData["users"].length; i++) {
    const element = localUserData["users"][i];
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
  for (let i = 0; i < localUserData["users"].length; i++) {
    const element = localUserData["users"][i];
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

  for (let i = 0; i < localUserData["users"].length; i++) {
    const element = localUserData["users"][i];
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
  for (let i = 0; i < localUserData["users"].length; i++) {
    const element = localUserData["users"][i];
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
    let user = localUserData["users"].find(
      (user) => user.userData.name === name
    );
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

    container.innerHTML = `<progress value="${progress}" max="100" class="progress-bar"></progress>
          <div class="amount-of-subtasks-container">
        <div>
        ${doneSubtasks}/${subtasks.length} Subtasks
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
    id="${element["id"]}" class="task-card" onclick="openTaskCardOverlay(${element["id"]})">
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
  for (let i = 0; i < localUserData["users"].length && gotIt == false; i++) {
    let element = localUserData["users"][i]["tasks"];
    for (let j = 0; j < element.length; j++) {
      if (element[j].id === id) {
        localUserData["users"][i]["tasks"][j].status = status;
        gotIt = true;
      }
    }
  }
  saveUserData();
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

// :::::::::::::::::::::: Task - Card - PopUp :::::::::::::::::::::://

function openTaskCardOverlay(element) {
  let overlay = document.getElementById("overlay-task-card");
  overlay.classList.remove("box-slide-out", "d-none");
  setTimeout(() => {
    overlay.classList.add("box-slide-in");
  }, 0);
  overlay.classList.remove("d-none");

  localUserData.users.forEach((user) => {
    let cardIndex = user.tasks.findIndex((task) => task.id === element);
    let card = user.tasks[cardIndex];

    if (cardIndex !== -1) {
      actualCard = card;
      overlay.innerHTML = `<div draggable="false" 
        id="${card.id}" class="single-task-card">
        <div class="header-of-task-card">
        <div class="category-of-single-task">${card.category}</div>
        <img onclick="closeTaskCardOverlay()" src="assets/img/icons/board/close.svg" alt="close">
        </div>
          <div class="title-of-single-task">${card.title}</div>
          <div class="description-of-single-task"><span>${card.description}</span></div>
          <div class="due-date-of-single-task gap-one-rem"><span>Due Date:</span><span>${card.dueDate}</span></div>
          <div class="priority-of-single-task gap-one-rem">${card.priority}</div>
          <div class="assigned-and-priority-single-container">
          <span>Assigned To:</span> 
            <div id="singleAssignedCircle${card.id}" class="assigned-to-of-single-task">${card.assignedTo}</div>
          </div>
          <div class="subtasks-of-single-task" id="progress${card.id}"></div>
          <div class="delete-edit-container">
          <img onclick="deleteTask()" src="assets/img/icons/board/delete-bin.svg" alt="delete">
          <hr>
          <img src="assets/img/icons/board/edit-pen.svg" alt="edit">
          </div>
        </div>`;
    } else {
      return;
    }
  });
  taskColorAndCategoryForSingleCard();
  updatePriorityForSingleTask();
  showInitialsForSingleCard();
  showSubtasks();
}

function taskColorAndCategoryForSingleCard() {
  let element = document.getElementsByClassName("category-of-single-task");
  Array.from(element).forEach((element) => {
    if (element.innerText.trim() == 1) {
      element.classList.add("user-story-task-color");
      element.innerHTML = "User Story";
    } else {
      element.classList.add("technical-task-color");
      element.innerHTML = "Technical Task";
    }
  });
}

function updatePriorityForSingleTask() {
  let prioBox = document.getElementsByClassName("priority-of-single-task");
  Array.from(prioBox).forEach((prioBox) => {
    if (prioBox.innerText.trim() == 1) {
      prioBox.innerHTML = `<span>Priority:
      </span><div class="priority-and-icon"><span>Low</span><img src="${low}" alt="low Priority">
      </div>`;
    } else if (prioBox.innerText.trim() == "2") {
      prioBox.innerHTML = `<span>Priority:
      </span><div class="priority-and-icon"><span>Medium</span><img src="${medium}" alt="medium Priority">
      </div>`;
    } else if (prioBox.innerText.trim() == "3") {
      prioBox.innerHTML = `<span>Priority:
      </span><div class="priority-and-icon"><span>High</span><img src="${high}" alt="high Priority">
      </div>`;
    }
  });
}

function showInitialsForSingleCard() {
  let allInitials = actualCard.assignedTo;
  let container = document.getElementById(
    `singleAssignedCircle${actualCard["id"]}`
  );
  container.innerHTML = "";
  allInitials.forEach((name) => {
    const initial = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    let user = localUserData["users"].find(
      (user) => user.userData.name === name
    );
    let color = user ? user.color : "#d98973";
    container.innerHTML += `
    <div class="name-and-initial-container">
    <div
    class="initialsCircleOfSingleTasks"
        style="background-color: ${color}">
        ${initial}    
  </div>
  <span>${name}</span>
  </div>
`;
  });
}

function showSubtasks() {
  let content = document.getElementById(`progress${actualCard.id}`);
  content.innerHTML = "";
  content.innerHTML = `<span>Subtasks</span>`;
  for (let index = 0; index < actualCard.subtasks.length; index++) {
    let element = actualCard.subtasks[index]["name"];
    content.innerHTML += `<div class="subtask-container">
    <img class="img-checked-true-false" alt="checked">
    ${element}
    </div>`;
    let status = actualCard.subtasks[index]["done"];
    let img = document.getElementsByClassName("img-checked-true-false")[index];
    if (status === true) {
      img.src = taskDone;
    } else {
      img.src = taskNotDone;
    }
  }
}

function closeTaskCardOverlay() {
  let overlay = document.getElementById("overlay-task-card");
  overlay.classList.remove("box-slide-in", "d-none");
  setTimeout(() => {
    overlay.classList.add("box-slide-out");
  }, 0);
  overlay.classList.remove("d-none");
  overlay.innerHTML = "";
}

function deleteTask() {
  //hier löschfunktion für diese spezielle task!
}

// :::::::::::::::::::::: Add - Task - PopUp :::::::::::::::::::::://

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
