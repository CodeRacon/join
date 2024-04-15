let lowBtnEdit;
let mediumBtnEdit;
let urgentBtnEdit;
let imgLowEdit;
let imgMediumEdit;
let imgUrgentEdit;
let indexOfTaskBeforeEdit;

/**
 * Renders the edit view for a task by populating the edit overlay
 * and calling functions to setup edit functionality.
 *
 * @param {Object} task - The task object
 */
function renderEditView(task) {
  let newOverlay = document.getElementById("overlay-edit-card");
  newOverlay.innerHTML = editTaskHTML(task);
  newAssignedContacts = task.assignedTo;
  renderEditTaskCardFunctions(task);
}

/**
 * Renders the edit view for a task by populating the edit overlay
 * and calling functions to setup edit functionality.
 *
 * Finds the task object matching the given card ID from the localUserData
 * and renders the edit view if a match is found.
 *
 * @param {Object} card - The card object
 */
function editTask(card) {
  let taskCard = document.getElementById("overlay-task-card");
  taskCard.classList.add("d-none");
  let newOverlay = document.getElementById("overlay-edit-card");
  newOverlay.classList.remove("d-none");
  newOverlay.innerHTML = "";
  const task = localUserData.users
    .flatMap((user) => user.tasks)
    .find((task) => task.id === card);
  if (task) {
    renderEditView(task);
  }
  newAssignedContacts = [];
}

/**
 * Renders the edit task card by calling functions to:
 * - Show existing subtasks for editing
 * - Show contacts to assign for editing
 * - Show initials of currently assigned contacts
 * - Update selected contacts
 * - Initialize buttons
 * - Initialize images
 * - Set actual priority for editing
 * - Save category
 */
function renderEditTaskCardFunctions(task) {
  showSubtasksToEdit(task);
  showContactsToAssignEdit();
  showInitialsOfAssigned();
  updateSelectedContacts();
  initializeButtons();
  initializeImgs();
  setActualPriorityEdit(task);
  saveCategory(task);
}

/**
 * Saves the category of the edited task.
 *
 * @param {Object} task - The task object being edited.
 */
function saveCategory(task) {
  let categoryOfEdited = task.category;
  newCategory = categoryOfEdited;
}

/**
 * Initializes the low, medium, and urgent priority buttons on the edit task modal.
 */
function initializeButtons() {
  lowBtnEdit = document.getElementById("low-btn-edit");
  mediumBtnEdit = document.getElementById("medium-btn-edit");
  urgentBtnEdit = document.getElementById("urgent-btn-edit");
}

/**
 * Initializes the image elements that correspond to the priority levels for editing a task.
 * Gets references to the image elements with IDs img-low-edit, img-medium-edit, and img-urgent-edit.
 */
function initializeImgs() {
  imgLowEdit = document.getElementById("img-low-edit");
  imgMediumEdit = document.getElementById("img-medium-edit");
  imgUrgentEdit = document.getElementById("img-urgent-edit");
}

/**
 * Sets the actual priority for editing a task based on the
 * priority value passed in. Checks the priority value and calls
 * functions to set the correct priority button states.
 */
function setActualPriorityEdit(task) {
  let selectedPrio = task.priority;
  if (selectedPrio === 1) {
    currentPriority = "low";
    resetPrioButtonsEdit();
    prioLowEdit();
  }
  if (selectedPrio === 2) {
    currentPriority = "medium";
    resetPrioButtonsEdit();
    prioMediumEdit();
  }
  if (selectedPrio === 3) {
    currentPriority = "high";
    resetPrioButtonsEdit();
    prioUrgentEdit();
  }
}

/**
 * Changes the priority for the task being edited.
 *
 * @param {string} prio - The new priority level (low, medium, urgent)
 *
 * Resets the priority buttons.
 * Checks prio parameter and calls correct priority button functions.
 */
function changePriorityEdit(prio) {
  currentPriority = prio;
  resetPrioButtonsEdit();
  if (currentPriority == "low") {
    prioLowEdit();
  }
  if (currentPriority == "medium") {
    prioMediumEdit();
  }
  if (currentPriority == "urgent") {
    prioUrgentEdit();
  }
}

/**
 * Resets the styling of the priority buttons and images
 * in the edit task modal to their default state.
 */
function resetPrioButtonsEdit() {
  lowBtnEdit.classList.value = "prio-box prio-unset";
  mediumBtnEdit.classList.value = "prio-box prio-set";
  urgentBtnEdit.classList.value = "prio-box prio-unset";
  imgLowEdit.src = "./assets/img/icons/add-task/low.svg";
  imgMediumEdit.src = "./assets/img/icons/add-task/medium-white.svg";
  imgUrgentEdit.src = "./assets/img/icons/add-task/urgent.svg";
}

/**
 * Sets the priority to low for editing a task.
 * Updates styling of priority buttons and icons.
 */
function prioLowEdit() {
  lowBtnEdit.classList.value = "prio-box prio-set font-white bg-low";
  mediumBtnEdit.classList.value = "prio-box prio-unset bg-white font-black";
  urgentBtnEdit.classList.value = "prio-box prio-unset bg-white font-black";
  imgLowEdit.src = "./assets/img/icons/add-task/low-white.svg";
  imgMediumEdit.src = "./assets/img/icons/add-task/medium-orange.svg";
}

/**
 * Sets the priority to medium for editing a task.
 * Updates styling of priority buttons and icon.
 */
function prioMediumEdit() {
  lowBtnEdit.classList.value = "prio-box prio-unset bg-white font-black ";
  mediumBtnEdit.classList.value = "prio-box prio-set bg-medium font-white";
  urgentBtnEdit.classList.value = "prio-box prio-unset bg-white font-black";
  imgMediumEdit.src = "./assets/img/icons/add-task/medium-white.svg";
}

/**
 * Sets the priority to urgent for editing a task.
 * Updates styling of priority buttons and icon.
 */
function prioUrgentEdit() {
  lowBtnEdit.classList.value = "prio-box prio-unset bg-white font-black ";
  mediumBtnEdit.classList.value = "prio-box prio-unset bg-white font-black";
  urgentBtnEdit.classList.value = "prio-box prio-set bg-urgent font-white";
  imgUrgentEdit.src = "./assets/img/icons/add-task/urgent-white.svg";
  imgMediumEdit.src = "./assets/img/icons/add-task/medium-orange.svg";
}

/**
 * Filters the contacts dropdown options during editing
 * a task to show only contacts whose names match the
 * text entered in the dropdown input.
 */
function filterContactsToAssignEdit() {
  let input = document.getElementById("dropdownInput").value.toLowerCase();
  let contacts = localUserData.contacts;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const contactName = contact.userData.name.toLowerCase();
    const option = document.getElementById(`edit-single-contact${i}`);
    if (contactName.includes(input)) {
      option.classList.remove("d-none");
    } else {
      option.classList.add("d-none");
    }
  }
}

/**
 * Displays the contacts in the dropdown for assigning a task during editing.
 * Populates the dropdown with the names of all contacts in the localUserData.
 */
function showContactsToAssignEdit() {
  let content = document.getElementById("labels");
  content.innerHTML = "";
  for (let i = 0; i < localUserData["contacts"].length; i++) {
    const element = localUserData["contacts"][i];
    content.innerHTML += showContactsToEditHTML(i, element);
  }
}

/**
 * Gets the assigned contacts based on checked checkboxes,
 * adds names to newAssignedContacts array.
 * Calls showInitialsOfAssigned().
 */
function getAssignedContactsEdit() {
  newAssignedContacts = [];
  let options = document.getElementsByClassName("edit-single-contact");
  for (let i = 0; i < options.length; i++) {
    const checkbox = options[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      let option = options[i].querySelector("label");
      let name = option.textContent.trim();
      newAssignedContacts.push(name);
    }
  }
  showInitialsOfAssigned();
}

/**
 * Updates the checked state of the contact checkboxes in the edit task modal
 * to match the contacts assigned to the task.
 */
function updateSelectedContacts() {
  const singleContacts = document.getElementsByClassName("edit-single-contact");
  for (let i = 0; i < singleContacts.length; i++) {
    const checkbox = singleContacts[i].querySelector("input[type='checkbox']");
    const contactName = checkbox.value;
    if (newAssignedContacts.includes(contactName)) {
      checkbox.checked = true;
      changeCheckboxColorEdit(i);
    }
  }
}

/**
 * Toggles the "checked-assigned-to" class on the contact container
 * based on whether the contact checkbox is checked.
 *
 * @param {number} i - The index of the contact in the contacts array
 */
function changeCheckboxColorEdit(i) {
  let checkbox = document.getElementById(`edit-option${i}`);
  let input = document.getElementById(`dropdownInput`);
  let container = document.getElementById(`edit-single-contact${i}`);
  if (checkbox.checked) {
    container.classList.add("checked-assigned-to");
  } else {
    container.classList.remove("checked-assigned-to");
  }
  input.value = "";
  filterContactsToAssignEdit();
}

function createSubtaskInEdit() {
  let input = document.getElementById("input-of-subtask-in-edit");
  if (input.value.trim() == "") {
    return;
  } else {
    newSubtasks.unshift({ name: input.value, done: false });
    showCreatedSubtask();
    input.value = "";
  }
}

/**
 * Iterates through the subtasks array of the provided task
 * and adds the subtask name to the subtasksContainer innerHTML.
 * Also pushes each subtask name to the newSubtasks array.
 */
function showSubtasksToEdit(task) {
  let subtasksContainer = document.getElementById("show-subtasks-container");
  for (let index = 0; index < task.subtasks.length; index++) {
    const subtask = task.subtasks[index];
    let listItemId = `subtask-${index}`;
    subtasksContainer.innerHTML += showSubtasksToEditHTML(
      listItemId,
      subtask,
      index
    );
    newSubtasks.push(subtask);
  }
}

/**
 * Gets the contacts that were checked in the edit assigned contacts UI.
 * Iterates through the edit assigned contacts UI elements, checks if the
 * checkbox is checked, and if so pushes the contact name to the
 * newAssignedContacts array.
 */
function getEditedAssignedContacts() {
  newAssignedContacts = [];
  let options = document.getElementsByClassName("edit-single-contact");
  for (let i = 0; i < options.length; i++) {
    const checkbox = options[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      let option = options[i].querySelector("label");
      let name = option.textContent.trim();
      newAssignedContacts.push(name);
    }
  }
}

/**
 * Saves the edited title, description, due date, and assigned contacts.
 * Gets the updated values from the DOM and saves them to the appropriate variables.
 */
function saveEditedInputs() {
  getTitle();
  getDescription();
  getDueDate();
  getEditedAssignedContacts();
}

/**
 * Saves the edited task details to a new task object, shows a confirmation
 * message, adds the new task to the tasks array, resets the task ID counter.
 */
function saveEditedTask() {
  let subtasksArray = [];
  newSubtasks.forEach((subtask) => {
    subtasksArray.push(subtask);
  });
  actualCard.title = newTitle;
  actualCard.description = newDescription;
  actualCard.dueDate = newDueDate;
  actualCard.priority = currentPriority;
  actualCard.assignedTo = newAssignedContacts;
  actualCard.subtasks = subtasksArray;
}

function exchangeTaskInArray() {
  for (let i = 0; i < localUserData.users.length; i++) {
    const user = localUserData.users[i];
    for (let j = 0; j < user.tasks.length; j++) {
      let element = user.tasks[j];
      if (element.id == actualCard.id) {
        user.tasks.splice(j, 1, actualCard);
        break;
      }
    }
  }
  actualCard;
  saveUserData();
  updateHTML();
}

/**
 * Saves edited task inputs, creates new edited task, clears form, and resets globals.
 * Called when user clicks ok button after editing a task.
 */
function exchangeEditedTask() {
  saveEditedInputs();
  saveEditedTask();
  exchangeTaskInArray();
  clearForm();
  resetGlobal();
  closeOverlays();
  updateHTML();
  backDropOff();
}
