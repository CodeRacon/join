/**
 * Generates the HTML for a single contact element to be displayed in the contacts list.
 *
 * @param {number} i - The index of the contact in the list.
 * @param {object} element - The contact object containing the user data.
 * @returns {string} The HTML string for the single contact element.
 */
function showContactsToAssignHTML(i, element) {
  return /*html*/ `
    <div id="single-contact${i}" class="single-contact" onclick="getAssignedContacts()">
      <label for="option${i}" class="label-layout">
        <input
          type="checkbox"
          class="custom-checkbox"
          id="option${i}"
          value="${element["userData"]["name"]}"
          onchange="changeCheckboxColor(${i})"
        />
          ${element["userData"]["name"]}
          ${createContactInitials(element)}
      </label>
      <br />
   
    </div>
	`;
}

/**
 * Generates the HTML for a single contact element to be displayed in the contacts list.
 *
 * @param {number} i - The index of the contact in the list.
 * @param {object} element - The contact object containing the user data.
 * @returns {string} The HTML string for the single contact element.
 */
function filterContactsToAssignHTML(i, element) {
  return /*html*/ `
    <div id="single-contact${i}" class="single-contact" onclick="getAssignedContacts()">
      <label for="option${i}" class="label-layout">
        <input
          type="checkbox"
          class="custom-checkbox"
          id="option${i}"
          value="${element["userData"]["name"]}"
          onchange="changeCheckboxColor(${i})"
        />
        ${element["userData"]["name"]}
      </label>
      <br />
      ${createContactInitials(element)}
    </div>
  `;
}

function showCreatedSubtaskHTML(listItemId, element, i) {
  return /*html*/ `		
    <div class="subtask-list-container">
      <li 
        class="subtask-list-item" 
        id="${listItemId}">
          <input 
            readonly 
            type="text"   
            value="${element}">
      </li>
      <div class="edit-delete-container">
        <img 
          id="edit-button${i}" 
          onclick="correctSubtask(${i})" 
          src="assets/img/icons/add-task/edit.svg" 
          alt="edit">
        <img 
          src="assets/img/icons/add-task/edit-btn-spacer.svg" 
          alt="spacer">
        <img 
          onclick="deleteSubtask(${i})" 
          src="assets/img/icons/add-task/delete.svg" 
          alt="delete">
      </div>
    </div>
  `;
}

function showInitialsOfAssignedHTML(color, initials) {
  return /*html*/ `
    <div 
      class="initialsCyrcle"
      style="background-color: ${color}">
        ${initials}
    </div>
  `;
}
