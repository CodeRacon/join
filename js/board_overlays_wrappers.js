// :::::::::::::::::::::: Add - Task - PopUp :::::::::::::::::::::://

/**
 * Opens the add task overlay/modal by:
 * - Getting reference to overlay element by ID
 * - Removing slide out and hidden classes
 * - Adding slide in class
 * - Removing hidden class again
 * - Calling backDropOn() to show modal background
 */
function openAddTaskOverlay(id) {
	let overlay = document.getElementById(id);
	overlay.classList.remove('d-none');
	overlay.classList.replace('box-slide-out', 'box-slide-in');
	overlay.classList.remove('d-none');
	backDropOn();
}

/**
 * Closes any open overlays/modals by:
 * - Getting references to overlay elements by ID
 * - Calling closingAnimation() on each to animate closing
 * - Removing slide in classes
 * - Calling additional cleanup functions
 */
function closeOverlays() {
	const addTaskOverlay = document.getElementById('add-task-content-overlay');
	const taskCardOverlay = document.getElementById('overlay-task-card');
	const editTaskOverlay = document.getElementById('overlay-edit-card');
	if (addTaskOverlay && addTaskOverlay.classList.contains('box-slide-in')) {
		closingAnimation(addTaskOverlay);
		updateHTML();
	}
	if (taskCardOverlay && taskCardOverlay.classList.contains('box-slide-in')) {
		closingAnimation(taskCardOverlay);
	}
	if (editTaskOverlay) {
		closingAnimation(editTaskOverlay);
		closingAnimation(taskCardOverlay);
		setTimeout(() => {
			editTaskOverlay.classList.remove('box-slide-out');
		}, 350);
	}
	clearForm();
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
	console.log(overlay);
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

// :::::::::::::::::::::: Task - Card - PopUp :::::::::::::::::::::://

/**
 * Opens an overlay with details for the task card with the given ID.
 *
 * Finds the task card object matching the ID from the user data.
 * Renders the task details in the overlay HTML.
 * Calls other functions to update styles and show additional info.
 *
 * @param {string} element - The ID of the task card to show details for
 */
function openTaskCardOverlay(element) {
	let overlay = document.getElementById('overlay-task-card');
	overlay.classList.remove('d-none');
	overlay.classList.replace('box-slide-out', 'box-slide-in');

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
