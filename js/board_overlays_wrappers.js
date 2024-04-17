/**
 * Opens the add task overlay/modal by:
 * - Getting reference to overlay element by ID
 * - Removing slide out and hidden classes
 * - Adding slide in class
 * - Removing hidden class again
 * - Calling backDropOn() to show modal background
 */
async function openAddTaskOverlay(id) {
	const screenWidth = window.innerWidth;
	if (screenWidth <= 424 && id === 'add-task-content-overlay') {
		window.location.href = 'add_task.html';
	} else {
		let overlay = document.getElementById(id);
		overlay.classList.remove('d-none');
		overlay.classList.replace('box-slide-out', 'box-slide-in');
		overlay.classList.remove('d-none');
		backDropOn();
		addDropdownClickListener();
	}
}

/**
 * Closes any open overlays by:
 * - Closing the add task overlay with a closing animation
 * - Updating the HTML after closing add task overlay
 * - Closing the task card overlay with a closing animation
 * - Handling closing of the edit task overlay
 * - Clearing any form data
 */
function closeOverlays() {
	clearForm();
	const addTaskOverlay = document.getElementById('add-task-content-overlay');
	const taskCardOverlay = document.getElementById('overlay-task-card');
	const editTaskOverlay = document.getElementById('overlay-edit-card');
	if (addTaskOverlay && addTaskOverlay.classList.contains('box-slide-in')) {
		closingAnimation(addTaskOverlay);
	}
	if (taskCardOverlay && taskCardOverlay.classList.contains('box-slide-in')) {
		closingAnimation(taskCardOverlay);
	}
	if (editTaskOverlay) {
		editTaskCase(editTaskOverlay, taskCardOverlay);
	}
	document.body.classList.remove('no-outside-scroll');
	removeDropdownClickListener();
	updateHTML();
}

/**
 * Handles closing the edit task overlay. Animates the overlay closing and removes
 * the slide out class after a short delay.
 */
function editTaskCase(editTaskOverlay, taskCardOverlay) {
	closingAnimation(editTaskOverlay);
	closingAnimation(taskCardOverlay);
	setTimeout(() => {
		editTaskOverlay.classList.remove('box-slide-out');
	}, 350);
}

/**
 * Handles closing animation for overlays.
 *
 * Removes slide in class, adds slide out class, then delays removing
 * overlay from DOM and turning off backdrop.
 *
 * @param {Element} overlay - The overlay element to animate closing
 */
function closingAnimation(overlay) {
	overlay.classList.remove('box-slide-in');
	overlay.classList.add('box-slide-out');
	setTimeout(() => {
		overlay.classList.add('d-none');
		backDropOff();
	}, 350);
}

/**
 * Turns on the backdrop by removing the 'd-none' class and replacing
 * 'wrapper-off' with 'wrapper-on'.
 */
function backDropOn() {
	let wrapper = document.getElementById('wrapper');
	wrapper.classList.remove('d-none');
	wrapper.classList.replace('wrapper-off', 'wrapper-on');
}

/**
 * Turns off the backdrop by adding the 'd-none' class and replacing
 * 'wrapper-on' with 'wrapper-off'.
 */
function backDropOff() {
	let wrapper = document.getElementById('wrapper');
	wrapper.classList.add('d-none');
	wrapper.classList.replace('wrapper-on', 'wrapper-off');
}

/**
 * Opens the task card overlay. Finds the task data for the given element ID,
 * sets it as the active task, renders the overlay content, and runs the
 * aftermath function to finish opening the overlay.
 *
 * @param {Element} element - The DOM element for the task being opened
 */
function openTaskCardOverlay(element) {
	let overlay = document.getElementById('overlay-task-card');
	overlay.classList.remove('d-none');
	overlay.classList.replace('box-slide-out', 'box-slide-in');
	overlay.classList.replace('box-slide-out', 'box-slide-in');
	document.body.classList.add('no-outside-scroll');
	localUserData.users.forEach((user) => {
		let cardIndex = user.tasks.findIndex((task) => task.id === element);
		let card = user.tasks[cardIndex];
		if (cardIndex !== -1) {
			actualCard = card;
			overlay.innerHTML = openTaskCardOverlayHTML(card);
		} else {
			return;
		}
	});
	openTaskCardAftermath();
}

/**
 * This function handles updating various parts of the UI after
 * opening a task card in the overlay
 */
function openTaskCardAftermath() {
	taskColorAndCategoryForSingleCard();
	updatePriorityForSingleTask();
	showInitialsForSingleCard();
	showSubtasks();
}

/**
 * Closes the task card overlay.
 *
 * Removes the overlay from the DOM, waits 350ms then clears its inner HTML
 * and resets the 'actualCard' variable used to track the currently
 * open card. Calls other functions to update the UI.
 */
function closeTaskCardOverlay() {
	let overlay = document.getElementById('overlay-task-card');
	closeOverlays();
	setTimeout(() => {
		overlay.innerHTML = '';
	}, 350);
	actualCard = [];
	updateHTML();
}
