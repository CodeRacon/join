let newAssignedContacts = [];
let newSubtasks = [];
let newTask = [];
let newTitle;
let newDescription;
let newDueDate;
let newCategory;
let newStatus;
let currentPriority = 2;
let maxId = 0;
let lowBtn = document.getElementById('low-btn');
let mediumBtn = document.getElementById('medium-btn');
let urgentBtn = document.getElementById('urgent-btn');
let imgLow = document.getElementById('img-low');
let imgMedium = document.getElementById('img-medium');
let imgUrgent = document.getElementById('img-urgent');

/**
 * Renders the task creation page by initializing it, loading user data,
 * and showing existing contacts to assign.
 */
async function renderPage() {
	initPage();
	const userID = getLoggedInUserID();
	await loadUserData(userID);
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

function selectOrClearCategory() {
	let input = document.getElementById('category');
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
	if (
		categorySelected.value == 'user-story' ||
		categorySelected.value == 'User Story'
	) {
		newCategory = 1;
	}
	if (
		categorySelected.value == 'technical-task' ||
		categorySelected.value == 'Technical Task'
	) {
		newCategory = 2;
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
	resetAddTaskErrorFeedback();
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
 * Saves the user input values from the form fields
 * into the appropriate global variables to be used when
 * saving a new task.
 */
function saveInputs() {
	getTitle();
	getDescription();
	getCategory();
	getDueDate();
	generateNewIdForTask();
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
function saveNewTask(origin) {
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
	if (origin !== 'board') {
		setTimeout(function () {
			window.location.href = 'board.html';
		}, 3500);
	} else {
		updateHTML();
	}
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
