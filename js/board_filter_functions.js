// :::::::::::::::::::::: Search - Function  :::::::::::::::::::::://

/**
 * Filters the tasks to find only those whose title or description
 * match the search input value (case insensitive).
 * Pushes any matched tasks into the matchedTasks array.
 * Renders the matched tasks and updates the UI.
 * If search input is empty, re-renders the full task list.
 */
function filterMatchedTasks() {
	let input = document.getElementById('find-task').value.toLowerCase().trim();
	let matchedTasks = [];
	localUserData.users.forEach((user) => {
		user.tasks.forEach((task) => {
			if (
				task.title.toLowerCase().includes(input) ||
				task.description.toLowerCase().includes(input)
			) {
				matchedTasks.push(task);
			}
		});
	});
	renderMatchedTasks(matchedTasks);
	if (input == '') {
		updateHTML();
	}
}

/**
 * Renders the matched tasks into their respective containers
 * based on task status.
 * Clears existing task elements from the containers first.
 * @param {Array} matchedTasks - Array of tasks matched by search filter
 */
function renderMatchedTasks(matchedTasks) {
	let toDoContainer = document.getElementById('toDo');
	let inProgressContainer = document.getElementById('inProgress');
	let awaitFeedbackContainer = document.getElementById('awaitFeedback');
	let doneContainer = document.getElementById('closed');
	toDoContainer.innerHTML = '';
	inProgressContainer.innerHTML = '';
	awaitFeedbackContainer.innerHTML = '';
	doneContainer.innerHTML = '';

	matchedTasks.forEach((task) => {
		if (task.status == 'toDo') {
			renderMatch(task, toDoContainer);
		} else if (task.status == 'inProgress') {
			renderMatch(task, inProgressContainer);
		} else if (task.status == 'awaitFeedback') {
			renderMatch(task, awaitFeedbackContainer);
		} else if (task.status == 'done') {
			renderMatch(task, doneContainer);
		}
	});
	checkForEmptyContainers();
}

/**
 * Renders a matched task into the provided container.
 * Looks up assigned users and renders their filtered cards.
 *
 * @param {Object} task - Task object to render
 * @param {Element} container - DOM element to render task card into
 */
function renderMatch(task, container) {
	let names = task.assignedTo;
	container.innerHTML += generateTaskCard(task);
	renderFilteredCards(names, task);
}

/**
 * Renders filtered user cards for the assigned users of a task.
 * Updates task color, category, priority, shows contacts to assign,
 * and creates contact initials for the filtered users.
 *
 * @param {Array} names - Array of user names assigned to the task
 * @param {Object} task - Task object
 */
function renderFilteredCards(names, task) {
	updateTaskColorAndCategory();
	updatePriority();
	showContactsToAssign();
	createContactInitialsForFiltered(names, task);
	showMaxThreeCircles(task);
}

/**
 * Renders filtered user initials for the assigned users of a task.
 * Creates initials circles with background color and initials
 * for each assigned user that is filtered.
 *
 * @param {Array} names - Array of user names assigned to the task
 * @param {Object} task - Task object
 */
function createContactInitialsForFiltered(names, task) {
	let container = document.getElementById(`assignedCircle${task.id}`);
	container.innerHTML = '';
	names.forEach((name) => {
		let user = localUserData.contacts.find(
			(contact) => contact.userData.name === name
		);
		const initials = name
			.replace(/ \(You\)$/, '')
			.split(' ')
			.map((word) => word.charAt(0))
			.join('');
		container.innerHTML += createContactInitialsForFilteredHTML(user, initials);
	});
}

/**
 * Swaps the magnifying glass image for a close image
 * and sets it to call clearInput() when clicked.
 * Also adds the hover-close class.
 */
function exchangeImgInput() {
	let img = document.getElementById('magnifying-glass');
	img.src = 'assets/img/icons/add-task/close.svg';
	img.setAttribute('onclick', 'clearInputAndResetImg()');
	img.classList.add('hover-close');
}

/**
 * Clears the input field, resets the magnifying
 * glass image, and updates the HTML.
 */
function clearInputAndResetImg() {
	let input = document.getElementById('find-task');
	input.value = '';
	resetImg();
	updateHTML();
}

/**
 * Resets the search icon image to the default magnifying glass
 * and removes the onclick handler and hover-close class that
 * were added when the user started searching.
 */
function resetImg() {
	let img = document.getElementById('magnifying-glass');
	img.src = 'assets/img/icons/board/search-icon.svg';
	img.removeAttribute('onclick', 'clearInput()');
	img.classList.remove('hover-close');
}
