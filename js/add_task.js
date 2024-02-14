let currentPriority;
let subtasks = [];

function setPriority(prio) {
  currentPriority = prio;
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
  for (let i = 0; i < startData.length; i++) {
    const element = startData[i];
    content.innerHTML += `
      <div class="single-contact">
        <label for="option${i}" class="label-layout">
          <input
            type="checkbox"
            class="custom-checkbox"
            id="option${i}"
            value="${element}"
          />
          ${element["name"]}
        </label>
        <br />
        ${createContactInitials(element)}
      </div>`;
  }
}

function createContactInitials(element) {
  const initials = element.name
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
