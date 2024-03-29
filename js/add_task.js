let newTitle;
let newDescription;
let newAssignedContacts = [];
let newDueDate;
let currentPriority = 2;
let newCategory;
let newSubtasks = [];
let newStatus;
let maxId = 0;

let newTask = [];

let lowBtn = document.getElementById('low-btn');
let mediumBtn = document.getElementById('medium-btn');
let urgentBtn = document.getElementById('urgent-btn');

let imgLow = document.getElementById('img-low');
let imgMedium = document.getElementById('img-medium');
let imgUrgent = document.getElementById('img-urgent');

/**
 * Renders the page by initializing it, loading user data, and showing contacts to assign.
 * This is an async function that handles the overall page rendering flow.
 */
async function renderPage() {
	initPage();
	await loadUserData();
	showContactsToAssign();
	clearForm();
}

/**
 * Sets the task priority level and updates the UI accordingly.
 *
 * @param {string} prio - The priority level - "low", "medium" or "urgent".
 */
function setPriority(prio) {
	currentPriority = prio;
	resetPrioButtons();
	if (currentPriority == 'low') {
		prioLow();
	}
	if (currentPriority == 'medium') {
		prioMedium();
	}
	if (currentPriority == 'urgent') {
		prioUrgent();
	}
}

/**
 * Resets the styling of the priority buttons to their default state.
 * Removes any priority-related styling classes and resets the button icons.
 */
function resetPrioButtons() {
	lowBtn.classList.value = 'prio-box prio-unset';
	mediumBtn.classList.value = 'prio-box prio-set';
	urgentBtn.classList.value = 'prio-box prio-unset';

	imgLow.src = './assets/img/icons/add-task/low.svg';
	imgMedium.src = './assets/img/icons/add-task/medium-white.svg';
	imgUrgent.src = './assets/img/icons/add-task/urgent.svg';
}

/**
 * Updates the UI styling to indicate low priority:
 * - Adds low priority styling to the low priority button.
 * - Adds default styling to the medium and urgent buttons.
 * - Changes the button icons to match the priority.
 */
function prioLow() {
	lowBtn.classList.value = 'prio-box prio-set font-white bg-low';
	mediumBtn.classList.value = 'prio-box prio-unset bg-white font-black';
	urgentBtn.classList.value = 'prio-box prio-unset bg-white font-black';

	imgLow.src = './assets/img/icons/add-task/low-white.svg';
	imgMedium.src = './assets/img/icons/add-task/medium-orange.svg';
}

/**
 * Updates the UI styling to indicate medium priority:
 * - Adds medium priority styling to the medium priority button.
 * - Adds default styling to the low and urgent buttons.
 * - Changes the medium priority button icon to match the priority.
 */
function prioMedium() {
	lowBtn.classList.value = 'prio-box prio-unset bg-white font-black ';
	mediumBtn.classList.value = 'prio-box prio-set bg-medium font-white';
	urgentBtn.classList.value = 'prio-box prio-unset bg-white font-black';

	imgMedium.src = './assets/img/icons/add-task/medium-white.svg';
}

/**
 * Updates the UI styling to indicate urgent priority:
 * - Adds urgent priority styling to the urgent priority button.
 * - Adds default styling to the low and medium priority buttons.
 * - Changes the urgent priority button icon to match the priority.
 */
function prioUrgent() {
	lowBtn.classList.value = 'prio-box prio-unset bg-white font-black ';
	mediumBtn.classList.value = 'prio-box prio-unset bg-white font-black';
	urgentBtn.classList.value = 'prio-box prio-set bg-urgent font-white';

	imgUrgent.src = './assets/img/icons/add-task/urgent-white.svg';
	imgMedium.src = './assets/img/icons/add-task/medium-orange.svg';
}

/**
 * Toggles opening and closing the dropdown content element
 * by changing its display style and rotating the arrow image.
 */
function openAndCloseDropDownToAssign() {
	const dropdownContent = document.getElementById('dropdownContent');
	const assignedTo = document.getElementById('assigned-to');
	const img = document.getElementById('arrowImg');
	if (dropdownContent.style.display !== 'block') {
		dropdownContent.style.display = 'block';
		dropdownContent.classList.add('onfocus');
		assignedTo.classList.add('onfocus');
		img.style.transform = 'rotate(180deg)';
	} else {
		dropdownContent.style.display = 'none';
		dropdownContent.classList.remove('onfocus');
		assignedTo.classList.remove('onfocus');
		img.style.transform = 'rotate(0deg)';
	}
}

/**
 * Opens the dropdown content element
 * by changing its display style and adjusting the arrow image.
 * Only performs this action if dropdown is currently closed.
 */
function onlyOpenDropDownToAssign() {
	const dropdownContent = document.getElementById('dropdownContent');
	const img = document.getElementById('arrowImg');
	const assignedTo = document.getElementById('assigned-to');

	if (dropdownContent.style.display !== 'block') {
		dropdownContent.style.display = 'block';
		dropdownContent.classList.add('onfocus');
		assignedTo.classList.add('onfocus');

		img.style.transform = 'rotate(180deg)';
	} else {
		return;
	}
}

/**
 * Closes the dropdown content element
 * by changing its display style to 'none'
 * and rotating the arrow image back to default state.
 * Only performs this action if dropdown is currently open.
 */
function onlyCloseDropDownToAssign() {
	const dropdownContent = document.getElementById('dropdownContent');
	const img = document.getElementById('arrowImg');
	const assignedTo = document.getElementById('assigned-to');

	if (dropdownContent.style.display !== 'block') {
		return;
	} else {
		dropdownContent.style.display = 'none';
		dropdownContent.classList.remove('onfocus');
		assignedTo.classList.remove('onfocus');
		img.style.transform = 'rotate(0deg)';
	}
}

/**
 * Displays a list of available contacts as checkboxes
 * by populating the 'labels' element with a checkbox input
 * for each contact in the 'contacts' array in localUserData.
 * Adds click handler to get assigned contacts when checkbox is clicked.
 */
function showContactsToAssign() {
	let content = document.getElementById('labels');
	content.innerHTML = '';
	for (let i = 0; i < localUserData['contacts'].length; i++) {
		const element = localUserData['contacts'][i];
		content.innerHTML += /*html*/ `
      <div id="single-contact${i}" class="single-contact" onclick="getAssignedContacts()">
        <label for="option${i}" class="label-layout">
          <input
            type="checkbox"
            class="custom-checkbox"
            id="option${i}"
            value="${element['userData']['name']}"
            onchange="changeCheckboxColor(${i})"
          />
          ${element['userData']['name']}
        </label>
        <br />
        ${createContactInitials(element)}
      </div>
		`;
	}
}

/**
 * Filters the contacts to show in the dropdown menu based on the input text.
 * Matches contacts whose name includes the input text (case insensitive).
 * Shows the matched contacts by generating HTML for each one.
 * If no input, shows all contacts.
 * If no matches, shows nothing.
 */
function filterContactsToAssign() {
	let input = document.getElementById('dropdownInput').value.toLowerCase();
	let content = document.getElementById('dropdownContent');
	content.innerHTML = '';
	let contacts = localUserData.contacts;
	let matchedContacts = contacts.filter((contact) => {
		return contact.userData.name.toLowerCase().includes(input);
	});
	for (let i = 0; i < matchedContacts.length; i++) {
		const element = matchedContacts[i];
		content.innerHTML += /*html*/ `
      <div id="single-contact${i}" class="single-contact" onclick="getAssignedContacts()">
        <label for="option${i}" class="label-layout">
          <input
            type="checkbox"
            class="custom-checkbox"
            id="option${i}"
            value="${element['userData']['name']}"
            onchange="changeCheckboxColor(${i})"
          />
          ${element['userData']['name']}
        </label>
        <br />
        ${createContactInitials(element)}
      </div>
		`;
	}
	if (input == '') {
		content.innerHTML = /*html*/ `
			<div id="labels"></div>
		`;
		showContactsToAssign();
	}
	if (matchedContacts == 0) {
		return;
	}
}

/**
 * Toggles the 'checked-assigned-to' class on the contact container
 * when the contact checkbox is checked/unchecked. This highlights
 * the contact visually when it is assigned to the task.
 */
function changeCheckboxColor(i) {
	let checkbox = document.getElementById(`option${i}`);
	let container = document.getElementById(`single-contact${i}`);

	if (checkbox.checked) {
		container.classList.add('checked-assigned-to');
	} else {
		container.classList.remove('checked-assigned-to');
	}
}

/**
 * Creates a string of initials from the given contact's name,
 * and returns HTML markup for displaying the initials in a colored circle.
 *
 * @param {Object} element - The contact object
 * @returns {string} The HTML markup for the initials circle
 */
function createContactInitials(element) {
	const initials = element.userData.name
		.split(' ')
		.map((word) => word.charAt(0))
		.join('');

	return `
      <div 
      class="initialsCyrcle"
          style="background-color: ${element.color}">
          ${initials}
    </div>
    `;
}

function selectOrClearCategory() {
	let input = document.getElementById('category');
	const img = document.getElementById('arrowImgCategory');
	if (input.value == '') {
		openAndCloseDropDownCategory();
	} else {
		input.value = '';
		openAndCloseDropDownCategory();
	}
}

function openAndCloseDropDownCategory() {
	let dropdown = document.getElementById('dropdownContentCategory');
	let container = document.getElementById('category-div');
	const img = document.getElementById('arrowImgCategory');
	if (dropdown.style.display !== 'block') {
		dropdown.style.display = 'block';
		dropdown.classList.add('onfocus');
		container.classList.add('onfocus');
		img.style.transform = 'rotate(180deg)';
	} else {
		dropdown.style.display = 'none';
		dropdown.classList.remove('onfocus');
		container.classList.remove('onfocus');
		img.style.transform = 'rotate(0deg)';
	}
}
function selectCategory(category) {
	let dropdown = document.getElementById('dropdownContentCategory');
	let input = document.getElementById('category');
	const img = document.getElementById('arrowImgCategory');
	let container = document.getElementById('category-div');
	if (category == 'user-story') {
		input.value = 'User Story';
		dropdown.style.display = 'none';
	} else {
		input.value = 'Technical Task';
		dropdown.style.display = 'none';
	}

	container.classList.remove('onfocus');
	img.style.transform = 'rotate(0deg)';
}

function showSubtaskInput() {
	const subtasksInput = document.getElementById('input-of-subtask');
	const subtasksContainer = subtasksInput.closest('.subtasks');

	subtasksContainer.classList.add('active');
	subtasksInput.focus();
}

function hideSubtaskInput() {
	const subtasksInput = document.getElementById('input-of-subtask');
	const subtasksContainer = subtasksInput.closest('.subtasks');

	subtasksContainer.classList.remove('active');
}

function clearSubtaskInput() {
	const subtasksInput = document.getElementById('input-of-subtask');
	subtasksInput.value = '';
	hideSubtaskInput();
}

document.addEventListener('click', function (event) {
	const subtasksContainer = document.querySelector('.subtasks');
	const targetElement = event.target;

	if (
		!subtasksContainer.contains(targetElement) &&
		subtasksContainer.classList.contains('active')
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
	let input = document.getElementById('input-of-subtask');
	if (input.value == '') {
		return;
	} else {
		newSubtasks.unshift({ name: input.value, done: false });
		showCreatedSubtask();
		input.value = '';
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
	let content = document.getElementById('show-subtasks-container');
	content.innerHTML = '';
	for (let i = 0; i < newSubtasks.length; i++) {
		const element = newSubtasks[i].name;
		let listItemId = `subtask-${i}`;
		content.innerHTML += /*html*/ `
			
      <div class="subtask-list-container">
        	<li class="subtask-list-item" id="${listItemId}"><input readonly type="text" value="${element}"></li>
            <div class="edit-delete-container">
              <img id="edit-button${i}" onclick="correctSubtask(${i})" src="assets/img/icons/add-task/edit.svg" alt="edit">
              <img src="assets/img/icons/add-task/edit-btn-spacer.svg" alt="spacer">
			  <img onclick="deleteSubtask(${i})" src="assets/img/icons/add-task/delete.svg" alt="delete">
            </div>
      </div>
    `;
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
		.querySelector('input');
	let editImg = document.getElementById(`edit-button${index}`);
	editImg.src = 'assets/img/icons/add-task/done.svg';
	editImg.alt = 'done';
	editImg.setAttribute('onclick', `changeSubtaskInArray(${index})`);
	inputField.removeAttribute('readonly');

	const subtaskListItem = document.getElementById(`subtask-${index}`);
	subtaskListItem.classList.add('subtask-edit-mode');
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
	subtaskListItem.classList.remove('subtask-edit-mode');
	let inputField = document
		.getElementById(`subtask-${index}`)
		.querySelector('input');
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

/**
 * Gets the due date value entered by the user from the due date input field.
 * Stores the extracted due date value in the newDueDate variable.
 */
function getDueDate() {
	let dueDateValue = document.getElementById('due-date-value').value;
	newDueDate = dueDateValue;
}

/**
 * Gets the task title value entered by the user from the title input field.
 * Stores the extracted title value in the newTitle variable.
 */
function getTitle() {
	let titleValue = document.getElementById('title-value').value;
	newTitle = titleValue;
}

/**
 * Gets the task description value entered by the user from the description textarea.
 * Stores the extracted description value in the newDescription variable.
 */
function getDescription() {
	let descriptionValue = document.getElementById('description').value;
	newDescription = descriptionValue;
}

/**
 * Gets the selected category value from the category dropdown.
 * Stores the selected category value (1 for user story, 2 for bug) in the newCategory variable.
 */
function getCategory() {
	let categorySelected = document.getElementById('category');
	if (categorySelected.value === '') {
		newCategory = '';
	}
	if (categorySelected.value === 'user-story') {
		newCategory = 1;
	}
	if (categorySelected.value === 'technical-task') {
		newCategory = 1;
	}
}

/**
 * Gets the selected contacts from the contact checkboxes
 * and stores the names in the newAssignedContacts array.
 * Calls showInitialsOfAssigned() to update display.
 */
function getAssignedContacts() {
	newAssignedContacts = [];
	let options = document.getElementsByClassName('single-contact');
	for (let i = 0; i < options.length; i++) {
		const checkbox = options[i].querySelector('input[type="checkbox"]');
		if (checkbox.checked) {
			let option = options[i].querySelector('label');
			let name = option.textContent.trim();
			newAssignedContacts.push(name);
		}
	}
	showInitialsOfAssigned();
}

/**
 * Updates the DOM to show the initials of the currently
 * assigned contacts in colored circles. Initials are
 * generated from the contact names and matched to colors
 * from the local user data.
 */
function showInitialsOfAssigned() {
	let content = document.getElementById('initialsOfAssigned');
	content.innerHTML = '';
	for (let i = 0; i < newAssignedContacts.length; i++) {
		const assignedContact = newAssignedContacts[i];
		const initials = assignedContact
			.split(' ')
			.map((word) => word.charAt(0))
			.join('');
		let user = localUserData.contacts.find(
			(user) => user.userData.name === assignedContact
		);
		if (user) {
			let color = user.color;
			content.innerHTML += /*html*/ `
        <div 
        class="initialsCyrcle"
            style="background-color: ${color}">
            ${initials}
      </div>
			`;
		}
	}
}

/**
 * Clears the form by resetting all inputs, textareas, selects,
 * subtasks, assigned contacts, dropdowns, priority buttons,
 * and global state.
 */
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

/**
 * Resets the subtasks section by clearing the HTML.
 */
function resetSubtasks() {
	let subtask = document.getElementById('show-subtasks-container');
	subtask.innerHTML = '';
}

/**
 * Resets all select elements on the page by setting
 * their selectedIndex property to -1.
 */
function resetSelects() {
	let selects = document.querySelectorAll('select');
	selects.forEach(function (select) {
		select.selectedIndex = 0;
	});
}

/**
 * Resets the textarea element with ID 'description'
 * by setting its value to an empty string.
 */
function resetTextarea() {
	let textarea = document.getElementById('description');
	textarea.value = '';
}

/**
 * Resets all input elements on the page by setting
 * their value property to an empty string.
 */
function resetInputs() {
	let inputs = document.querySelectorAll('input');
	inputs.forEach(function (input) {
		input.value = '';
	});
}

/**
 * Resets the assigned contacts by clearing any checked
 * checkboxes and removing contacts from the assignedContacts
 * array.
 */
function resetAssignedContacts() {
	assignedContacts = [];
	let options = document.getElementsByClassName('single-contact');
	for (let i = 0; i < options.length; i++) {
		const checkbox = options[i].querySelector('input[type="checkbox"]');
		if (checkbox.checked) {
			let option = options[i].querySelector('label');
			option.checked = false;
		}
	}
	showInitialsOfAssigned();
}

/**
 * Resets all global state variables to their initial values.
 */
function resetGlobal() {
	newTitle;
	newDescription;
	newAssignedContacts = [];
	newDueDate;
	currentPriority;
	newCategory;
	newSubtasks = [];
}

/**
 * Checks if the required fields for adding a new task are filled out.
 * If so, saves the new task. If not, returns without saving to
 * indicate there are missing fields.
 */
function checkIfFieldsAreFilled() {
	let button = document.querySelector('.submit-btn');
	saveInputs();
	if (newTitle && newDueDate && newCategory !== '') {
		saveNewTask();
		button.removeAttribute('disabled');
	} else {
		return; // hier muss statt return dieses rote Feld auftauchen, in dem steht, was genau ausgefüllt werden muss
	}
}

/**
 * Saves the user input values from the form fields
 * into the appropriate global variables to be used when
 * saving a new task.
 */
function saveInputs() {
	getTitle();
	getDescription();
	getCategory();
	getDueDate();
}

/**
 * Generates a new unique ID to be used for the next task that is created.
 * Iterates through all users and their tasks to find the current maximum ID,
 * and increments it by 1.
 */
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
	maxId++;
}

/**
 * Saves a newly created task object to the user's task list array.
 * Generates a subtasks array from the entered subtasks.
 * Creates a new task object with the entered info and generated ID.
 * Shows a confirmation message, clears the form fields,
 * pushes the new task to the user's task array,
 * and resets the max ID counter.
 */
function saveNewTask() {
	let subtasksArray = [];
	newSubtasks.forEach((subtask) => {
		subtasksArray.push(subtask);
	});
	newTask = {
		assignedTo: newAssignedContacts,
		category: newCategory,
		description: newDescription,
		dueDate: newDueDate,
		id: maxId,
		priority: currentPriority,
		status: 'toDo',
		subtasks: subtasksArray,
		title: newTitle,
	};
	showConfirmation();
	clearForm();
	pushTaskToArray();
	maxId = 0;
	setTimeout(function () {
		window.location.href = 'board.html';
	}, 3500);
}

/**
 * Pushes the newly created task object onto the
 * tasks array for the currently logged in user.
 * Also saves the updated user data.
 */
function pushTaskToArray() {
	let loggedInUser = localUserData.users.findIndex(
		(user) => user.isLoggedIn == true
	);
	let array = localUserData.users[loggedInUser].tasks;
	array.push(newTask);
	saveUserData();
	newTask = [];
}

/**
 * Shows a confirmation overlay indicating the task was created.
 * The overlay slides in, waits 3 seconds, and slides out.
 */
function showConfirmation() {
	let overlay = document.getElementById('add-task-overlay-task-created');
	overlay.classList.remove('box-slide-out', 'd-none');
	overlay.classList.add('box-slide-in');
	setTimeout(() => {
		overlay.classList.remove('box-slide-in');
		setTimeout(() => {
			overlay.classList.add('box-slide-out', 'd-none');
		}, 3000);
	}, 0);
}
