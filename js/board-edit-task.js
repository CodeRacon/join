let lowBtnEdit = document.getElementById("low-btn-edit");
let mediumBtnEdit = document.getElementById("medium-btn-edit");
let urgentBtnEdit = document.getElementById("urgent-btn-edit");

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
                        id="urgent-btn-edit"
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
                        id="medium-btn-edit"
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
                        id="low-btn-edit"
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
                        onkeyup="filterContactsToAssignEdit(), onlyOpenDropDownToAssign()"
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
        newAssignedContacts = task.assignedTo;
        showSubtasksToEdit(task);
        showContactsToAssignEdit();
        showInitialsOfAssigned();
        updateSelectedContacts();
        getSelectedPriotityEdit(task);
      }
    }
  }
  newAssignedContacts = [];
}

function getSelectedPriotityEdit(task) {
  let card = actualCard;
  let cardPrio = card.tasks;
  let selectedPrio = task.priority;
  if (selectedPrio === 1) {
    currentPriority = "low";
    prioLowEdit();
  }
  if (selectedPrio === 2) {
    currentPriority = "medium";
    prioMediumEdit();
  }
  if (selectedPrio === 3) {
    currentPriority = "high";
    prioUrgentEdit();
  }
}

// let imgLow = document.getElementById("img-low");
// let imgMedium = document.getElementById("img-medium");
// let imgUrgent = document.getElementById("img-urgent");
// Edit;

function resetPrioButtons() {
  lowBtnEdit.classList.remove("bg-low", "bg-white", "font-black", "font-white");
  mediumBtnEdit.classList.remove("bg-medium", "bg-white", "font-black");
  urgentBtnEdit.classList.remove(
    "bg-urgent",
    "bg-white",
    "font-black",
    "font-white"
  );
  imgLow.src = "./assets/img/icons/add-task/low.svg";
  imgMedium.src = "./assets/img/icons/add-task/medium-white.svg";
  imgUrgent.src = "./assets/img/icons/add-task/urgent.svg";
}

function prioLowEdit() {
  lowBtnEdit.classList.add("bg-low", "font-white");
  mediumBtnEdit.classList.add("bg-white", "font-black");
  urgentBtnEdit.classList.add("bg-white", "font-black");
  imgLow.src = "./assets/img/icons/add-task/low-white.svg";
  imgMedium.src = "./assets/img/icons/add-task/medium-orange.svg";
}

function prioMediumEdit() {
  lowBtnEdit.classList.add("bg-white", "font-black");
  mediumBtnEdit.classList.add("bg-medium", "font-white");
  urgentBtnEdit.classList.add("bg-white", "font-black");
  imgMedium.src = "./assets/img/icons/add-task/medium-white.svg";
}

function prioUrgentEdit() {
  lowBtnEdit.classList.add("bg-white", "font-black");
  mediumBtnEdit.classList.add("bg-white", "font-black");
  urgentBtnEdit.classList.add("bg-urgent", "font-white");
  imgUrgent.src = "./assets/img/icons/add-task/urgent-white.svg";
  imgMedium.src = "./assets/img/icons/add-task/medium-orange.svg";
}

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

function changeCheckboxColorEdit(i) {
  let checkbox = document.getElementById(`edit-option${i}`);
  let container = document.getElementById(`edit-single-contact${i}`);

  if (checkbox.checked) {
    container.classList.add("checked-assigned-to");
  } else {
    container.classList.remove("checked-assigned-to");
  }
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
