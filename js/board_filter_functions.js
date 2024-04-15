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
 * Renders the matched tasks by clearing existing task containers and
 * rendering each matched task. Also checks for empty containers after rendering.
 *
 * @param {Array} matchedTasks - The array of tasks that matched the search criteria
 */
function renderMatchedTasks(matchedTasks) {
	const containers = [
		document.getElementById('toDo'),
		document.getElementById('inProgress'),
		document.getElementById('awaitFeedback'),
		document.getElementById('closed'),
	];
	containers.forEach((container) => {
		container.innerHTML = '';
	});
	matchedTasks.forEach((task) => {
		renderTask(task);
	});
	checkForEmptyContainers();
}

/**
 * Renders a matched task by finding the correct container based on
 * the task status and calling renderMatch to insert the HTML.
 *
 * @param {Object} task - The task object
 */
function renderTask(task) {
	const statusContainers = {
		toDo: document.getElementById('toDo'),
		inProgress: document.getElementById('inProgress'),
		awaitFeedback: document.getElementById('awaitFeedback'),
		done: document.getElementById('closed'),
	};
	const container = statusContainers[task.status];
	renderMatch(task, container);
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
