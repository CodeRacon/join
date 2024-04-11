// :::::::::::::::::::::: Add - Task - PopUp :::::::::::::::::::::://

/**
 * Opens the add task overlay/modal by:
 * - Getting reference to overlay element by ID
 * - Removing slide out and hidden classes
 * - Adding slide in class
 * - Removing hidden class again
 * - Calling backDropOn() to show modal background
 */
function openAddTaskOverlay(id) {
  let overlay = document.getElementById(id);
  overlay.classList.remove("box-slide-out", "d-none");
  overlay.classList.add("box-slide-in");
  overlay.classList.remove("d-none");
  backDropOn();
}

/**
 * Turns on the backdrop by removing the 'd-none' class and replacing
 * 'wrapper-off' with 'wrapper-on'.
 */
function backDropOn() {
  let wrapper = document.getElementById("wrapper");
  wrapper.classList.remove("d-none");
  wrapper.classList.replace("wrapper-off", "wrapper-on");
}

/**
 * Closes the add task overlay modal by:
 * - Clearing the form fields
 * - Getting reference to overlay element by ID
 * - Removing slide in class and adding slide out class
 * - Calling backDropOff() to hide modal background
 */
function closeAddTaskOverlay(id) {
  clearForm();
  if (window.location.pathname.endsWith("/board.html")) {
    closeEditTaskCard();
    let overlay = document.getElementById(id);
    overlay.classList.remove("box-slide-in", "d-none");
    overlay.classList.add("box-slide-out");
    overlay.classList.remove("d-none");
    backDropOff();
    updateHTML();
  }
}

/**
 * Turns off the backdrop by adding the 'd-none' class and replacing
 * 'wrapper-on' with 'wrapper-off'.
 */
function backDropOff() {
  let wrapper = document.getElementById("wrapper");
  wrapper.classList.add("d-none");
  wrapper.classList.replace("wrapper-on", "wrapper-off");
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
      overlay.innerHTML = openTaskCardOverlayHTML(card);
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
  actualCard = [];
  updateHTML();
}
