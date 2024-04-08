/**
 * Checks if drag and drop is enabled based on window width.
 *
 * @returns {boolean} True if window width is greater than 1152px.
 */
function isDraggable() {
  return window.innerWidth > 1152;
}

/**
 * Renders the move menu dropdown for a task
 *
 * Generates the HTML for the dropdown menu shown when moving a task.
 * Filters the possible destinations based on the current source board,
 * and maps them to dropdown items calling the moveTask function.
 *
 * @param {string} source - The current board the task is in
 * @param {string} taskID - The ID of the task
 * @returns {string} The generated dropdown HTML
 */
function renderMoveMenu(source, taskID) {
  const destinations = [
    { label: "To do", value: "toDo" },
    { label: "In progress", value: "inProgress" },
    { label: "Await feedback", value: "awaitFeedback" },
    { label: "Done", value: "done" },
  ].filter((dest) => dest.value !== source);
  const dropdownItems = destinations
    .map((dest) => renderMoveMenuHTML(taskID, dest))
    .join("");
  return dropdownItems;
}

/**
 * Toggles the move menu dropdown for a task
 *
 * Shows or hides the move menu dropdown for the task with the given ID.
 * Handles resetting any other open menus and buttons.
 */
function toggleMoveBtnMenu(event, taskID) {
  event.stopPropagation();
  const moveMenu = document.getElementById(`move-menu-${taskID}`);
  const btnIcon = document.getElementById(`btn-icon-${taskID}`);
  resetNonSelectedMenus(`move-menu-${taskID}`);
  resetNonSelectedBtns(`btn-icon-${taskID}`);
  if (moveMenu.classList.contains("d-none")) {
    moveMenu.classList.replace("qm-off", "qm-on");
    setTimeout(() => {
      btnIcon.classList.replace("menu-closed", "menu-open");
      moveMenu.classList.toggle("d-none");
    }, 125);
  } else {
    btnIcon.classList.replace("menu-open", "menu-closed");
    moveMenu.classList.replace("qm-on", "qm-off");
    setTimeout(() => {
      moveMenu.classList.toggle("d-none");
    }, 125);
  }
}

/**
 * Resets the class names on all move menus except the selected one
 * to hide them.
 *
 * @param {string} selectedMenuId - The ID of the menu to not reset
 */
function resetNonSelectedMenus(selectedMenuId) {
  const allMoveMenus = document.querySelectorAll(".move-menu");
  allMoveMenus.forEach((menu) => {
    if (menu.id !== selectedMenuId) {
      menu.classList.add("d-none");
      menu.classList.remove("qm-on");
      menu.classList.add("qm-off");
    }
  });
}

/**
 * Resets the "menu-open" and "menu-closed" classes on all button icons except the selected one.
 *
 * @param {string} selectedBtnId - The ID of the selected button
 */
function resetNonSelectedBtns(selectedBtnId) {
  const allBtnIcons = document.querySelectorAll(".mobile-move-btn img");
  allBtnIcons.forEach((icon) => {
    if (icon.id !== selectedBtnId) {
      icon.classList.remove("menu-open");
      icon.classList.add("menu-closed");
    }
  });
}

/**
 * Sets the global currentDraggedElement variable to the provided id.
 * This allows tracking the id of the element currently being dragged.
 */
function startDragging(id) {
  currentDraggedElement = id;
  const draggedTask = document.getElementById(id);
  draggedTask.classList.add("dragged");
}

/**
 * Unsets the global currentDraggedElement variable and removes
 * the "dragged" class from the DOM element with the provided id.
 * This is called when dragging ends to reset the element.
 *
 * @param {string} id - The id of the DOM element that was being dragged
 */
function stopDragging(id) {
  currentDraggedElement = id;
  const draggedTask = document.getElementById(id);
  draggedTask.classList.remove("dragged");
}

/**
 * Prevents the default dragover event to allow dropping.
 */
function allowDrop(event) {
  event.preventDefault();
}

/**
 * Moves a dragged task element to the given status by updating its status property.
 *
 * Loops through the local user data to find the task with matching ID, then updates
 * its status property. Saves the updated user data and re-renders the HTML.
 *
 * @param {string} status - The status to set the task to, e.g. "todo", "in-progress", "done"
 */
function movePerDrag(status) {
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
 * Disables the draggable option for all task cards on the board.
 * This function is used to prevent users from dragging task cards when certain conditions are met, such as when the task is completed or when the user is not authorized to perform certain actions.
 */
function disableDragOption() {
  const allTaskCards = document.querySelectorAll(".task-card");

  for (let i = 0; i < allTaskCards.length; i++) {
    allTaskCards[i].setAttribute("draggable", "false");
  }
}

/**
 * Moves a task with the given ID to the specified destination status.
 * Iterates through all users' tasks to find the matching task ID, then
 * updates its status property. Saves the updated user data and re-renders
 * the UI.
 *
 * @param {number} taskID - The ID of the task to move
 * @param {string} destination - The status to set the task to
 */
function movePerMenu(taskID, destination) {
  taskID = parseInt(taskID);
  let gotIt = false;
  for (let i = 0; i < localUserData["users"].length && !gotIt; i++) {
    let tasks = localUserData["users"][i]["tasks"];
    for (let j = 0; j < tasks.length; j++) {
      if (tasks[j].id === taskID) {
        localUserData["users"][i]["tasks"][j].status = destination;
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

/**
 * Checks if the provided element has no content.
 * If empty, generates and inserts empty state HTML.
 *
 * @param {string} id - The ID of the DOM element to check.
 * @param {string} text - The text to display in the empty state.
 */
function checkIfEmpty(id, text) {
  let content = document.getElementById(id);
  if (content.innerHTML === "") {
    content.innerHTML = generateEmptyHTML(text);
  }
}

/**
 * Checks if any of the task container elements are empty
 * and generates empty state HTML if so.
 *
 * @param {Element} toDoContainer - The container element for To Do tasks
 * @param {Element} inProgressContainer - The container for In Progress tasks
 * @param {Element} awaitFeedbackContainer - The container for Awaiting Feedback tasks
 * @param {Element} doneContainer - The container for Closed/Done tasks
 */
function checkForEmptyContainers() {
  let toDoContainer = document.getElementById("toDo");
  let inProgressContainer = document.getElementById("inProgress");
  let awaitFeedbackContainer = document.getElementById("awaitFeedback");
  let doneContainer = document.getElementById("closed");

  if (toDoContainer.childElementCount == 0) {
    toDoContainer.innerHTML = generateEmptyHTML("to do");
  }
  if (inProgressContainer.childElementCount == 0) {
    inProgressContainer.innerHTML = generateEmptyHTML("in progress");
  }
  if (awaitFeedbackContainer.childElementCount == 0) {
    awaitFeedbackContainer.innerHTML = generateEmptyHTML("awaiting feedback");
  }
  if (doneContainer.childElementCount == 0) {
    doneContainer.innerHTML = generateEmptyHTML("closed");
  }
}
