let newTitle;
let newDescription;
let newAssignedContacts = [];
let newDueDate;
let currentPriority = 2;
let newCategory;
let newSubtasks = [];
let maxId = 0;

let newTask = [];

let lowBtn = document.getElementById("low-btn");
let mediumBtn = document.getElementById("medium-btn");
let urgentBtn = document.getElementById("urgent-btn");

let imgLow = document.getElementById("img-low");
let imgMedium = document.getElementById("img-medium");
let imgUrgent = document.getElementById("img-urgent");

async function renderPage() {
  initPage();
  await loadUserData();
  showContactsToAssign();
}

function setPriority(prio) {
  currentPriority = prio;
  resetPrioButtons();
  if (currentPriority == "low") {
    prioLow();
  }
  if (currentPriority == "medium") {
    prioMedium();
  }
  if (currentPriority == "urgent") {
    prioUrgent();
  }
}

function resetPrioButtons() {
  lowBtn.classList.remove("bg-low", "bg-white", "font-black", "font-white");
  mediumBtn.classList.remove("bg-medium", "bg-white", "font-black");
  urgentBtn.classList.remove(
    "bg-urgent",
    "bg-white",
    "font-black",
    "font-white"
  );
  imgLow.src = "./assets/img/icons/add-task/low.svg";
  imgMedium.src = "./assets/img/icons/add-task/medium-white.svg";
  imgUrgent.src = "./assets/img/icons/add-task/urgent.svg";
}

function prioLow() {
  lowBtn.classList.add("bg-low", "font-white");
  mediumBtn.classList.add("bg-white", "font-black");
  urgentBtn.classList.add("bg-white", "font-black");
  imgLow.src = "./assets/img/icons/add-task/low-white.svg";
  imgMedium.src = "./assets/img/icons/add-task/medium-orange.svg";
}

function prioMedium() {
  lowBtn.classList.add("bg-white", "font-black");
  mediumBtn.classList.add("bg-medium", "font-white");
  urgentBtn.classList.add("bg-white", "font-black");
  imgMedium.src = "./assets/img/icons/add-task/medium-white.svg";
}

function prioUrgent() {
  lowBtn.classList.add("bg-white", "font-black");
  mediumBtn.classList.add("bg-white", "font-black");
  urgentBtn.classList.add("bg-urgent", "font-white");
  imgUrgent.src = "./assets/img/icons/add-task/urgent-white.svg";
  imgMedium.src = "./assets/img/icons/add-task/medium-orange.svg";
}

function openAndCloseDropDownToAssign() {
  const dropdownContent = document.getElementById("dropdownContent");
  const img = document.getElementById("arrowImg");

  if (dropdownContent.style.display !== "block") {
    dropdownContent.style.display = "block";
    img.style.transform = "rotate(180deg)";
  } else {
    dropdownContent.style.display = "none";
    img.style.transform = "rotate(0deg)";
  }
}

function onlyOpenDropDownToAssign() {
  const dropdownContent = document.getElementById("dropdownContent");
  const img = document.getElementById("arrowImg");

  if (dropdownContent.style.display !== "block") {
    dropdownContent.style.display = "block";
    img.style.transform = "rotate(180deg)";
  } else {
    return;
  }
}

function onlyCloseDropDownToAssign() {
  const dropdownContent = document.getElementById("dropdownContent");
  const img = document.getElementById("arrowImg");

  if (dropdownContent.style.display !== "block") {
    return;
  } else {
    dropdownContent.style.display = "none";
    img.style.transform = "rotate(0deg)";
  }
}

function showContactsToAssign() {
  let content = document.getElementById("labels");
  content.innerHTML = "";
  for (let i = 0; i < localUserData["contacts"].length; i++) {
    const element = localUserData["contacts"][i];
    content.innerHTML += `
      <div id="single-contact${i}" class="single-contact" onclick="getAssignedContacts()">
        <label for="option${i}" class="label-layout">
          <input
            type="checkbox"
            class="custom-checkbox"
            id="option${i}"
            value="${element}"
            onchange="changeCheckboxColor(${i})"
          />
          ${element["userData"]["name"]}
        </label>
        <br />
        ${createContactInitials(element)}
      </div>`;
  }
}

function filterContactsToAssign() {
  let input = document.getElementById("dropdownInput").value.toLowerCase();
  let content = document.getElementById("dropdownContent");
  content.innerHTML = "";
  let contacts = localUserData.contacts;
  let matchedContacts = contacts.filter((contact) => {
    return contact.userData.name.toLowerCase().includes(input);
  });
  for (let i = 0; i < matchedContacts.length; i++) {
    const element = matchedContacts[i];
    content.innerHTML += `
      <div id="single-contact${i}" class="single-contact" onclick="getAssignedContacts()">
        <label for="option${i}" class="label-layout">
          <input
            type="checkbox"
            class="custom-checkbox"
            id="option${i}"
            value="${element}"
            onchange="changeCheckboxColor(${i})"
          />
          ${element["userData"]["name"]}
        </label>
        <br />
        ${createContactInitials(element)}
      </div>`;
  }
  if (input == "") {
    content.innerHTML = '<div id="labels"></div>';
    showContactsToAssign();
  }
  if (matchedContacts == 0) {
    return;
  }
}

function changeCheckboxColor(i) {
  let checkbox = document.getElementById(`option${i}`);
  let container = document.getElementById(`single-contact${i}`);

  if (checkbox.checked) {
    container.classList.add("checked-assigned-to");
  } else {
    container.classList.remove("checked-assigned-to");
  }
}

function createContactInitials(element) {
  const initials = element.userData.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return `
      <div 
      class="initialsCyrcle"
          style="background-color: ${element.color}">
          ${initials}
    </div>
    `;
}

function createSubtask() {
  let input = document.getElementById("input-of-subtask");
  newSubtasks.unshift(input.value);
  showCreatedSubtask();
  input.value = "";
}

function showCreatedSubtask() {
  let content = document.getElementById("show-subtasks-container");
  content.innerHTML = "";
  for (let i = 0; i < newSubtasks.length; i++) {
    const element = newSubtasks[i];
    let listItemId = `subtask-${i}`;
    content.innerHTML += `
      <div class="subtask-list-container">
        <li id="${listItemId}"><input readonly type="text" value="${element}"></li>
         
            <div class="edit-delete-container">
              <img id="edit-button${i}" onclick="correctSubtask(${i})" src="assets/img/icons/add-task/edit.svg" alt="edit">
              <img onclick="deleteSubtask(${i})" src="assets/img/icons/add-task/delete.svg" alt="delete">
            </div>
        
      </div>
    `;
  }
}

function correctSubtask(index) {
  let inputField = document
    .getElementById(`subtask-${index}`)
    .querySelector("input");
  inputField.removeAttribute("readonly");

  let editImg = document.getElementById(`edit-button${index}`);
  editImg.src = "assets/img/icons/add-task/done.svg";
  editImg.alt = "done";
  editImg.setAttribute("onclick", `changeSubtaskInArray(${index})`);
}

function changeSubtaskInArray(index) {
  let inputField = document
    .getElementById(`subtask-${index}`)
    .querySelector("input");
  deleteSubtask(index);
  newSubtasks.unshift(inputField.value);
  showCreatedSubtask();
}

function changeSubtaskInArray(index) {
  let inputField = document
    .getElementById(`subtask-${index}`)
    .querySelector("input");
  let newInputValue = inputField.value;
  newSubtasks.splice(index, 1);
  newSubtasks.splice(index, 0, newInputValue);
  showCreatedSubtask();
}

function deleteSubtask(index) {
  newSubtasks.splice(index, 1);
  showCreatedSubtask();
}

function getDueDate() {
  let dueDateValue = document.getElementById("due-date-value").value;
  newDueDate = dueDateValue;
}

function getTitle() {
  let titleValue = document.getElementById("title-value").value;
  newTitle = titleValue;
}

function getDescription() {
  let descriptionValue = document.getElementById("description").value;
  newDescription = descriptionValue;
}

function getCategory() {
  let categorySelected = document.getElementById("category");
  if (categorySelected.value === "user-story") {
    newCategory = 1;
  } else {
    newCategory = 2;
  }
}

function getAssignedContacts() {
  newAssignedContacts = [];
  let options = document.getElementsByClassName("single-contact");
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

function showInitialsOfAssigned() {
  let content = document.getElementById("initialsOfAssigned");
  content.innerHTML = "";
  for (let i = 0; i < newAssignedContacts.length; i++) {
    const assignedContact = newAssignedContacts[i];
    const initials = assignedContact
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    let user = localUserData.contacts.find(
      (user) => user.userData.name === assignedContact
    );
    if (user) {
      let color = user.color;
      content.innerHTML += `
        <div 
        class="initialsCyrcle"
            style="background-color: ${color}">
            ${initials}
      </div>
      `;
    }
  }
}

function clearForm() {
  resetInputs();
  resetTextarea();
  resetSelects();
  resetSubtasks();
  resetAssignedContacts();
  showContactsToAssign();
  openAndCloseDropDownToAssign();
  onlyCloseDropDownToAssign();
  resetPrioButtons();
  resetGlobal();
}

function resetSubtasks() {
  let subtask = document.getElementById("show-subtasks-container");
  subtask.innerHTML = "";
}

function resetSelects() {
  let selects = document.querySelectorAll("select");
  selects.forEach(function (select) {
    select.selectedIndex = -1;
  });
}

function resetTextarea() {
  let textarea = document.getElementById("description");
  textarea.value = "";
}

function resetInputs() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.value = "";
  });
}

function resetAssignedContacts() {
  assignedContacts = [];
  let options = document.getElementsByClassName("single-contact");
  for (let i = 0; i < options.length; i++) {
    const checkbox = options[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      let option = options[i].querySelector("label");
      option.checked = false;
    }
  }
  showInitialsOfAssigned();
}

function resetGlobal() {
  newTitle;
  newDescription;
  newAssignedContacts = [];
  newDueDate;
  currentPriority;
  newCategory;
  newSubtasks = [];
}

function checkIfFieldsAreFilled() {
  let button = document.querySelector(".submit-btn");
  saveInputs();
  if (newTitle && newDueDate && newCategory !== "") {
    saveNewTask();
    button.removeAttribute("disabled");
  } else {
    return; // hier muss statt return dieses rote Feld auftauchen, in dem steht, was genau ausgefüllt werden muss
  }
}

function saveInputs() {
  getTitle();
  getDescription();
  getCategory();
  getDueDate();
}

function saveNewTask() {
  let subtasksArray = [];
  newSubtasks.forEach((subtask) => {
    subtasksArray.push({ name: subtask, done: false });
  });
  newTask = {
    assignedTo: newAssignedContacts,
    category: newCategory,
    description: newDescription,
    dueDate: newDueDate,
    id: maxId,
    priority: currentPriority,
    status: "toDo",
    subtasks: subtasksArray,
    title: newTitle,
  };
  showConfirmation();
  clearForm();
}

function generateNewIdForTask() {
  for (let i = 0; i < localUserData.users.length; i++) {
    const user = localUserData.users[i];
    for (let j = 0; j < user.tasks.length; j++) {
      const task = user.tasks[j];
      if (task.id > maxId) {
        maxId = task.id;
      }
    }
  }
}

function showConfirmation() {
  let overlay = document.getElementById("add-task-overlay-task-created");
  overlay.classList.remove("box-slide-out", "d-none");
  overlay.classList.add("box-slide-in");
  setTimeout(() => {
    overlay.classList.remove("box-slide-in");
    setTimeout(() => {
      overlay.classList.add("box-slide-out", "d-none");
    }, 3000);
  }, 0);
}
