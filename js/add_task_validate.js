/**
 * Validates the add task form and either saves the new task or shows validation errors.
 *
 * Checks that the title, due date and category fields are valid by calling their
 * validation functions. If all are valid, saves the inputs and new task. If any
 * field is invalid, prevents form submission and shows a validation hint.
 *
 * @param {Event} event - The form submission event
 * @param {string} origin - Where the form was triggered from
 * @returns {boolean} True if all fields are valid, false if any field is invalid
 */
function validateAddTaskForm(event, origin) {
	const isValidTitle = validateTitle();
	const isValidDueDate = validateDueDate();
	const isValidCategory = validateCategory();
	if (isValidTitle && isValidDueDate && isValidCategory) {
		saveInputs();
		saveNewTask(origin);
		checkCurrentUrl();
	} else {
		event.preventDefault();
		animateHint();
		return false;
	}
}

/**
 * Checks the current URL and closes any open overlays if the URL does not include 'add_task'.
 */
function checkCurrentUrl() {
	let url = window.location.href;
	if (!url.includes('add_task')) {
		closeOverlays();
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
 * Validates the title field value. Checks if the title is empty or longer than 40 characters.
 * Adds/removes the 'invalid' class on the title input element accordingly.
 * @returns {boolean} True if valid, false if invalid
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
 * Validates the due date field value. Checks if the due date is empty or before the current date.
 * Adds/removes the 'invalid' class on the due date input element accordingly.
 * @returns {boolean} True if valid, false if invalid
 */
function validateDueDate() {
	let dueDateInput = document.getElementById('due-date-value');
	let dueDateValue = dueDateInput.value.trim();
	if (dueDateValue === '') {
		dueDateInput.classList.add('invalid');
		return false;
	} else {
		let currentDate = new Date();
		let selectedDate = new Date(dueDateValue);
		if (selectedDate < currentDate) {
			showDateError(dueDateInput);
			return false;
		} else {
			dueDateInput.classList.remove('invalid');
			return true;
		}
	}
}

function showDateError(dueDateInput) {
	let dateError = document.getElementById('date-error');
	dateError.classList.toggle('d-none');
	setTimeout(() => {
		dateError.classList.toggle('d-none');
	}, 5000);
	dueDateInput.classList.add('invalid');
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
