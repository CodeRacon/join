let currentPriority;

let lowBtn = document.getElementById("low-btn");
let mediumBtn = document.getElementById("medium-btn");
let urgentBtn = document.getElementById("urgent-btn");

let imgLow = document.getElementById("img-low");
let imgMedium = document.getElementById("img-medium");
let imgUrgent = document.getElementById("img-urgent");

let subtasks = [];

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
  imgMedium.src = "./assets/img/icons/add-task/medium-orange.svg";
  imgUrgent.src = "./assets/img/icons/add-task/urgent.svg";
}

function prioLow() {
  lowBtn.classList.add("bg-low", "font-white");
  mediumBtn.classList.add("bg-white", "font-black");
  urgentBtn.classList.add("bg-white", "font-black");
  imgLow.src = "./assets/img/icons/add-task/low-white.svg";
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

function showContactsToAssign() {
  let content = document.getElementById("labels");
  content.innerHTML = "";
  for (let i = 0; i < startData["contacts"].length; i++) {
    const element = startData["contacts"][i];
    content.innerHTML += `
      <div id="single-contact${i}" class="single-contact">
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
  let contacts = startData.contacts;
  let matchedContacts = contacts.filter((contact) => {
    return contact.userData.name.toLowerCase().includes(input);
  });
  for (let i = 0; i < matchedContacts.length; i++) {
    const element = matchedContacts[i];
    content.innerHTML += `
      <div id="single-contact${i}" class="single-contact">
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
  subtasks.unshift(input.value);
  showCreatedSubtask();
  input.value = "";
}

function showCreatedSubtask() {
  let content = document.getElementById("show-subtasks-container");
  content.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const element = subtasks[i];
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
  subtasks.unshift(inputField.value);
  showCreatedSubtask();
}

function changeSubtaskInArray(index) {
  let inputField = document
    .getElementById(`subtask-${index}`)
    .querySelector("input");
  let newInputValue = inputField.value;
  subtasks.splice(index, 1);
  subtasks.splice(index, 0, newInputValue);
  showCreatedSubtask();
}

function deleteSubtask(index) {
  subtasks.splice(index, 1);
  showCreatedSubtask();
}
