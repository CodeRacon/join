function validateEditTaskForm(event) {
	console.log('validating edit task form...');
	const isValidTitle = validateTitleEdit();
	const isValidDueDate = validateDueDateEdit();
	if (isValidTitle && isValidDueDate) {
		exchangeEditedTask();
		closeOverlays();
	} else {
		event.preventDefault();
		return false;
	}
}

function validateTitleEdit() {
	let titleInput = document.getElementById('title-value');
	let titleValue = titleInput.value.trim();
	let titleError = document.getElementById('title-error-edit');
	if (titleValue.length > 40 || titleValue === '') {
		titleInput.classList.add('invalid');
		titleError.textContent = 'This field is required.';
		return false;
	} else {
		titleInput.classList.remove('invalid');
		return true;
	}
}

function validateDueDateEdit() {
	let dueDateInput = document.getElementById('due-date-value');
	let dueDateValue = dueDateInput.value.trim();
	let currentDate = new Date();
	let selectedDate = new Date(dueDateValue);
	let dateError = document.getElementById('date-error-edit');
	if (dueDateValue === '') {
		dueDateInput.classList.add('invalid');
		dateError.textContent = 'This field is required.';
		return false;
	} else if (selectedDate < currentDate) {
		dueDateInput.classList.add('invalid');
		dateError.textContent = 'Chosen date is in the past.';
		return false;
	} else {
		dueDateInput.classList.remove('invalid');
		return true;
	}
}
