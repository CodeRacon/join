let taskColor = {
  userStory: "#0038FF",
  technicalTask: "#1FD7C1",
};
let low = "assets/img/icons/add-task/low.svg";
let medium = "assets/img/icons/add-task/medium-orange.svg";
let high = "assets/img/icons/add-task/urgent.svg";
let taskDone = "assets/img/icons/board/cf_checked.svg";
let taskNotDone = "assets/img/icons/board/cf_unchecked.svg";
let currentDraggedElement;
let actualCard;

window.addEventListener("resize", updateHTML);

/**
 * Updates the HTML elements on the board to reflect the latest data.
 *
 * This function is called on window resize to ensure the board layout is responsive.
 * It loads the user data, then updates each section of the board:
 * - To Dos
 * - In Progress
 * - Await Feedback
 * - Done
 * - Task colors and categories
 * - Task priorities
 * - Contacts to assign
 *
 * After updating data, it clears any values in the form.
 */
async function updateHTML() {
  const userID = getLoggedInUserID();
  await loadUserData(userID);
  updateToDos();
  updateInProgress();
  updateAwaitFeedback();
  updateDone();
  updateTaskColorAndCategory();
  updatePriority();
  showContactsToAssign();
  clearForm();
}

/**
 * Updates the HTML content of an element to display task cards for tasks
 * with a given status.
 *
 * Loops through localUserData to find tasks matching the given status.
 * Generates a task card for each matching task and adds it to the element's HTML.
 * Also calls a function to render initials and progress bars for each task.
 *
 * Finally checks if the element is empty and displays a message if so.
 *
 * @param {string} status - The task status to filter by
 * @param {string} elementId - The ID of the element to update
 * @param {string} emptyMessage - The message to display if element is empty
 */
function updateTaskStatus(status, elementId, emptyMessage) {
  let source = status;
  let content = document.getElementById(elementId);
  content.innerHTML = "";
  for (let i = 0; i < localUserData["users"].length; i++) {
    const element = localUserData["users"][i];
    if (element.hasOwnProperty("tasks")) {
      let filteredTasks = element["tasks"].filter(
        (task) => task["status"] == status
      );
      for (let index = 0; index < filteredTasks.length; index++) {
        const element = filteredTasks[index];
        content.innerHTML += generateTaskCard(element, source);
        renderInitialsProgressBarMaxThree(element);
      }
    }
  }
  checkIfEmpty(elementId, emptyMessage);
}

/**
 * Updates the HTML content to display tasks with the status "toDo".
 * Loops through localUserData to find tasks with status "toDo"
 * and generates a task card for each, adding it to the element
 * with ID "toDo". Also checks if the element is empty.
 */
function updateToDos() {
  updateTaskStatus("toDo", "toDo", "to do");
}

/**
 * Updates the HTML content to display tasks with the status "inProgress".
 * Loops through localUserData to find tasks with status "inProgress"
 * and generates a task card for each, adding it to the element
 * with ID "inProgress". Also checks if the element is empty.
 */
function updateInProgress() {
  updateTaskStatus("inProgress", "inProgress", "in progress");
}

/**
 * Updates the HTML content to display tasks with the status "awaitFeedback".
 * Loops through localUserData to find tasks with status "awaitFeedback"
 * and generates a task card for each, adding it to the element
 * with ID "awaitFeedback". Also checks if the element is empty.
 */
function updateAwaitFeedback() {
  updateTaskStatus("awaitFeedback", "awaitFeedback", "await feedback");
}

/**
 * Updates the HTML content to display tasks with the status "done".
 * Loops through localUserData to find tasks with status "done"
 * and generates a task card for each, adding it to the element
 * with ID "closed". Also checks if the element is empty.
 */
function updateDone() {
  updateTaskStatus("done", "closed", "done");
}

/**
 * Renders initials, progress bar and max three circles for a task element.
 *
 * Shows the initials of the user assigned to the task. Generates a
 * progress bar to display the task completion percentage. Displays up to
 * three small circles to represent subtasks of the task.
 *
 * @param {object} element - The task object.
 */
function renderInitialsProgressBarMaxThree(element) {
  showInitials(element);
  generateProgressBar(element);
  showMaxThreeCircles(element);
}

/**
 * Shows a maximum of 3 assigned user circles for a task.
 * If more than 3 users are assigned, hides the extra assigned
 * users and shows a "+X" indicator with the number hidden.
 */
function showMaxThreeCircles(element) {
  let container = document.getElementById(`assignedCircle${element.id}`);
  let childs = container.children;
  let moreAssigned = childs.length - 3;
  for (let i = 3; i < childs.length; i++) {
    childs[i].style.display = "none";
  }
  if (childs.length > 3) {
    container.innerHTML += showMaxThreeCirclesHTML(moreAssigned);
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
    if (
      prioBox.innerText.trim() == 1 ||
      prioBox.innerText.trim().toLowerCase() == "low"
    ) {
      prioBox.innerHTML = `<img src="${low}" alt="Low Priority">`;
    } else if (
      prioBox.innerText.trim() == "2" ||
      prioBox.innerText.trim().toLowerCase() == "medium"
    ) {
      prioBox.innerHTML = `<img src="${medium}" alt="Medium Priority">`;
    } else if (
      prioBox.innerText.trim() == "3" ||
      prioBox.innerText.trim().toLowerCase() == "urgent" ||
      prioBox.innerText.trim().toLowerCase() == "high"
    ) {
      prioBox.innerHTML = `<img src="${high}" alt="High Priority">`;
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
      .replace(/ \(You\)$/, "")
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    let user = localUserData["contacts"].find(
      (user) => user.userData.name === name
    );
    let color = user ? user.color : "#808080";
    container.innerHTML += showInitialsHTML(color, initial);
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
  container.innerHTML = "";
  let subtasks = element["subtasks"];
  if (!element.hasOwnProperty("subtasks") || subtasks.length == 0) {
    return;
  } else {
    let doneSubtasks = subtasks.filter((subtask) => subtask.done).length;
    let progress = (doneSubtasks / subtasks.length) * 100;
    container.innerHTML = generateProgressBarHTML(
      progress,
      doneSubtasks,
      subtasks
    );
  }
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
    if (
      prioBox.innerText.trim() == "1" ||
      prioBox.innerText.trim().toLowerCase() == "low"
    ) {
      prioBox.innerHTML = priorityLowHTML(low);
    } else if (
      prioBox.innerText.trim() == "2" ||
      prioBox.innerText.trim().toLowerCase() == "medium"
    ) {
      prioBox.innerHTML = priorityMediumHTML(medium);
    } else if (
      prioBox.innerText.trim() == "3" ||
      prioBox.innerText.trim().toLowerCase() == "urgent"
    ) {
      prioBox.innerHTML = priorityHighHTML(high);
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
      .replace(/ \(You\)$/, "")
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    let user = localUserData["contacts"].find(
      (user) => user.userData.name === name
    );
    let color = user ? user.color : "#A8A8A8";
    container.innerHTML += showInitialsForSingleCardHTML(color, initial, name);
  });
}

/**
 * Displays the subtasks for the task card that is currently opened.
 * Loops through the subtasks array and adds a div for each subtask
 * with the name and a checkbox to mark it done/not done.
 * Handles toggling the checkbox when clicked and updating styles.
 */
function showSubtasks() {
  let content = document.getElementById(`subtasks${actualCard.id}`);
  content.innerHTML = "";
  content.innerHTML = `<span>Subtasks</span>`;
  for (let index = 0; index < actualCard.subtasks.length; index++) {
    let element = actualCard.subtasks[index]["name"];
    content.innerHTML += showSubtasksHTML(index, element);
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
  closeOverlays();
  updateHTML();
  backDropOff();
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
