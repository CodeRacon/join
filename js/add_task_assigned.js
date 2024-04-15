/**
 * Toggles opening and closing the dropdown content element
 * by changing its display style and rotating the arrow image.
 */
function openAndCloseDropDownToAssign() {
	const dropdownContent = document.getElementById('dropdownContent');
	const assignedTo = document.getElementById('assigned-to');
	const img = document.getElementById('arrowImg');
	if (dropdownContent.style.display !== 'block') {
		dropdownContent.style.display = 'block';
		dropdownContent.classList.add('onfocus');
		assignedTo.classList.add('onfocus');
		img.style.transform = 'rotate(180deg)';
	} else {
		dropdownContent.style.display = 'none';
		dropdownContent.classList.remove('onfocus');
		assignedTo.classList.remove('onfocus');
		img.style.transform = 'rotate(0deg)';
	}
}

/**
 * Opens the dropdown content element
 * by changing its display style and adjusting the arrow image.
 * Only performs this action if dropdown is currently closed.
 */
function onlyOpenDropDownToAssign() {
	const dropdownContent = document.getElementById('dropdownContent');
	const img = document.getElementById('arrowImg');
	const assignedTo = document.getElementById('assigned-to');
	if (dropdownContent.style.display !== 'block') {
		dropdownContent.style.display = 'block';
		dropdownContent.classList.add('onfocus');
		assignedTo.classList.add('onfocus');
		img.style.transform = 'rotate(180deg)';
	} else {
		return;
	}
}

/**
 * Closes the dropdown content element
 * by changing its display style to 'none'
 * and rotating the arrow image back to default state.
 * Only performs this action if dropdown is currently open.
 */
function onlyCloseDropDownToAssign() {
	const dropdownContent = document.getElementById('dropdownContent');
	const img = document.getElementById('arrowImg');
	const assignedTo = document.getElementById('assigned-to');
	if (dropdownContent.style.display !== 'block') {
		return;
	} else {
		dropdownContent.style.display = 'none';
		dropdownContent.classList.remove('onfocus');
		assignedTo.classList.remove('onfocus');
		img.style.transform = 'rotate(0deg)';
	}
}

/**
 * Displays a list of available contacts as checkboxes
 * by populating the 'labels' element with a checkbox input
 * for each contact in the 'contacts' array in localUserData.
 * Adds click handler to get assigned contacts when checkbox is clicked.
 */
function showContactsToAssign() {
	let content = document.getElementById('labels');
	content.innerHTML = '';
	for (let i = 0; i < localUserData['contacts'].length; i++) {
		const element = localUserData['contacts'][i];
		content.innerHTML += showContactsToAssignHTML(i, element);
	}
}

/**
 * Filters the contacts to show in the dropdown menu based on the input text.
 * Matches contacts whose name includes the input text (case insensitive).
 * Shows the matched contacts by generating HTML for each one.
 * If no input, shows all contacts.
 * If no matches, shows nothing.
 */
function filterContactsToAssign() {
	let input = document.getElementById('dropdownInput').value.toLowerCase();
	let content = document.getElementById('dropdownContent');
	content.innerHTML = '';
	let contacts = localUserData.contacts;
	let matchedContacts = contacts.filter((contact) => {
		return contact.userData.name.toLowerCase().includes(input);
	});
	for (let i = 0; i < matchedContacts.length; i++) {
		const element = matchedContacts[i];
		content.innerHTML += filterContactsToAssignHTML(i, element);
	}
	if (input == '') {
		content.innerHTML = /*html*/ `
              <div id="labels"></div>
          `;
		showContactsToAssign();
	}
	if (matchedContacts == 0) {
		return;
	}
}

/**
 * Toggles the 'checked-assigned-to' class on the contact container
 * when the contact checkbox is checked/unchecked. This highlights
 * the contact visually when it is assigned to the task.
 */
function changeCheckboxColor(i) {
	let checkbox = document.getElementById(`option${i}`);
	let container = document.getElementById(`single-contact${i}`);
	if (checkbox.checked) {
		container.classList.add('checked-assigned-to');
	} else {
		container.classList.remove('checked-assigned-to');
	}
}

/**
 * Creates a string of initials from the given contact's name,
 * and returns HTML markup for displaying the initials in a colored circle.
 *
 * @param {Object} element - The contact object
 * @returns {string} The HTML markup for the initials circle
 */
function createContactInitials(element) {
	const initials = element.userData.name
		.replace(/ \(You\)$/, '')
		.split(' ')
		.map((word) => word.charAt(0))
		.join('');
	return /*html*/ `
		<div 
			class="initialsCyrcle"
			style="background-color: ${element.color}">
				${initials}
		</div>
	`;
}

/**
 * Gets the selected contacts from the contact checkboxes
 * and stores the names in the newAssignedContacts array.
 * Calls showInitialsOfAssigned() to update display.
 */
function getAssignedContacts() {
	newAssignedContacts = [];
	let options = document.getElementsByClassName('single-contact');
	for (let i = 0; i < options.length; i++) {
		const checkbox = options[i].querySelector('input[type="checkbox"]');
		if (checkbox.checked) {
			let option = options[i].querySelector('label');
			let name = option.textContent.trim();
			newAssignedContacts.push(name);
		}
	}
	showInitialsOfAssigned();
}

/**
 * Updates the DOM to show the initials of the currently
 * assigned contacts in colored circles. Initials are
 * generated from the contact names and matched to colors
 * from the local user data.
 */
function showInitialsOfAssigned() {
	let content = document.getElementById('initialsOfAssigned');
	content.innerHTML = '';
	for (let i = 0; i < newAssignedContacts.length; i++) {
		const assignedContact = newAssignedContacts[i];
		const initials = assignedContact
			.replace(/ \(You\)$/, '')
			.split(' ')
			.map((word) => word.charAt(0))
			.join('');
		let user = localUserData.contacts.find(
			(user) => user.userData.name === assignedContact
		);
		if (user) {
			let color = user.color;
			content.innerHTML += showInitialsOfAssignedHTML(color, initials);
		}
	}
}

/**
 * Resets the assigned contacts by clearing any checked
 * checkboxes and removing contacts from the assignedContacts
 * array.
 */
function resetAssignedContacts() {
	assignedContacts = [];
	let options = document.getElementsByClassName('single-contact');
	for (let i = 0; i < options.length; i++) {
		const checkbox = options[i].querySelector('input[type="checkbox"]');
		if (checkbox.checked) {
			let option = options[i].querySelector('label');
			option.checked = false;
		}
	}
	showInitialsOfAssigned();
}
