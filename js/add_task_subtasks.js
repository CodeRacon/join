function showSubtaskInput() {
  const subtasksInput = document.getElementById("input-of-subtask");
  const subtasksContainer = subtasksInput.closest(".subtasks");

  subtasksContainer.classList.add("active");
  subtasksInput.focus();
}

function hideSubtaskInput() {
  const subtasksInput = document.getElementById("input-of-subtask");
  const subtasksContainer = subtasksInput.closest(".subtasks");

  subtasksContainer.classList.remove("active");
}

function clearSubtaskInput() {
  const subtasksInput = document.getElementById("input-of-subtask");
  subtasksInput.value = "";
  hideSubtaskInput();
}

document.addEventListener("click", function (event) {
  const subtasksContainer = document.querySelector(".subtasks");
  const targetElement = event.target;

  if (
    !subtasksContainer.contains(targetElement) &&
    subtasksContainer.classList.contains("active")
  ) {
    hideSubtaskInput();
    clearSubtaskInput();
  }
});

/**
 * Creates a new subtask by adding the input value to the newSubtasks array,
 * updating the UI to show the new subtask, and clearing the input field.
 */
function createSubtask() {
  let input = document.getElementById("input-of-subtask");
  if (input.value.trim() == "") {
    return;
  } else {
    newSubtasks.unshift({ name: input.value, done: false });
    showCreatedSubtask();
    input.value = "";
  }
  hideSubtaskInput();
}

/**
 * Updates the UI to display the newly created subtask
 * by looping through the newSubtasks array, creating a list item
 * for each one with the subtask text, and appending the list items
 * to the subtasks container element.
 */
function showCreatedSubtask() {
  let content = document.getElementById("show-subtasks-container");
  content.innerHTML = "";
  for (let i = 0; i < newSubtasks.length; i++) {
    const element = newSubtasks[i].name;
    let listItemId = `subtask-${i}`;
    content.innerHTML += showCreatedSubtaskHTML(listItemId, element, i);
  }
}

/**
 * Allows user to edit an existing subtask.
 * Finds the input field for the subtask at the provided index,
 * makes it editable, updates the edit button to save changes,
 * and updates the button's onclick handler to call changeSubtaskInArray()
 * to update the subtask text.
 */
function correctSubtask(index) {
  let inputField = document
    .getElementById(`subtask-${index}`)
    .querySelector("input");
  let editImg = document.getElementById(`edit-button${index}`);
  editImg.src = "assets/img/icons/add-task/done.svg";
  editImg.alt = "done";
  editImg.setAttribute("onclick", `changeSubtaskInArray(${index})`);
  inputField.removeAttribute("readonly");

  const subtaskListItem = document.getElementById(`subtask-${index}`);
  subtaskListItem.classList.add("subtask-edit-mode");
}

/**
 * Updates the subtasks array and UI when the user edits a subtask.
 * Removes the existing subtask at the provided index using deleteSubtask().
 * Gets the updated subtask text from the input field.
 * Adds the updated subtask text to the start of the array using unshift().
 * Updates the UI display of the subtasks using showCreatedSubtask().
 */
function changeSubtaskInArray(index) {
  const subtaskListItem = document.getElementById(`subtask-${index}`);
  subtaskListItem.classList.remove("subtask-edit-mode");
  let inputField = document
    .getElementById(`subtask-${index}`)
    .querySelector("input");
  let updatedSubtask = {
    name: inputField.value,
    done: newSubtasks[index].done,
  };
  newSubtasks.splice(index, 1);
  newSubtasks.splice(index, 0, updatedSubtask);
  showCreatedSubtask();
}

/**
 * Removes the subtask at the provided index from the newSubtasks array.
 * Updates the UI display of the subtasks using showCreatedSubtask().
 */
function deleteSubtask(index) {
  newSubtasks.splice(index, 1);
  showCreatedSubtask();
}
