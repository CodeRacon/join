/**
 * Renders the contact list by formatting the contacts,
 * then inserting dividers and list items into the DOM.
 */
function renderContactList() {
	formattedContactList = formatContactList(contacts);
	const contactList = document.getElementById('contact-list');
	contactList.innerHTML = '';
	contactList.innerHTML = renderAddContactBtn();
	for (let i = 0; i < formattedContactList.length; i++) {
		const listEntry = formattedContactList[i];
		if (listEntry.type === 'divider') {
			contactList.innerHTML += renderDivider(listEntry);
		} else {
			contactList.innerHTML += renderListItem(listEntry, i);
		}
	}
}

/**
 * Renders the contact info box with details for the contact at the given index.
 * Gets the contact data from the formatted contact list.
 * Renders the contact's initials and info box HTML.
 * @param {number} i - The index of the contact in the formatted contact list.
 */
function renderContactInfoBox(i) {
	const contactInfoBox = document.getElementById('contact-info-box');
	const listEntry = formattedContactList[i];
	const initials = listEntry.userData.name
		.replace(/ \(You\)$/, '')
		.split(' ')
		.map((word) => word.charAt(0))
		.join('');
	if (listEntry.type !== 'divider') {
		contactInfoBox.innerHTML = contactInfoBoxHTML(listEntry, initials, i);
	}
}

/**
 * Renders the add contact button in the contacts list UI.
 *
 * @returns {string} The HTML markup for the add contact button.
 */
function renderAddContactBtn() {
	return /*html*/ `
    <div class="spacer">
      <div
        onclick="openAddContactDB()"
        id="add-contact-btn"
        class="add-contact-btn">
        <span>Add Contact</span>
        <img src="/assets/img/icons/contacts/add_contact-white.svg" />
      </div>
    </div>
    <div 
      onclick="openAddContactDB()"
      class="mobile-add-contct-btn">
      <img src="/assets/img/icons/contacts/add_contact-white.svg" alt="" />
    </div>
  `;
}

/**
 * Renders a divider element for the contact list with the given letter.
 *
 * @param {Object} listEntry - The divider data including letter property.
 * @returns {string} The HTML markup for the divider.
 */
function renderDivider(listEntry) {
	return /*html*/ `
    <div class="divider">
      <p>${listEntry.letter}</p>        
    </div>
  `;
}

/**
 * Renders a list item for a contact in the contact list.
 *
 * @param {Object} listEntry - The contact data to render.
 * @returns {string} The HTML markup for the list item.
 */
function renderListItem(listEntry, i) {
	const initials = listEntry.userData.name
		.replace(/ \(You\)$/, '')
		.split(' ')
		.map((word) => word.charAt(0))
		.join('');
	return /*html*/ `
    <div 
      id="contact-list-item-${i}" 
      class="contact-list-item" 
      onclick="openContact(${i})" >
      <div 
        id="list-item-icon"
        class="list-item-icon"  
        style="background-color: ${listEntry.color}">
        ${initials}
      </div>
      <div class="list-item-info">
        <p>${listEntry.userData.name}</p>
        <p >${listEntry.userData.email}</p>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML for the contact info box popup
 * based on the provided contact list entry and initials.
 *
 * @param {Object} listEntry - The contact list entry object
 * @param {string} initials - The contact's initials
 * @returns {string} The HTML string for the info box
 */
function contactInfoBoxHTML(listEntry, initials, i) {
	return /*html*/ `
    <div class="user-label">
      <div class="user-icon" style="background-color: ${listEntry.color}">
        ${initials}
      </div>
      <div class="user-name">
        <span>${listEntry.userData.name}</span>
        <div class="edit-user-info">
          <div
            id="edit-contact-btn-${i}"
            class="edit"
            onclick="openEditContactDB(${i})">
            <img src="/assets/img/icons/contacts/edit_contact.svg" alt="" />
          </div>
          <div
            id="delete-contact-btn"
            class="delete"
            onclick="deleteAtContactInfoBox(${i})">
            <img src="/assets/img/icons/contacts/delete_contact.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="sub-heading">Contact Information</div>
    <div class="mail-info">
      <p class="bold">Email</p>
      <a href="mailto:${listEntry.userData.email} ">
        ${listEntry.userData.email}
      </a>
    </div>
    <div class="phone-info">
      <p class="bold">Phone</p>
      <p>${listEntry.userData.phone}</p>
    </div>
    <div
      id="edit-menu"
      class="edit-user-menu d-none em-off">
      <div class="img-wrapper" onclick="openEditContactDB(${i})">
        <img src="/assets/img/icons/contacts/edit_contact.svg" alt="" />
      </div>
      <div class="img-wrapper" onclick="deleteAtContactInfoBox(${i})">
        <img src="/assets/img/icons/contacts/delete_contact.svg" />
      </div>
    </div>
    <div 
      class="edit-user-btn-mobile" 
      id="edit-user-btn" 
      onclick="toggleMobileEditMenu()">
        <img src="/assets/img/icons/contacts/more_vert.svg" />
    </div>
  `;
}

/**
 * Updates the user icon in the Edit Contacts dialogue box
 * by setting the inner HTML to the user's initials,
 * and the background color to the user's color.
 */
function updateUserIconInDB(i) {
	const userIcon = document.getElementById('edit-contact-user-icon');
	const initials = formattedContactList[i].userData.name
		.replace(/ \(You\)$/, '')
		.split(' ')
		.map((word) => word.charAt(0))
		.join('');
	userIcon.innerHTML = /*html*/ `
    <span>${initials}</span>
  `;
	userIcon.style.backgroundColor = formattedContactList[i].color;
}
