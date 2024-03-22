let lowBtnEdit;
let mediumBtnEdit;
let urgentBtnEdit;

let imgLowEdit;
let imgMediumEdit;
let imgUrgentEdit;

let indexOfTaskBeforeEdit;

/**
 * Edits an existing task card with new details.
 *
 * It finds the task card to edit based on the provided card ID.
 * Then it populates the edit overlay with the task details.
 * It also handles updating the priority buttons, assigned contacts,
 * and subtasks for the edit view.
 *
 * @param {string} card - The ID of the task card to edit
 */
function editTask(card) {
  let taskCard = document.getElementById("overlay-task-card");
  taskCard.classList.add("d-none");
  let newOverlay = document.getElementById("overlay-edit-card");
  newOverlay.classList.remove("d-none");
  newOverlay.innerHTML = "";
  for (let i = 0; i < localUserData.users.length; i++) {
    let actualTask = localUserData.users[i];
    for (let j = 0; j < actualTask.tasks.length; j++) {
      const taskId = actualTask.tasks[j].id;
      const task = actualTask.tasks[j];
      if (taskId == card) {
        newOverlay.innerHTML = ` 
        <div class="main-cotainer single-task-card">
        <div class="scroll-bar-edit gap-05rem">

          <div class="title-cont">
              <span>Title<span class="asterisk">*</span></span>
              <input
                id="title-value"
                class="field-width-height input-borders title--input"
                name="title"
                type="text"
                value="${task.title}"
                class="field-width-height-small input-borders title"
                placeholder="Enter a title"
                required
              />
            </div>


          <!-- description-->
            <div class="description-cont">
              <span>Description</span>
              <textarea
                name="description-text"
                id="description"
                class="field-width-height-small description-height input-borders description"
                placeholder="Enter a Description"
                cols="30"
                rows="10"
              >${task.description}</textarea
              </textarea>
            </div>


          <!-- Date -->
          <div class="date-cont">
          <span>Due Date<span class="asterisk">*</span></span>
          <!-- <div class="field-width-height"> -->
          <input
            id="due-date-value"
            class="field-width-height-small input-borders due-date"
            name="date"
            type="text"
            value="${task.dueDate}"
            placeholder="yyyy/mm/dd"
            required
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
          />
        </div>

          <!--Prio-->
          <div class="prio-cont">
              <span>Prio</span>
              <div class="priority">
                <button
                  id="urgent-btn-edit"
                  class="prio-box prio-unset"
                  onclick="changePriorityEdit('urgent')"
                >
                  Urgent
                  <img
                    id="img-urgent-edit"
                    src="./assets/img/icons/add-task/urgent.svg"
                    alt="urgent symbol"
                  />
                </button>
                <button
                  id="medium-btn-edit"
                  class="prio-box prio-unset"
                  onclick="changePriorityEdit('medium')"
                >
                  Medium
                  <img
                    id="img-medium-edit"
                    src="./assets/img/icons/add-task/medium-white.svg"
                    alt="medium symbol"
                  />
                </button>
                <button
                  id="low-btn-edit"
                  class="prio-box prio-unset"
                  onclick="changePriorityEdit('low')"
                >
                  Low
                  <img
                    id="img-low-edit"
                    src="./assets/img/icons/add-task/low.svg"
                    alt="low symbol"
                  />
                </button>
              </div>
            </div>


          <!-- assign to -->
          <div class="assign-to-cont">
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
              onkeyup="filterContactsToAssignEdit(), onlyOpenDropDownToAssign()"
            />
            <img
              id="arrowImg"
              src="./assets/img/icons/add-task/arrow-down.svg"
              alt="Arrow down icon"
            />
          </div>
          <div
            class="dropdown-content dropdown-content-small btn-borders dropdown-content-style"
            id="dropdownContent"
          >
            <div id="labels"></div>
          </div>
          <div id="initialsOfAssigned"></div>
          </div>
          
          <!-- Subtasks -->
      <div class="subtask-cont">
              <span>Subtasks</span>
              <div class="field-width-height-small input-borders subtasks">
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
          </div>
          <div class="ok-btn-cont btn-span-img-ctn">
            <button class=" btn-borders btn-create"  onclick="exchangeEditedTask()">
              OK <img src="./assets/img/icons/add-task/check.svg" alt="check" />
            </button>
          </div>
        </div>
          `;
        newAssignedContacts = task.assignedTo;
        renderEditTaskCardFunctions(task);
      }
    }
  }
  newAssignedContacts = [];
}

function closeEditTaskCard() {
  let taskCard = document.getElementById("overlay-task-card");
  taskCard.classList.add("d-none");
  let editCard = document.getElementById("overlay-edit-card");
  editCard.classList.add("d-none");
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
  lowBtnEdit.classList.remove(
    "bg-low",
    "bg-white",
    "font-black",
    "font-white",
    "gap-05rem"
  );
  mediumBtnEdit.classList.remove(
    "bg-medium",
    "bg-white",
    "font-black",
    "gap-05rem"
  );
  urgentBtnEdit.classList.remove(
    "bg-urgent",
    "bg-white",
    "font-black",
    "font-white",
    "gap-05rem"
  );
  imgLowEdit.src = "./assets/img/icons/add-task/low.svg";
  imgMediumEdit.src = "./assets/img/icons/add-task/medium-white.svg";
  imgUrgentEdit.src = "./assets/img/icons/add-task/urgent.svg";
}

/**
 * Sets the priority to low for editing a task.
 * Updates styling of priority buttons and icons.
 */
function prioLowEdit() {
  lowBtnEdit.classList.add("bg-low", "font-white", "gap-05rem");
  mediumBtnEdit.classList.add("bg-white", "font-black");
  urgentBtnEdit.classList.add("bg-white", "font-black");
  imgLowEdit.src = "./assets/img/icons/add-task/low-white.svg";
  imgMediumEdit.src = "./assets/img/icons/add-task/medium-orange.svg";
}

/**
 * Sets the priority to medium for editing a task.
 * Updates styling of priority buttons and icon.
 */
function prioMediumEdit() {
  lowBtnEdit.classList.add("bg-white", "font-black");
  mediumBtnEdit.classList.add("bg-medium", "font-white");
  urgentBtnEdit.classList.add("bg-white", "font-black");
  imgMediumEdit.src = "./assets/img/icons/add-task/medium-white.svg";
}

/**
 * Sets the priority to urgent for editing a task.
 * Updates styling of priority buttons and icon.
 */
function prioUrgentEdit() {
  lowBtnEdit.classList.add("bg-white", "font-black");
  mediumBtnEdit.classList.add("bg-white", "font-black");
  urgentBtnEdit.classList.add("bg-urgent", "font-white", "gap-05rem");
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
 * Displays the user's contacts as checkboxes for assigning
 * to the task being edited. Renders the contact name and
 * initials for each contact.
 */
function showContactsToAssignEdit() {
  let content = document.getElementById("labels");
  content.innerHTML = "";
  for (let i = 0; i < localUserData["contacts"].length; i++) {
    const element = localUserData["contacts"][i];
    content.innerHTML += `
        <div id="edit-single-contact${i}" class="edit-single-contact" onclick="getAssignedContactsEdit()">
          <label for="edit-option${i}" class="label-layout">
            <input
              type="checkbox"
              class="custom-checkbox"
              id="edit-option${i}"
              value="${element["userData"]["name"]}"
              onchange="changeCheckboxColorEdit(${i})"
            />
            ${element["userData"]["name"]}
          </label>
          <br />
          ${createContactInitials(element)}
        </div>`;
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
  let container = document.getElementById(`edit-single-contact${i}`);

  if (checkbox.checked) {
    container.classList.add("checked-assigned-to");
  } else {
    container.classList.remove("checked-assigned-to");
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
    subtasksContainer.innerHTML += `
        <div class="subtask-list-container">
          <li id="${listItemId}"><input readonly type="text" value="${subtask.name}"></li>
              <div class="edit-delete-container">
                <img id="edit-button${index}" onclick="correctSubtask(${index})" src="assets/img/icons/add-task/edit.svg" alt="edit">
                <img onclick="deleteSubtask(${index})" src="assets/img/icons/add-task/delete.svg" alt="delete">
              </div>
          
        </div>
      `;
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
}

/**
 * Saves edited task inputs, creates new edited task, clears form, and resets globals.
 * Called when user clicks ok button after editing a task.
 */
function exchangeEditedTask() {
  saveEditedInputs();
  saveEditedTask();
  exchangeTaskInArray();
  // clearForm();
  //resetGlobal();
  closeEditTaskCard();
  updateHTML();
}
