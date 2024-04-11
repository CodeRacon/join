/**
 * Validates the form fields for adding a new task, and if valid, saves the new task and closes the add task overlay.
 * If any fields are invalid, it prevents the default form submission, animates the hint, and returns false.
 *
 * @param {Event} event - The form submission event.
 * @param {string} origin - The origin of the add task action, either "board" or something else.
 * @returns {boolean} - False if the form is invalid, true if the form is valid.
 */
function validateAddTaskForm(event, origin) {
	const isValidTitle = validateTitle();
	const isValidDueDate = validateDueDate();
	const isValidCategory = validateCategory();

	if (isValidTitle && isValidDueDate && isValidCategory) {
		console.log('Form is valid');
		saveInputs();
		saveNewTask(origin);
		setTimeout(() => {
			closeOverlays();
		}, 0);
	} else {
		console.log('Form is not valid');
		event.preventDefault();
		animateHint();
		return false;
	}
}

/**
 * Animates a visual hint element on the page by adding and removing a CSS class that applies a shake animation.
 * This is typically used to draw the user's attention to a form field that has an invalid value.
 */
function animateHint() {
	const hint = document.getElementById('hint');
	hint.classList.add('shake');
	setTimeout(() => {
		hint.classList.remove('shake');
	}, 1000);
}

/**
 * Validates the title input field for a new task.
 *
 * @returns {boolean} - True if the title is valid, false otherwise.
 */
function validateTitle() {
	let titleInput = document.getElementById('title-value');
	let titleValue = titleInput.value.trim();
	if (titleValue.length > 40 || titleValue === '') {
		titleInput.classList.add('invalid');
		return false;
	} else {
		titleInput.classList.remove('invalid');
		return true;
	}
}

/**
 * Validates the due date input field for a new task.
 *
 * @returns {boolean} - True if the due date is valid, false otherwise.
 */
function validateDueDate() {
	let dueDateInput = document.getElementById('due-date-value');
	let dueDateValue = dueDateInput.value.trim();
	if (dueDateValue === '') {
		dueDateInput.classList.add('invalid');
		return false;
	} else {
		dueDateInput.classList.remove('invalid');
		return true;
	}
}

/**
 * Validates the category input field for a new task.
 *
 * @returns {boolean} - True if the category is valid, false otherwise.
 */
function validateCategory() {
	let categoryCont = document.getElementById('category-div');
	let dropDownCont = document.getElementById('dropdownContentCategory');
	let categoryInput = document.getElementById('category');
	let categoryValue = categoryInput.value.trim();
	if (categoryValue === '') {
		categoryCont.classList.add('invalid');
		dropDownCont.classList.add('invalid');
		return false;
	} else {
		categoryCont.classList.remove('invalid');
		dropDownCont.classList.remove('invalid');
		return true;
	}
}

/**
 * Validates the category input field for a new task.
 *
 * @returns {boolean} - True if the category is valid, false otherwise.
 */
function validateCategory() {
	let categoryCont = document.getElementById('category-div');
	let dropDownCont = document.getElementById('dropdownContentCategory');
	let categoryInput = document.getElementById('category');
	let categoryValue = categoryInput.value.trim();
	if (categoryValue === '') {
		categoryCont.classList.add('invalid');
		dropDownCont.classList.add('invalid');
		return false;
	} else {
		categoryCont.classList.remove('invalid');
		dropDownCont.classList.remove('invalid');
		return true;
	}
}

/**
 * Resets the error feedback for the add task form fields.
 * This function removes the "invalid" class from the title input, due date input, category container, and dropdown container elements.
 */
function resetAddTaskErrorFeedback() {
	let titleInput = document.getElementById('title-value');
	let dueDateInput = document.getElementById('due-date-value');
	let categoryCont = document.getElementById('category-div');
	let dropDownCont = document.getElementById('dropdownContentCategory');

	titleInput.classList.remove('invalid');
	dueDateInput.classList.remove('invalid');
	categoryCont.classList.remove('invalid');
	dropDownCont.classList.remove('invalid');
}
