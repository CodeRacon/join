/**
 * Renders the HTML for editing a task in a modal overlay.
 * Includes fields for title, description, due date, priority,
 * assignee, and subtasks. Saves edits via exchangeEditedTask().
 */
function editTaskHTML(task) {
	return /*html*/ `
  <div class="overlay-wrapper">
	<div class="single-task-card">
		<div class="close-edit-task-btn">
			<img
				src="./assets/img/icons/board/close.svg"
				alt="close"
				onclick="closeOverlays()" />
		</div>

		<div class="title-cont">
			<span>Title<span class="asterisk">*</span></span>
			<input
				id="title-value"
				class="field-width-height input-borders title--input"
				name="title"
				type="text"
				maxlength="40"
				value="${task.title}"
				class="field-width-height-small input-borders title"
				placeholder="Enter a title"
				required />
		</div>

		<div class="description-cont">
			<span>Description</span>
			<textarea
				name="description-text"
				id="description"
				class="field-width-height-small description-height input-borders description"
				placeholder="Enter a Description"
				maxlength="140"
				cols="30"
				rows="10">${task.description}
      </textarea>
		</div>

		<!-- Date -->
		<div class="date-cont">
			<span>Due Date<span class="asterisk">*</span></span>
			<input
				id="due-date-value"
				class="field-width-height-small input-borders due-date"
				name="date"
				type="text"
				value="${task.dueDate}"
				placeholder="yyyy/mm/dd"
				required
				onfocus="(this.type='date')"
				onblur="(this.type='text')" />
		</div>

		<!--Prio-->
		<div class="prio-cont">
			<span>Prio</span>
			<div class="priority">
				<button
					id="urgent-btn-edit"
					class="prio-box prio-unset"
					onclick="changePriorityEdit('urgent')">
					Urgent
					<img
						id="img-urgent-edit"
						src="./assets/img/icons/add-task/urgent.svg"
						alt="urgent symbol" />
				</button>
				<button
					id="medium-btn-edit"
					class="prio-box prio-unset"
					onclick="changePriorityEdit('medium')">
					Medium
					<img
						id="img-medium-edit"
						src="./assets/img/icons/add-task/medium-white.svg"
						alt="medium symbol" />
				</button>
				<button
					id="low-btn-edit"
					class="prio-box prio-unset"
					onclick="changePriorityEdit('low')">
					Low
					<img
						id="img-low-edit"
						src="./assets/img/icons/add-task/low.svg"
						alt="low symbol" />
				</button>
			</div>
		</div>

		<!-- assign to -->
		<div class="assign-to-cont">
			<span>Assigned to</span>
			<div
				id="assigned-to"
				class="field-width-height borders input-borders assigned-to"
				onclick="openAndCloseDropDownToAssign()">
				<input
					name="select-contact"
					type="text"
					class="border-none"
					id="dropdownInput"
					placeholder="Select contacts to assign"
					onkeyup="filterContactsToAssignEdit(), onlyOpenDropDownToAssign()" />
				<img
					id="arrowImg"
					src="./assets/img/icons/add-task/arrow-down.svg"
					alt="Arrow down icon" />
			</div>
			<div
				class="dropdown-content dropdown-content-small btn-borders dropdown-content-style"
				id="dropdownContent">
				<div id="labels"></div>
			</div>
			<div id="initialsOfAssigned"></div>
		</div>

		<!-- Subtasks -->
		<div class="subtask-cont">
			<span>Subtasks</span>
			<div class="field-width-height-small input-borders subtasks">
				<input
					id="input-of-subtask"
					class="border-none"
					type="text"
					placeholder="Add new subtasks"
					onfocus="showSubtaskInput()" />
				<img
					onclick="showSubtaskInput()"
					src="./assets/img/icons/add-task/plus.svg"
					alt="plus"
					class="add-subtask-btn" />
				<img
					onclick="clearSubtaskInput()"
					src="./assets/img/icons/add-task/close.svg"
					alt="cancel" />

				<img
					class="subtask-input-spacer"
					src="./assets/img/icons/add-task/edit-btn-spacer.svg"
					alt="spacer" />

				<img
					onclick="createSubtask()"
					class="accept-subtask-btn"
					src="./assets/img/icons/add-task/done.svg"
					alt="done" />
			</div>
			<div id="show-subtasks-container"></div>
		</div>
	</div>
</div>
<div class="ok-btn-cont btn-span-img-ctn">
	<button class="btn-borders btn-create" onclick="exchangeEditedTask()">
		OK <img src="./assets/img/icons/add-task/check.svg" alt="check" />
	</button>
</div>
`;
}

/**
 * Generates HTML markup for editing a contact in the edit task modal.
 * Iterates through the contacts assigned to the task and creates
 * a checkbox input to select each contact for editing.
 */
function showContactsToEditHTML(i, element) {
	return /*html*/ `
    <div id="edit-single-contact${i}" class="edit-single-contact" onclick="getAssignedContactsEdit()">
      <label for="edit-option${i}" class="label-layout">
        <input
          type="checkbox"
          class="custom-checkbox"
          id="edit-option${i}"
          value="${element['userData']['name']}"
          onchange="changeCheckboxColorEdit(${i})"
        />
        ${element['userData']['name']}
      </label>
      <br />
      ${createContactInitials(element)}
    </div>`;
}

/**
 * Generates HTML markup for displaying a subtask in the edit task modal.
 *
 * @param {string} listItemId - The unique identifier for the subtask list item.
 * @param {Object} subtask - The subtask object containing the name of the subtask.
 * @param {number} index - The index of the subtask in the list of subtasks.
 * @returns {string} The HTML markup for the subtask list item.
 */
function showSubtasksToEditHTML(listItemId, subtask, index) {
	return /*html*/ `
    <div class="subtask-list-container">
      <li 
        id="${listItemId}" 
        class="subtask-list-item">
          <input 
            readonly 
            type="text" 
            value="${subtask.name}">
      </li>
      <div class="edit-delete-container">
        <img 
          id="edit-button${index}" 
          onclick="correctSubtask(${index})" 
          src="assets/img/icons/add-task/edit.svg" alt="edit">
        <img 
          src="assets/img/icons/add-task/edit-btn-spacer.svg" 
          alt="spacer">
        <img 
          onclick="deleteSubtask(${index})" 
          src="assets/img/icons/add-task/delete.svg" 
          alt="delete">
      </div>
    </div>
      `;
}
