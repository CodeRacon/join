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

/**
 * Updates the HTML DOM to reflect the latest state of tasks.
 * Calls various helper functions to update different sections.
 */
async function updateHTML() {
  await loadUserData();
  updateToDos();
  updateInProgress();
  updateAwaitFeedback();
  updateDone();
  updateTaskColorAndCategory();
  updatePriority();
  showContactsToAssign();
}

/**
 * Updates the To Do section of the HTML DOM
 * to show the tasks with a "toDo" status for each user.
 *
 * Loops through each user's tasks, filters for "toDo" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "toDo" tasks exist for a user, generates empty state HTML.
 */
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

/**
 * Updates the in progress section of the HTML DOM
 * to show the tasks with a "inProgress" status for each user.
 *
 * Loops through each user's tasks, filters for "inProgress" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "inProgress" tasks exist for a user, generates empty state HTML.
 */
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

/**
 * Updates the await feedback section of the DOM
 * to show the tasks with a "awaitFeedback" status for each user.
 *
 * Loops through each user's tasks, filters for "awaitFeedback" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "awaitFeedback" tasks exist for a user, generates empty state HTML.
 */
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

/**
 * Updates the "closed" section of the DOM
 * to show the tasks with a "done" status for each user.
 *
 * Loops through each user's tasks, filters for "done" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "done" tasks exist for a user, generates empty state HTML.
 */
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

/**
 * Updates the color and text of task category elements
 * based on their category ID.
 *
 * Loops through all elements with "category-of-task" class,
 * checks category ID, and updates class for styling and innerText
 * to show category name.
 */
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

/**
 * Updates the priority icons in the DOM
 * by replacing the priority number values
 * with corresponding icon images.
 *
 * Gets all elements with "priority-of-task" class,
 * checks priority number, and updates innerHTML
 * to show correct priority icon image.
 */
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

/**
 * Displays initials of assigned users inside the assigned user
 * indicator element.
 *
 * Loops through the array of assigned user names, extracts the
 * first initial from each name, finds the user color for that
 * user, and adds a div with the colored initial to the indicator
 * element.
 */
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

/**
 * Generates a progress bar and text indicating number of subtasks completed.
 *
 * Gets container element by ID, checks if subtasks array exists on element,
 * calculates percentage of subtasks completed, generates progress bar element
 * with appropriate value, and text indicating number of subtasks completed vs total.
 */
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

/**
 * Generates HTML for a task card element.
 *
 * Accepts a task object and returns a string containing HTML to display a draggable,
 * clickable card for that task. Includes task category, title, description, progress bar,
 * assigned user initials, and priority.
 */
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

/**
 * Sets the global currentDraggedElement variable to the provided id.
 * This allows tracking the id of the element currently being dragged.
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Prevents the default dragover event to allow dropping.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Moves the task with the given ID to the specified status.
 * Iterates through all users' tasks to find the task with the matching ID,
 * then updates its status property to the provided status.
 * Saves the updated user data and re-renders the UI.
 */
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

/**
 * Adds the "drag-area-highlight" class to the element with the given ID.
 * This highlights the element as a drag target area.
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * Removes the "drag-area-highlight" class from the element with the given ID.
 * This removes the highlight indicating it as a drag target area.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

// :::::::::::::::::::::: Task - Card - PopUp :::::::::::::::::::::://

/**
 * Opens an overlay with details for the task card with the given ID.
 *
 * Finds the task card object matching the ID from the user data.
 * Renders the task details in the overlay HTML.
 * Calls other functions to update styles and show additional info.
 *
 * @param {string} element - The ID of the task card to show details for
 */
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
          <img onclick="deleteTask(${card.id})" src="assets/img/icons/board/delete-bin.svg" alt="delete">
          <hr>
          <img onclick="editTask(${card.id})" src="assets/img/icons/board/edit-pen.svg" alt="edit">
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

/**
 * Updates the styling of the task category element in the
 * overlay task card to indicate the category type.
 */
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

/**
 * Updates styling of priority element in overlay
 * task card based on priority value.
 *
 * @param {HTMLElement[]} prioBox - Array of priority elements
 */
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

/**
 * Displays the initials of each user assigned to the task
 * in the overlay task card.
 *
 * Loops through the array of assigned user names, extracts the
 * first letter of each part of the name to create initials,
 * finds the user object to get the color, and adds a div with
 * the initials styled with the color and the full name.
 */
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

/**
 * Displays the subtasks for the task card that is currently opened.
 * Loops through the subtasks array and adds a div for each subtask
 * with the name and a checkbox to mark it done/not done.
 * Handles toggling the checkbox when clicked and updating styles.
 */
function showSubtasks() {
  let content = document.getElementById(`progress${actualCard.id}`);
  content.innerHTML = "";
  content.innerHTML = `<span>Subtasks</span>`;
  for (let index = 0; index < actualCard.subtasks.length; index++) {
    let element = actualCard.subtasks[index]["name"];
    content.innerHTML += `<div class="subtask-container">
    <img class="img-checked-true-false" alt="checked" onclick="changeSubtaskToDoneOrNot(${index})">
    ${element}
    </div>`;
    let status = actualCard.subtasks[index]["done"];
    let img = document.getElementsByClassName("img-checked-true-false")[index];
    if (status === true) {
      img.src = taskDone;
      img.classList.add("is-done");
    } else {
      img.src = taskNotDone;
      img.classList.add("not-done");
    }
  }
}

/**
 * Closes the overlay for the expanded task card.
 * Removes the open classes from the overlay, waits briefly via setTimeout,
 * then adds the closed class. Also empties the inner HTML.
 */
function closeTaskCardOverlay() {
  let overlay = document.getElementById("overlay-task-card");
  overlay.classList.remove("box-slide-in", "d-none");
  setTimeout(() => {
    overlay.classList.add("box-slide-out");
  }, 0);
  overlay.classList.remove("d-none");
  overlay.innerHTML = "";
}

/**
 * Deletes a task card from the board.
 * Loops through all users and their tasks to find the
 * task with the matching id. Removes that task from the user's
 * tasks array. Saves the updated user data, closes the expanded
 * task card overlay, and updates the HTML to reflect the change.
 */
function deleteTask(card) {
  for (let i = 0; i < localUserData.users.length; i++) {
    for (let j = 0; j < localUserData.users[i].tasks.length; j++) {
      if (localUserData.users[i].tasks[j].id === card) {
        localUserData.users[i].tasks.splice(j, 1);
      }
    }
  }
  saveUserData();
  closeTaskCardOverlay();
  updateHTML();
}

/**
 * Toggles the 'done' status of a subtask at the given index
 * in the actualCard's subtasks array.
 * Updates the subtask status in local storage and
 * re-renders the subtasks section of the task card.
 */
function changeSubtaskToDoneOrNot(index) {
  let subtask = actualCard.subtasks[index];
  if (subtask.done === false) {
    subtask.done = true;
  } else {
    subtask.done = false;
  }
  localUserData.users.indexOf(actualCard);
  saveUserData();
  showSubtasks();
}

function editTask(card) {
  let taskCard = document.getElementById("overlay-task-card");
  taskCard.classList.add("d-none");
  let newOverlay = document.getElementById("overlay-edit-card");
  newOverlay.classList.remove("d-none");
  newOverlay.innerHTML = "";

  for (let i = 0; i < localUserData.users.length; i++) {
    actualCard = localUserData.users[i];
    for (let j = 0; j < actualCard.tasks.length; j++) {
      const taskId = actualCard.tasks[j].id;
      const task = actualCard.tasks[j];
      if (taskId == card) {
        newOverlay.innerHTML = ` 
				<div class="main-cotainer single-task-card gap-05rem">
				  <span>Title</span>
				  <input
					id="title-value"
					name="title"
					type="text"
					value= '${task.title}'
					placeholder="Enter a title"
					class="field-width-height input-borders title"
					required
				  />
				  <!-- description-->
				  <span>Description</span>
				  <textarea
					name="description-text"
					id="description"
					
					class="field-width-height description-height input-borders description"
					placeholder="Enter a Description"
					cols="30"
					rows="10"
				  >${task.description}</textarea>
				  <!-- assign to -->
				  <label for="assign-select"><span>Assigned to</span> </label>
				  <div
					class="field-width-height borders input-borders assigned-to"
					onclick="openAndCloseDropDownToAssign()"
				  >
					<input
					  name="select-contact"
					  type="text"
					  class="border-none"
					  id="dropdownInput"
					  placeholder="Select contacts to assign"
					  onkeyup="filterContactsToAssign(), onlyOpenDropDownToAssign()"
					/>
					<img
					  id="arrowImg"
					  src="./assets/img/icons/add-task/arrow-down.svg"
					  alt="Arrow down icon"
					/>
				  </div>
				  <div
					class="dropdown-content btn-borders dropdown-content-style"
					id="dropdownContent"
				  >
					<div id="labels"></div>
				  </div>
				  <div id="initialsOfAssigned"></div>
				  <!-- Date -->
				  <span>Due Date</span>
				  <div class="field-width-height">
					<input
					  id="due-date-value"
					  value= '${task.dueDate}'
					  name="date"
					  type="date"
					  placeholder="dd/mm/yyy"
					  class="field-width-height input-borders due-date"
					  required
					/>
				  </div>
				  <!--Prio-->
				  <span>Prio</span>
				  <div class="priority">
					<button
					  id="urgent-btn"
					  class="prio-box input-borders"
					  onclick="setPriority('urgent')"
					>
					  Urgent
					  <img
						id="img-urgent"
						src="./assets/img/icons/add-task/urgent.svg"
						alt="urgent symbol"
					  />
					</button>
					<button
					  id="medium-btn"
					  class="prio-box input-borders"
					  onclick="setPriority('medium')"
					>
					  Medium
					  <img
						id="img-medium"
						src="./assets/img/icons/add-task/medium-white.svg"
						alt="medium symbol"
					  />
					</button>
					<button
					  id="low-btn"
					  class="prio-box input-borders"
					  onclick="setPriority('low')"
					>
					  Low
					  <img
						id="img-low"
						src="./assets/img/icons/add-task/low.svg"
						alt="low symbol"
					  />
					</button>
				  </div>
				  <!-- Category -->
				  <label for="category-select" onclick="getCategory()"
					><span>Category</span></label
				  >
				  <select
					name="category"
					id="category"
					value= '${task.category}'
					class="field-width-height input-borders category"
					required
				  >
					<option value="option-text" disabled selected>
					  Select task category
					</option>
					<option value="user-story">User Story</option>
					<option value="technical-task">Technical Task</option>
				  </select>
				  <!-- Subtasks -->
				  <span>Subtasks</span>
				  <div class="field-width-height input-borders subtasks">
					<input
					  id="input-of-subtask"
					  type="text"
					  placeholder="Add new subtasks"
					  class="border-none"
					/>
					<img
					  onclick="createSubtask()"
					  src="./assets/img/icons/add-task/plus.svg"
					  alt="plus symbol"
					/>
				  </div>
				  <div id="show-subtasks-container"></div>
				</div>
		
		`;

        assignContactsToEdit(task);
        showSubtasksToEdit(task);
        showContactsToAssign();
        showInitialsOfAssigned();
        changeCheckboxColor(i);
      }
    }
  }
}

function assignContactsToEdit(task) {
  let contacts = task.assignedTo;
  newAssignedContacts = contacts;
}

function showSubtasksToEdit(task) {
  let subtasksContainer = document.getElementById("show-subtasks-container");
  for (let index = 0; index < task.subtasks.length; index++) {
    const subtask = task.subtasks[index];
    let listItemId = `subtask-${index}`;
    subtasksContainer.innerHTML += `
	  <div class="subtask-list-container">
		<li id="${listItemId}"><input readonly type="text" value="${subtask.name}"></li>
			<div class="edit-delete-container">
			  <img id="edit-button${index}" onclick="correctSubtask(${index})" src="assets/img/icons/add-task/edit.svg" alt="edit">
			  <img onclick="deleteSubtask(${index})" src="assets/img/icons/add-task/delete.svg" alt="delete">
			</div>
		
	  </div>
	`;
  }
}

// :::::::::::::::::::::: Add - Task - PopUp :::::::::::::::::::::://

/**
 * Opens the add task dialogue box to add a new task.
 * Removes the 'box-slide-out' and 'd-none' classes from the overlay
 * to make it visible. Adds the 'box-slide-in' class to animate it opening.
 */
function openAddTaskOverlay() {
  let overlay = document.getElementById("add-task-content-overlay");
  overlay.classList.remove("box-slide-out", "d-none");
  setTimeout(() => {
    overlay.classList.add("box-slide-in");
  }, 0);
  overlay.classList.remove("d-none");
}

/**
 * Closes the add task dialogue box by removing the 'box-slide-in' and 'd-none' classes,
 * adding the 'box-slide-out' class after a timeout to animate it closing,
 * and ensuring the overlay is not hidden with 'd-none' after closing.
 */
function closeAddTaskOverlay() {
  let overlay = document.getElementById("add-task-content-overlay");
  overlay.classList.remove("box-slide-in", "d-none");
  setTimeout(() => {
    overlay.classList.add("box-slide-out");
  }, 0);
  overlay.classList.remove("d-none");
}
