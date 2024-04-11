/**
 * Generates an HTML string representing a container for displaying the number of additional assigned users.
 *
 * @param {number} moreAssigned - The number of additional assigned users to display.
 * @returns {string} The generated HTML string.
 */
function showMaxThreeCirclesHTML(moreAssigned) {
	return /*html*/ `
    <div class="amount-of-others"> 
        +${moreAssigned}
    </div>
  `;
}

/**
 * Generates an HTML string representing a circle with the provided color and initial.
 *
 * @param {string} color - The background color of the circle.
 * @param {string} initial - The text to display inside the circle.
 * @returns {string} The generated HTML string.
 */
function showInitialsHTML(color, initial) {
	return /*html*/ `
    <div
      class="initialsCircleOfTasks"
      style="background-color: ${color}">
        ${initial}
    </div>
  `;
}

/**
 * Generates an HTML string representing a progress bar and the number of completed subtasks.
 *
 * @param {number} progress - The progress value as a percentage (0-100).
 * @param {number} doneSubtasks - The number of completed subtasks.
 * @param {Array} subtasks - The array of all subtasks.
 * @returns {string} The generated HTML string.
 */
function generateProgressBarHTML(progress, doneSubtasks, subtasks) {
	return /*html*/ `
    <progress 
      value="${progress}" 
      max="100" 
      class="progress-bar"></progress>
    <div class="amount-of-subtasks-container">
      <div>
        ${doneSubtasks}/${subtasks.length} Subtasks
      </div>
    </div>
  `;
}

/**
 * Generates an empty HTML element with draggable and styling.
 *
 * @param {string} text - Text to display inside the empty element.
 * @returns {string} The generated HTML element as a string.
 */
function generateEmptyHTML(text) {
	return /*html*/ `
		<div 
			draggable="false" 
			class="empty-task drag-and-drop-container-border">
				No tasks ${text}
		</div>
	`;
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
    onclick="openTaskCardOverlay(${
			element['id']
		}), openAddTaskOverlay('overlay-task-card') ">
      ${moveBtnContent}
			<div 
        class="move-menu d-none qm-off" 
        id="move-menu-${taskID}" 
        menuOpen="false">
				  ${moveMenuContent}	
			</div>      
      <div class="category-of-task">
				${element['category']}
      </div>
      <div class="title-of-task">
        ${element['title']}
      </div>
      <div class="description-of-task">
        ${element['description']}
      </div>
      <div 
        class="subtasks-of-task" 
        id="progress${element['id']}">
      </div>
      <div class="assigned-and-priority-container">
        <div 
          id="assignedCircle${element['id']}" 
          class="assigned-to-of-task">
            ${element['assignedTo']}
        </div>
        <div class="priority-of-task">
          ${element['priority']}
        </div>
      </div>
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
 * Renders the HTML for a move menu item.
 *
 * This function generates the HTML for a single move menu item, which is a clickable
 * div element that displays the label of a destination and triggers the `movePerMenu`
 * function when clicked, passing the task ID and destination value as arguments.
 *
 * @param {string} taskID - The ID of the task being moved.
 * @param {object} dest - An object containing the label and value of the destination.
 * @returns {string} The HTML for the move menu item.
 */
function renderMoveMenuHTML(taskID, dest) {
	return /*html*/ `
    <div 
      class="move-menu-item" 
      onclick="event.stopPropagation(); movePerMenu('${taskID}', '${dest.value}')">
        ${dest.label}
    </div>
  `;
}

/**
 * Renders an HTML element representing the initials of a user, enclosed in a colored circle.
 *
 * @param {object} user - An object containing information about the user, including a color property.
 * @param {string} initials - The initials of the user to be displayed.
 * @returns {string} The HTML for the initials circle element.
 */
function createContactInitialsForFilteredHTML(user, initials) {
	return /*html*/ `
    <div 
      class="initialsCircleOfTasks"
      style="background-color: ${user.color}">
        ${initials}
    </div>
  `;
}

/**
 * Renders the HTML for a single task card overlay.
 *
 * This function generates the HTML for a full-screen overlay that displays detailed
 * information about a task, including its category, title, description, due date,
 * priority, and assigned user. It also includes buttons to close the overlay and
 * edit or delete the task.
 *
 * @param {object} card - An object containing the details of the task to be displayed.
 * @returns {string} The HTML for the task card overlay.
 */
function openTaskCardOverlayHTML(card) {
	return /*html*/ `
    <div class="overlay-wrapper">
    	<div id="${card.id}" class="single-task-card" draggable="false">
    		<div class="header-of-task-card">
    			<div class="category-of-single-task">${card.category}</div>
    			<div class="close-btn">
    				<img
    					onclick="closeTaskCardOverlay()"
    					src="assets/img/icons/board/close.svg"
    					alt="close" />
    			</div>
    		</div>

    		<div class="title-of-single-task">${card.title}</div>

    		<div class="description-of-single-task">
    			<span>${card.description}</span>
    		</div>
    		<div class="due-date-of-single-task gap-one-rem">
    			<span>Due Date:</span>
    			<span>${card.dueDate}</span>
    		</div>
    		<div class="priority-of-single-task gap-one-rem">${card.priority}</div>
    		<div class="assigned-and-priority-single-container">
    			<span>Assigned To:</span>
    			<div
    				id="singleAssignedCircle${card.id}"
    				class="assigned-to-of-single-task">
    				${card.assignedTo}
    			</div>
    		</div>
    		<div class="subtasks-of-single-task" id="subtasks${card.id}"></div>
    		<div class="delete-edit-container">
    			<img
    				onclick="deleteTask(${card.id})"
    				src="assets/img/icons/board/delete-bin.svg"
    				alt="delete" />
    			<hr />
    			<img
    				onclick="editTask(${card.id})"
    				src="assets/img/icons/board/edit-pen.svg"
    				alt="edit" />
    		</div>
    	</div>
    </div>
  `;
}

/**
 * Generates an HTML string representing a low priority task.
 *
 * @param {string} low - The URL of the low priority icon image.
 * @returns {string} The HTML string for the low priority task.
 */
function priorityLowHTML(low) {
	return /*html*/ `
    <span>Priority:</span>
    <div class="priority-and-icon">
      <span>Low</span>
      <img src="${low}" alt="low Priority">
    </div>	
  `;
}

/**
 * Generates an HTML string representing a medium priority task.
 *
 * @param {string} medium - The URL of the medium priority icon image.
 * @returns {string} The HTML string for the medium priority task.
 */
function priorityMediumHTML(medium) {
	return /*html*/ `
    <span>Priority:</span>
    <div class="priority-and-icon">
      <span>Medium</span>
      <img src="${medium}" alt="medium Priority">
    </div>
  `;
}

/**
 * Generates an HTML string representing a medium priority task.
 *
 * @param {string} high - The URL of the medium priority icon image.
 * @returns {string} The HTML string for the medium priority task.
 */
function priorityHighHTML(high) {
	return /*html*/ `
    <span>Priority:</span>
    <div class="priority-and-icon">
      <span>High</span>
      <img src="${high}" alt="high Priority">
    </div>
  `;
}

/**
 * Generates an HTML string representing a single card with an initial and name.
 *
 * @param {string} color - The background color for the initial circle.
 * @param {string} initial - The initial to display in the circle.
 * @param {string} name - The name to display next to the initial.
 * @returns {string} The HTML string for the single card.
 */
function showInitialsForSingleCardHTML(color, initial, name) {
	return /*html*/ `			
    <div class="name-and-initial-container">
      <div
        class="initialsCircleOfSingleTasks"
        style="background-color: ${color}">
          ${initial}    
      </div>
      <span>${name}</span>
    </div>
  `;
}

/**
 * Generates an HTML string representing a subtask with a checkbox.
 *
 * @param {number} index - The index of the subtask.
 * @param {string} element - The text content of the subtask.
 * @returns {string} The HTML string for the subtask.
 */
function showSubtasksHTML(index, element) {
	return /*html*/ `
    <div class="subtask-container">
      <img 
        class="img-checked-true-false" 
        alt="checked" 
        onclick="changeSubtaskToDoneOrNot(${index})">
      ${element}
    </div>
  `;
}
