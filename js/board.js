let taskColor = {
	userStory: '#0038FF', // category 1
	technicalTask: '#1FD7C1', //category 2
};

let low = 'assets/img/icons/add-task/low.svg';
let medium = 'assets/img/icons/add-task/medium-orange.svg';
let high = 'assets/img/icons/add-task/urgent.svg';

let taskDone = 'assets/img/icons/board/cf_checked.svg';
let taskNotDone = 'assets/img/icons/board/cf_unchecked.svg';

let currentDraggedElement;

let actualCard;

window.addEventListener('resize', updateHTML);

/**
 * Updates the HTML DOM to reflect the latest state of tasks.
 * Calls various helper functions to update different sections.
 */
async function updateHTML() {
	await loadUserData();
	updateToDos();
	updateInProgress();
	updateAwaitFeedback();
	updateDone();
	updateTaskColorAndCategory();
	updatePriority();
	showContactsToAssign();
	clearForm();
}

function disableDragOption() {
	const allTaskCards = document.querySelectorAll('.task-card');

	for (let i = 0; i < allTaskCards.length; i++) {
		allTaskCards[i].setAttribute('draggable', 'false');
	}
}

/**
 * Updates the To Do section of the HTML DOM
 * to show the tasks with a "toDo" status for each user.
 *
 * Loops through each user's tasks, filters for "toDo" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "toDo" tasks exist for a user, generates empty state HTML.
 */
function updateToDos() {
	let source = 'toDo';
	let content = document.getElementById('toDo');
	content.innerHTML = '';
	for (let i = 0; i < localUserData['users'].length; i++) {
		const element = localUserData['users'][i];
		if (element.hasOwnProperty('tasks')) {
			let toDo = element['tasks'].filter((todo) => todo['status'] == 'toDo');
			for (let index = 0; index < toDo.length; index++) {
				const element = toDo[index];
				content.innerHTML += generateTaskCard(element, source);
				showInitials(element);
				generateProgressBar(element);
			}
		}
	}
	checkIfEmpty('toDo', 'to do');
}

/**
 * Updates the in progress section of the HTML DOM
 * to show the tasks with a "inProgress" status for each user.
 *
 * Loops through each user's tasks, filters for "inProgress" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "inProgress" tasks exist for a user, generates empty state HTML.
 */
function updateInProgress() {
	let source = 'inProgress';
	let content = document.getElementById('inProgress');
	content.innerHTML = '';
	for (let i = 0; i < localUserData['users'].length; i++) {
		const element = localUserData['users'][i];
		if (element.hasOwnProperty('tasks')) {
			let inProgress = element['tasks'].filter(
				(task) => task['status'] == 'inProgress'
			);
			for (let index = 0; index < inProgress.length; index++) {
				const element = inProgress[index];
				content.innerHTML += generateTaskCard(element, source);
				showInitials(element);
				generateProgressBar(element);
			}
		}
	}
	checkIfEmpty('inProgress', 'in progress');
}

/**
 * Updates the await feedback section of the DOM
 * to show the tasks with a "awaitFeedback" status for each user.
 *
 * Loops through each user's tasks, filters for "awaitFeedback" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "awaitFeedback" tasks exist for a user, generates empty state HTML.
 */
function updateAwaitFeedback() {
	let source = 'awaitFeedback';
	let content = document.getElementById('awaitFeedback');
	content.innerHTML = '';
	for (let i = 0; i < localUserData['users'].length; i++) {
		const element = localUserData['users'][i];
		if (element.hasOwnProperty('tasks')) {
			let awaitFeedback = element['tasks'].filter(
				(task) => task['status'] == 'awaitFeedback'
			);
			for (let index = 0; index < awaitFeedback.length; index++) {
				const element = awaitFeedback[index];
				content.innerHTML += generateTaskCard(element, source);
				showInitials(element);
				generateProgressBar(element);
			}
		}
	}
	checkIfEmpty('awaitFeedback', 'await feedback');
}

/**
 * Updates the "closed" section of the DOM
 * to show the tasks with a "done" status for each user.
 *
 * Loops through each user's tasks, filters for "done" status,
 * and generates a task card for each one using helper functions.
 *
 * If no "done" tasks exist for a user, generates empty state HTML.
 */
function updateDone() {
	let content = document.getElementById('closed');
	let source = 'done';

	content.innerHTML = '';
	for (let i = 0; i < localUserData['users'].length; i++) {
		const element = localUserData['users'][i];
		if (element.hasOwnProperty('tasks')) {
			let closed = element['tasks'].filter((task) => task['status'] == 'done');
			for (let index = 0; index < closed.length; index++) {
				const element = closed[index];
				content.innerHTML += generateTaskCard(element, source);
				showInitials(element);
				generateProgressBar(element);
			}
		}
	}
	checkIfEmpty('closed', 'done');
}

/**
 * Checks if the provided element has no content.
 * If empty, generates and inserts empty state HTML.
 *
 * @param {string} id - The ID of the DOM element to check.
 * @param {string} text - The text to display in the empty state.
 */
function checkIfEmpty(id, text) {
	let content = document.getElementById(id);
	if (content.innerHTML === '') {
		content.innerHTML = generateEmptyHTML(text);
	}
}

/**
 * Updates the color and text of task category elements
 * based on their category ID.
 *
 * Loops through all elements with "category-of-task" class,
 * checks category ID, and updates class for styling and innerText
 * to show category name.
 */
function updateTaskColorAndCategory() {
	let elements = document.getElementsByClassName('category-of-task');
	Array.from(elements).forEach((element) => {
		if (element.innerText.trim() == 1) {
			element.classList.add('user-story-task-color');
			element.innerHTML = 'User Story';
		} else {
			element.classList.add('technical-task-color');
			element.innerHTML = 'Technical Task';
		}
	});
}

/**
 * Updates the priority icons in the DOM
 * by replacing the priority number values
 * with corresponding icon images.
 *
 * Gets all elements with "priority-of-task" class,
 * checks priority number, and updates innerHTML
 * to show correct priority icon image.
 */
function updatePriority() {
	let prioBoxes = document.getElementsByClassName('priority-of-task');
	Array.from(prioBoxes).forEach((prioBox) => {
		if (
			prioBox.innerText.trim() == 1 ||
			prioBox.innerText.trim().toLowerCase() == 'low'
		) {
			prioBox.innerHTML = `<img src="${low}" alt="Low Priority">`;
		} else if (
			prioBox.innerText.trim() == '2' ||
			prioBox.innerText.trim().toLowerCase() == 'medium'
		) {
			prioBox.innerHTML = `<img src="${medium}" alt="Low Priority">`;
		} else if (
			prioBox.innerText.trim() == '3' ||
			prioBox.innerText.trim().toLowerCase() == 'urgent'
		) {
			prioBox.innerHTML = `<img src="${high}" alt="Low Priority">`;
		}
	});
}

/**
 * Displays initials of assigned users inside the assigned user
 * indicator element.
 *
 * Loops through the array of assigned user names, extracts the
 * first initial from each name, finds the user color for that
 * user, and adds a div with the colored initial to the indicator
 * element.
 */
function showInitials(element) {
	let allInitials = element.assignedTo;
	let container = document.getElementById(`assignedCircle${element['id']}`);
	container.innerHTML = '';
	allInitials.forEach((name) => {
		const initial = name
			.split(' ')
			.map((word) => word.charAt(0))
			.join('');
		let user = localUserData['contacts'].find(
			(user) => user.userData.name === name
		);
		let color = user ? user.color : '#d98973';
		container.innerHTML += `
    <div
    class="initialsCircleOfTasks"
        style="background-color: ${color}">
        ${initial}
  </div>
`;
	});
}

/**
 * Generates a progress bar and text indicating number of subtasks completed.
 *
 * Gets container element by ID, checks if subtasks array exists on element,
 * calculates percentage of subtasks completed, generates progress bar element
 * with appropriate value, and text indicating number of subtasks completed vs total.
 */
function generateProgressBar(element) {
	let container = document.getElementById(`progress${element['id']}`);
	container.innerHTML = '';
	let subtasks = element['subtasks'];
	if (!element.hasOwnProperty('subtasks') || subtasks.length == 0) {
		return;
	} else {
		let doneSubtasks = subtasks.filter((subtask) => subtask.done).length;
		let progress = (doneSubtasks / subtasks.length) * 100;

		container.innerHTML = `<progress value="${progress}" max="100" class="progress-bar"></progress>
          <div class="amount-of-subtasks-container">
        <div>
        ${doneSubtasks}/${subtasks.length} Subtasks
       </div>
      </div>`;
	}
}

/**
 * Generates an empty HTML element with draggable and styling.
 *
 * @param {string} text - Text to display inside the empty element.
 * @returns {string} The generated HTML element as a string.
 */
function generateEmptyHTML(text) {
	return `<div draggable="false" class="empty-task drag-and-drop-container-border">No tasks ${text}</div>`;
}

function isDraggable() {
	return window.innerWidth > 1152;
}

/**
 * Generates the HTML for a task card element.
 *
 * Returns an HTML string for a draggable task card element, including:
 * - Move button
 * - Move menu
 * - Category, title, description from element
 * - Progress bar from subtasks
 * - Assigned to and priority
 */
function generateTaskCard(element, source) {
	const taskID = element['id'];
	const moveBtnContent = renderMoveBtn(taskID);
	const moveMenuContent = renderMoveMenu(source, taskID);
	return /*html*/ `   
	<div 
    draggable="${isDraggable()}" 
    ondragstart="startDragging(${element['id']})" 
    ondragend="stopDragging(${element['id']})" 
    id="${element['id']}"   
    class="task-card" 
    onclick="openTaskCardOverlay(${element['id']}) ">
      ${moveBtnContent}
			<div class="move-menu d-none qm-off" id="move-menu-${taskID}" menuOpen="false">
				${moveMenuContent}	
			</div>      
      <div class="category-of-task">
				${element['category']}
      </div>
      <div class="title-of-task">${element['title']}</div>
      <div class="description-of-task">${element['description']}</div>
      <div class="subtasks-of-task" id="progress${element['id']}"></div>
      <div class="assigned-and-priority-container">
      <div id="assignedCircle${element['id']}" class="assigned-to-of-task">${
		element['assignedTo']
	}</div>
      <div class="priority-of-task">${element['priority']}</div>
  </div>
   `;
}

/**
 * Renders the move button HTML for a task.
 *
 * Generates a clickable div containing an icon to toggle the move menu
 * for a specific task, identified by its taskID.
 */
function renderMoveBtn(taskID) {
	return /*html*/ `
    <div onclick="toggleMoveBtnMenu(event, '${taskID}')" class="mobile-move-btn " id="mobile-move-btn-${taskID}" >
      <img 
				id="btn-icon-${taskID}" 
				class="menu-closed"
				src="/assets/img/icons/contacts/more_vert.svg" 
				alt="" >
    </div>
  `;
}

/**
 * Renders the move menu dropdown for a task
 *
 * Generates the HTML for the dropdown menu shown when moving a task.
 * Filters the possible destinations based on the current source board,
 * and maps them to dropdown items calling the moveTask function.
 *
 * @param {string} source - The current board the task is in
 * @param {string} taskID - The ID of the task
 * @returns {string} The generated dropdown HTML
 */
function renderMoveMenu(source, taskID) {
	const destinations = [
		{ label: 'To do', value: 'toDo' },
		{ label: 'In progress', value: 'inProgress' },
		{ label: 'Await feedback', value: 'awaitFeedback' },
		{ label: 'Done', value: 'done' },
	].filter((dest) => dest.value !== source);
	const dropdownItems = destinations
		.map(
			(dest) => /*html*/ `
        <div 
          class="move-menu-item" 
          onclick="event.stopPropagation(); movePerMenu('${taskID}', '${dest.value}')">
          ${dest.label}
        </div>`
		)
		.join('');
	return dropdownItems;
}

/**
 * Toggles the move menu dropdown for a task
 *
 * Shows or hides the move menu dropdown for the task with the given ID.
 * Handles resetting any other open menus and buttons.
 */
function toggleMoveBtnMenu(event, taskID) {
	event.stopPropagation();
	const moveMenu = document.getElementById(`move-menu-${taskID}`);
	const btnIcon = document.getElementById(`btn-icon-${taskID}`);
	resetNonSelectedMenus(`move-menu-${taskID}`);
	resetNonSelectedBtns(`btn-icon-${taskID}`);
	if (moveMenu.classList.contains('d-none')) {
		moveMenu.classList.replace('qm-off', 'qm-on');
		setTimeout(() => {
			btnIcon.classList.replace('menu-closed', 'menu-open');
			moveMenu.classList.toggle('d-none');
		}, 125);
	} else {
		btnIcon.classList.replace('menu-open', 'menu-closed');
		moveMenu.classList.replace('qm-on', 'qm-off');
		setTimeout(() => {
			moveMenu.classList.toggle('d-none');
		}, 125);
	}
}

/**
 * Resets the class names on all move menus except the selected one
 * to hide them.
 *
 * @param {string} selectedMenuId - The ID of the menu to not reset
 */
function resetNonSelectedMenus(selectedMenuId) {
	const allMoveMenus = document.querySelectorAll('.move-menu');
	allMoveMenus.forEach((menu) => {
		if (menu.id !== selectedMenuId) {
			menu.classList.add('d-none');
			menu.classList.remove('qm-on');
			menu.classList.add('qm-off');
		}
	});
}

/**
 * Resets the "menu-open" and "menu-closed" classes on all button icons except the selected one.
 *
 * @param {string} selectedBtnId - The ID of the selected button
 */
function resetNonSelectedBtns(selectedBtnId) {
	const allBtnIcons = document.querySelectorAll('.mobile-move-btn img');
	allBtnIcons.forEach((icon) => {
		if (icon.id !== selectedBtnId) {
			icon.classList.remove('menu-open');
			icon.classList.add('menu-closed');
		}
	});
}

/**
 * Sets the global currentDraggedElement variable to the provided id.
 * This allows tracking the id of the element currently being dragged.
 */
function startDragging(id) {
	currentDraggedElement = id;
	const draggedTask = document.getElementById(id);
	draggedTask.classList.add('dragged');
}

function stopDragging(id) {
	currentDraggedElement = id;
	const draggedTask = document.getElementById(id);
	draggedTask.classList.remove('dragged');
}

/**
 * Prevents the default dragover event to allow dropping.
 */
function allowDrop(event) {
	event.preventDefault();
}

/**
 * Moves a dragged task element to the given status by updating its status property.
 *
 * Loops through the local user data to find the task with matching ID, then updates
 * its status property. Saves the updated user data and re-renders the HTML.
 *
 * @param {string} status - The status to set the task to, e.g. "todo", "in-progress", "done"
 */
function movePerDrag(status) {
	let id = currentDraggedElement;
	gotIt = false;
	for (let i = 0; i < localUserData['users'].length && gotIt == false; i++) {
		let element = localUserData['users'][i]['tasks'];
		for (let j = 0; j < element.length; j++) {
			if (element[j].id === id) {
				localUserData['users'][i]['tasks'][j].status = status;
				gotIt = true;
			}
		}
	}
	saveUserData();
	updateHTML();
}

/**
 * Moves a task with the given ID to the specified destination status.
 * Iterates through all users' tasks to find the matching task ID, then
 * updates its status property. Saves the updated user data and re-renders
 * the UI.
 *
 * @param {number} taskID - The ID of the task to move
 * @param {string} destination - The status to set the task to
 */
function movePerMenu(taskID, destination) {
	taskID = parseInt(taskID);
	let gotIt = false;
	for (let i = 0; i < localUserData['users'].length && !gotIt; i++) {
		let tasks = localUserData['users'][i]['tasks'];
		for (let j = 0; j < tasks.length; j++) {
			if (tasks[j].id === taskID) {
				localUserData['users'][i]['tasks'][j].status = destination;
				gotIt = true;
			}
		}
	}
	saveUserData();
	updateHTML();
}

/**
 * Adds the "drag-area-highlight" class to the element with the given ID.
 * This highlights the element as a drag target area.
 */
function highlight(id) {
	document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Removes the "drag-area-highlight" class from the element with the given ID.
 * This removes the highlight indicating it as a drag target area.
 */
function removeHighlight(id) {
	document.getElementById(id).classList.remove('drag-area-highlight');
}

// :::::::::::::::::::::: Search - Function  :::::::::::::::::::::://

/**
 * Filters the tasks to find only those whose title or description
 * match the search input value (case insensitive).
 * Pushes any matched tasks into the matchedTasks array.
 * Renders the matched tasks and updates the UI.
 * If search input is empty, re-renders the full task list.
 */
function filterMatchedTasks() {
	let input = document.getElementById('find-task').value.toLowerCase();
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
}

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
			toDoContainer.innerHTML += generateTaskCard(task);
			let names = task.assignedTo;
			updateTaskColorAndCategory();
			updatePriority();
			// showContactsToAssign();
			// createContactInitialsForFiltered(names); // hier noch in Z. 398 weiter machen
		} else if (task.status == 'inProgress') {
			inProgressContainer.innerHTML += generateTaskCard(task);
		} else if (task.status == 'awaitFeedback') {
			awaitFeedbackContainer.innerHTML += generateTaskCard(task);
		} else if (task.status == 'done') {
			doneContainer.innerHTML += generateTaskCard(task);
		}
	});
}

function createContactInitialsForFiltered(names) {
	// hier weiter machen, muss noch forEach benutzt werden!!
	let element = localUserData.contacts.find(
		(user) => user.userData.name === names
	);
	const initials = element
		.split(' ')
		.map((word) => word.charAt(0))
		.join('');

	return `
      <div 
      class="initialsCircleOfTasks"
          style="background-color: ${user.color}">
          ${initials}
    </div>
    `;
}

/**
 * Checks if any of the task container elements are empty
 * and generates empty state HTML if so.
 *
 * @param {Element} toDoContainer - The container element for To Do tasks
 * @param {Element} inProgressContainer - The container for In Progress tasks
 * @param {Element} awaitFeedbackContainer - The container for Awaiting Feedback tasks
 * @param {Element} doneContainer - The container for Closed/Done tasks
 */
function checkForEmptyContainers() {
	let toDoContainer = document.getElementById('toDo');
	let inProgressContainer = document.getElementById('inProgress');
	let awaitFeedbackContainer = document.getElementById('awaitFeedback');
	let doneContainer = document.getElementById('closed');

	if (toDoContainer.childElementCount == 0) {
		toDoContainer.innerHTML = generateEmptyHTML('to do');
	}
	if (inProgressContainer.childElementCount == 0) {
		inProgressContainer.innerHTML = generateEmptyHTML('in progress');
	}
	if (awaitFeedbackContainer.childElementCount == 0) {
		awaitFeedbackContainer.innerHTML = generateEmptyHTML('awaiting feedback');
	}
	if (doneContainer.childElementCount == 0) {
		doneContainer.innerHTML = generateEmptyHTML('closed');
	}
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
	overlay.classList.remove('box-slide-out', 'd-none');
	setTimeout(() => {
		overlay.classList.add('box-slide-in');
	}, 0);
	overlay.classList.remove('d-none');
	localUserData.users.forEach((user) => {
		let cardIndex = user.tasks.findIndex((task) => task.id === element);
		let card = user.tasks[cardIndex];
		if (cardIndex !== -1) {
			actualCard = card;
			overlay.innerHTML = /*html*/ `
      <div class="overlay-wrapper">
        <div 
          id="${card.id}" 
          class="single-task-card"
          draggable="false" >
      
          <div class="header-of-task-card">
            <div class="category-of-single-task ">${card.category}</div>
            <div class="close-btn">            
              <img onclick="closeTaskCardOverlay()" src="assets/img/icons/board/close.svg" alt="close">
            </div>
          </div>

          <div class="title-of-single-task">
            ${card.title}
          </div>

          <div class="description-of-single-task">
            <span>${card.description}</span>
          </div>
          <div class="due-date-of-single-task gap-one-rem">
            <span>Due Date:</span>
            <span>${card.dueDate}</span>
          </div>
          <div class="priority-of-single-task gap-one-rem">
            ${card.priority}
          </div>
          <div class="assigned-and-priority-single-container">
            <span>Assigned To:</span> 
            <div 
              id="singleAssignedCircle${card.id}" 
              class="assigned-to-of-single-task">
              ${card.assignedTo}
            </div>
          </div>
          <div 
            class="subtasks-of-single-task" 
            id="subtasks${card.id}">
          </div>
          <div class="delete-edit-container">
            <img onclick="deleteTask(${card.id})" src="assets/img/icons/board/delete-bin.svg" alt="delete">
            <hr>
            <img onclick="editTask(${card.id})" src="assets/img/icons/board/edit-pen.svg" alt="edit">
          </div>
        </div>
      </div>
      `;
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
 * Updates the styling of the task category element in the
 * overlay task card to indicate the category type.
 */
function taskColorAndCategoryForSingleCard() {
	let element = document.getElementsByClassName('category-of-single-task');
	Array.from(element).forEach((element) => {
		if (element.innerText.trim() == 1) {
			element.classList.add('user-story-task-color');
			element.innerHTML = 'User Story';
		} else {
			element.classList.add('technical-task-color');
			element.innerHTML = 'Technical Task';
		}
	});
}

/**
 * Updates styling of priority element in overlay
 * task card based on priority value.
 *
 * @param {HTMLElement[]} prioBox - Array of priority elements
 */
function updatePriorityForSingleTask() {
	let prioBox = document.getElementsByClassName('priority-of-single-task');
	Array.from(prioBox).forEach((prioBox) => {
		if (
			prioBox.innerText.trim() == '1' ||
			prioBox.innerText.trim().toLowerCase() == 'low'
		) {
			prioBox.innerHTML = `<span>Priority:
      </span><div class="priority-and-icon"><span>Low</span><img src="${low}" alt="low Priority">
      </div>`;
		} else if (
			prioBox.innerText.trim() == '2' ||
			prioBox.innerText.trim().toLowerCase() == 'medium'
		) {
			prioBox.innerHTML = `<span>Priority:
      </span><div class="priority-and-icon"><span>Medium</span><img src="${medium}" alt="medium Priority">
      </div>`;
		} else if (
			prioBox.innerText.trim() == '3' ||
			prioBox.innerText.trim().toLowerCase() == 'urgent'
		) {
			prioBox.innerHTML = `<span>Priority:
      </span><div class="priority-and-icon"><span>High</span><img src="${high}" alt="high Priority">
      </div>`;
		}
	});
}

/**
 * Displays the initials of each user assigned to the task
 * in the overlay task card.
 *
 * Loops through the array of assigned user names, extracts the
 * first letter of each part of the name to create initials,
 * finds the user object to get the color, and adds a div with
 * the initials styled with the color and the full name.
 */
function showInitialsForSingleCard() {
	let allInitials = actualCard.assignedTo;
	let container = document.getElementById(
		`singleAssignedCircle${actualCard['id']}`
	);
	container.innerHTML = '';
	allInitials.forEach((name) => {
		const initial = name
			.split(' ')
			.map((word) => word.charAt(0))
			.join('');
		let user = localUserData['contacts'].find(
			(user) => user.userData.name === name
		);
		let color = user ? user.color : '#A8A8A8';
		container.innerHTML += /*html*/ `			
    <div class="name-and-initial-container">
    <div
    class="initialsCircleOfSingleTasks"
        style="background-color: ${color}">
        ${initial}    
  </div>
  <span>${name}</span>
  </div>
		`;
	});
}

/**
 * Displays the subtasks for the task card that is currently opened.
 * Loops through the subtasks array and adds a div for each subtask
 * with the name and a checkbox to mark it done/not done.
 * Handles toggling the checkbox when clicked and updating styles.
 */
function showSubtasks() {
	let content = document.getElementById(`subtasks${actualCard.id}`);
	content.innerHTML = '';
	content.innerHTML = `<span>Subtasks</span>`;
	for (let index = 0; index < actualCard.subtasks.length; index++) {
		let element = actualCard.subtasks[index]['name'];
		content.innerHTML += `<div class="subtask-container">
    <img class="img-checked-true-false" alt="checked" onclick="changeSubtaskToDoneOrNot(${index})">
    ${element}
    </div>`;
		let status = actualCard.subtasks[index]['done'];
		let img = document.getElementsByClassName('img-checked-true-false')[index];
		if (status === true) {
			img.src = taskDone;
			img.classList.add('is-done');
		} else {
			img.src = taskNotDone;
			img.classList.add('not-done');
		}
	}
}

/**
 * Closes the overlay for the expanded task card.
 * Removes the open classes from the overlay, waits briefly via setTimeout,
 * then adds the closed class. Also empties the inner HTML.
 */
function closeTaskCardOverlay() {
	let overlay = document.getElementById('overlay-task-card');
	overlay.classList.remove('box-slide-in', 'd-none');
	setTimeout(() => {
		overlay.classList.add('box-slide-out');
	}, 0);
	overlay.classList.remove('d-none');
	overlay.innerHTML = '';
	actualCard = [];
	updateHTML();
}

/**
 * Deletes a task card from the board.
 * Loops through all users and their tasks to find the
 * task with the matching id. Removes that task from the user's
 * tasks array. Saves the updated user data, closes the expanded
 * task card overlay, and updates the HTML to reflect the change.
 */
function deleteTask(card) {
	for (let i = 0; i < localUserData.users.length; i++) {
		for (let j = 0; j < localUserData.users[i].tasks.length; j++) {
			if (localUserData.users[i].tasks[j].id === card) {
				localUserData.users[i].tasks.splice(j, 1);
			}
		}
	}
	saveUserData();
	closeTaskCardOverlay();
	updateHTML();
}

/**
 * Toggles the 'done' status of a subtask at the given index
 * in the actualCard's subtasks array.
 * Updates the subtask status in local storage and
 * re-renders the subtasks section of the task card.
 */
function changeSubtaskToDoneOrNot(index) {
	let subtask = actualCard.subtasks[index];
	if (subtask.done === false) {
		subtask.done = true;
	} else {
		subtask.done = false;
	}
	localUserData.users.indexOf(actualCard);
	saveUserData();
	showSubtasks();
}

// :::::::::::::::::::::: Add - Task - PopUp :::::::::::::::::::::://

/**
 * Opens the add task dialogue box to add a new task.
 * Removes the 'box-slide-out' and 'd-none' classes from the overlay
 * to make it visible. Adds the 'box-slide-in' class to animate it opening.
 */
function openAddTaskOverlay() {
	let overlay = document.getElementById('add-task-content-overlay');
	overlay.classList.remove('box-slide-out', 'd-none');
	setTimeout(() => {
		overlay.classList.add('box-slide-in');
	}, 0);
	overlay.classList.remove('d-none');
}

/**
 * Closes the add task dialogue box by removing the 'box-slide-in' and 'd-none' classes,
 * adding the 'box-slide-out' class after a timeout to animate it closing,
 * and ensuring the overlay is not hidden with 'd-none' after closing.
 */
function closeAddTaskOverlay() {
	clearForm();
	let overlay = document.getElementById('add-task-content-overlay');
	overlay.classList.remove('box-slide-in', 'd-none');
	setTimeout(() => {
		overlay.classList.add('box-slide-out');
	}, 0);
	overlay.classList.remove('d-none');
}
