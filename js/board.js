let taskColor = {
  userStory: "#0038FF", // category 1
  technicalTask: "#1FD7C1", //category 2
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
  let content = document.getElementById("toDo");
  content.innerHTML = "";
  for (let i = 0; i < startData.length; i++) {
    const element = startData[i];
    if (element.hasOwnProperty("tasks")) {
      let toDo = element["tasks"].filter((todo) => todo["status"] == "toDo");
      for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        content.innerHTML += generateTaskCard(element);
      }
    } else if (toDo.length == 0) {
      content.innerHTML = generateEmptyHTML("to do");
    }
  }
}

function updateInProgress() {
  let content = document.getElementById("inProgress");
  content.innerHTML = "";
  for (let i = 0; i < startData.length; i++) {
    const element = startData[i];
    if (element.hasOwnProperty("tasks")) {
      let inProgress = element["tasks"].filter(
        (task) => task["status"] == "inProgress"
      );
      for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        content.innerHTML += generateTaskCard(element);
      }
    } else if (inProgress.length == 0) {
      content.innerHTML = generateEmptyHTML("in progress");
    }
  }
}

function updateAwaitFeedback() {
  let content = document.getElementById("awaitFeedback");
  content.innerHTML = "";
  for (let i = 0; i < startData.length; i++) {
    const element = startData[i];
    if (element.hasOwnProperty("tasks")) {
      let awaitFeedback = element["tasks"].filter(
        (task) => task["status"] == "awaitFeedback"
      );
      for (let index = 0; index < awaitFeedback.length; index++) {
        const element = awaitFeedback[index];
        content.innerHTML += generateTaskCard(element);
      }
    } else if (awaitFeedback.length == 0) {
      content.innerHTML = generateEmptyHTML("await feedback");
    }
  }
}

function updateDone() {
  let content = document.getElementById("closed");
  content.innerHTML = "";
  for (let i = 0; i < startData.length; i++) {
    const element = startData[i];
    if (element.hasOwnProperty("tasks")) {
      let closed = element["tasks"].filter((task) => task["status"] == "done");
      for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        content.innerHTML += generateTaskCard(element);
      }
    } else if (closed.length == 0) {
      content.innerHTML = generateEmptyHTML("are closed");
    }
  }
}

function updateTaskColor() {
  let elements = document.getElementsByClassName("category-of-task");
  Array.from(elements).forEach((element) => {
    if (element.innerText.trim() == 1) {
      element.classList.add("user-story-task-color");
    } else {
      element.classList.add("technical-task-color");
    }
  });
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

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(event) {
  event.preventDefault();
}

function moveTo(status) {
  //hier die richtige task finden!!!
  let index = currentDraggedElement;
  for (let i = 0; i < startData.length; i++) {
    let element = startData[i]["tasks"];
    if (element[i].id == currentDraggedElement) {
      console.log("bin da!");
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

// clear assigned to - is missing
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
