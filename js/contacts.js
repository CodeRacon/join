let contacts = [];
let formattedContactList = [];

let currentContact;

async function initContacts() {
  // storeStartData();
  setMobileLayout();
  await loadUserData();
  contacts = localUserData.contacts;
  renderContactList();
}

function setMobileLayout() {
  const screenWidth = window.innerWidth;
  const contactDetails = document.getElementById('contact-details');
  if (screenWidth <= 607) {
    contactDetails.classList.add('d-none');
  }
}

function findIndexInContacts(wantedIndex) {
  return contacts.findIndex((contact) => {
    return contact === wantedIndex;
  });
}

function findIndexInFormattedList(wantedIndex) {
  return formattedContactList.findIndex((contact) => {
    return contact === wantedIndex;
  });
}

/**
 * Sorts the given array of contact objects alphabetically by name.
 * Modifies the contacts array in place.
 */
function sortContacts(contacts) {
  contacts.sort((a, b) => a.userData.name.localeCompare(b.userData.name));
}

/**
 * The function formats a contact list by sorting the contacts alphabetically and adding dividers to
 * separate contacts starting with different letters.
 * @param contacts - An array of contact objects. Each contact object has a "name" property which
 * represents the name of the contact.
 * @returns a sorted and formatted contact list.
 */
function formatContactList(contacts) {
  sortContacts(contacts);

  formattedContactList = [];
  let currentLetter = '';

  contacts.forEach((contact) => {
    const capFirstLetter = contact.userData.name.charAt(0).toUpperCase();

    if (capFirstLetter !== currentLetter) {
      formattedContactList.push({ type: 'divider', letter: capFirstLetter });
      currentLetter = capFirstLetter;
    }
    formattedContactList.push(contact);
  });
  return formattedContactList;
}

formattedContactList = formatContactList(contacts);

/**
 * Renders the contact list by formatting the contacts,
 * then inserting dividers and list items into the DOM.
 */
function renderContactList() {
  formattedContactList = formatContactList(contacts);

  // const formattedContactList = formatContactList(contacts);
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
 * Opens the contact info box for the contact at the given index.
 * Toggles the 'selected' class on the contact list item.
 * If selected, closes the info box.
 * If not selected, opens the info box and renders the contact details.
 */
function openContact(i) {
  const contactItem = document.getElementById(`contact-list-item-${i}`);
  if (contactItem.classList.contains('selected') || !contactItem) {
    closeContactInfoBox(i);
  } else {
    showContactInfoBoxMobile();
    swipeInContactInfoBox(i);
    selectListItems(i);
    renderContactInfoBox(i);
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
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');

  if (listEntry.type !== 'divider') {
    contactInfoBox.innerHTML = contactInfoBoxHTML(listEntry, initials, i);
  }
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

window.addEventListener('resize', () => {
  const screenWidth = window.innerWidth;
  const contactDetails = document.getElementById('contact-details');
  if (screenWidth <= 607) {
    contactDetails.classList.add('d-none');
  } else {
    contactDetails.classList.remove('d-none');
  }
});

/**
 * Shows the contact info popup by adding the 'slide-in' class and removing
 * the 'd-none' class after a 125ms delay. It also adds the 'selected' class
 * to the clicked contact list item, and removes 'selected' from all other
 * list items after a 125ms delay.
 *
 * @param {number} i - The index of the clicked contact list item
 */
function swipeInContactInfoBox() {
  const contactInfoBox = document.getElementById('contact-info-box');

  contactInfoBox.classList.remove('slide-in', 'd-none');
  setTimeout(() => {
    contactInfoBox.classList.add('slide-in');
  }, 0);
}

function selectListItems(i) {
  const contactItem = document.getElementById(`contact-list-item-${i}`);
  const allContactItems = document.querySelectorAll('.contact-list-item');
  setTimeout(() => {
    allContactItems.forEach((item) => item.classList.remove('selected'));
    contactItem.classList.toggle('selected');
  }, 125);
}

function showContactInfoBoxMobile() {
  const contactDetails = document.getElementById('contact-details');
  const contactInfoBox = document.getElementById('contact-info-box');
  const screenWidth = window.innerWidth;
  if (screenWidth <= 607) {
    contactDetails.classList.remove('d-none');
    contactInfoBox.classList.remove('d-none');
  }
}

function leaveMobileContactInfoBox() {
  const contactDetails = document.getElementById('contact-details');
  const contactInfoBox = document.getElementById('contact-info-box');
  const allContactItems = document.querySelectorAll('.contact-list-item');
  allContactItems.forEach((item) => item.classList.remove('selected'));
  contactDetails.classList.add('d-none');
  contactInfoBox.classList.add('d-none');
  scrollNewContactToTop(1);
}

/**
 * Closes the contact info popup by removing the 'slide-in' class and adding
 * the 'd-none' class. It also removes the 'selected' class from the
 * clicked contact list item.
 *
 * @param {number} i - The index of the clicked contact list item
 */
function closeContactInfoBox(i) {
  const contactInfoBox = document.getElementById('contact-info-box');
  const contactItem = document.getElementById(`contact-list-item-${i}`);
  if (contactItem) {
    contactItem.classList.toggle('selected');
    contactInfoBox.classList.add('d-none');
  } else if (!contactItem) {
    contactInfoBox.classList.add('d-none');
  }
}

let menuOpen = false;

function handleClickOutside(event) {
  const editMenu = document.getElementById('edit-menu');
  if (!editMenu.contains(event.target)) {
    closeMobileEditMenu();
  }
}

function toggleMobileEditMenu() {
  menuOpen = !menuOpen;
  if (menuOpen) {
    openMobileEditMenu();
    document.addEventListener('click', handleClickOutside);
  } else {
    closeMobileEditMenu();
    document.removeEventListener('click', handleClickOutside);
  }
}

function openMobileEditMenu() {
  const editMenu = document.getElementById('edit-menu');
  const editMenuBtn = document.getElementById('edit-user-btn');
  const bodyElement = document.getElementById('contacts-body');
  if (editMenu.classList.contains('d-none')) {
    editMenu.classList.replace('em-off', 'em-on');
    setTimeout(() => {
      editMenu.classList.toggle('d-none');
      editMenuBtn.classList.toggle('d-none');
      bodyElement.classList.add('menu-open');
    }, 125);
  }
}

function closeMobileEditMenu() {
  const editMenu = document.getElementById('edit-menu');
  const editMenuBtn = document.getElementById('edit-user-btn');
  const bodyElement = document.getElementById('contacts-body');
  if (!editMenu.classList.contains('d-none')) {
    editMenu.classList.replace('em-on', 'em-off');
    setTimeout(() => {
      editMenu.classList.toggle('d-none');
      editMenuBtn.classList.toggle('d-none');
      bodyElement.classList.remove('menu-open');
    }, 125);
    menuOpen = false;
  }
}

/**
 * Opens the add contact popup by removing the 'd-none' class from the
 * add contact box and overlay elements. It then replaces the
 * 'box-slide-out' class with 'box-slide-in' on the add contact box,
 * and replaces the 'overlay-off' class with 'overlay-on' on the overlay.
 */
function openAddContactDB() {
  const overlay = document.getElementById('overlay');
  const addContactBox = document.getElementById('add-contact-db');

  addContactBox.classList.remove('d-none');
  addContactBox.classList.replace('box-slide-out', 'box-slide-in');
  overlay.classList.remove('d-none');
  overlay.classList.replace('overlay-off', 'overlay-on');
  resetErrorFeedback('add');
  resetErrorMessage('add');
}

/**
 * Closes the add contact popup by sliding it out, turning off
 * the overlay, and then hiding the popup and overlay after
 * a 350ms delay.
 */
function closeAddContactDB() {
  const contactName = document.getElementById('add-contact-name');
  const contactEmail = document.getElementById('add-contact-email');
  const contactPhone = document.getElementById('add-contact-phone');
  const overlay = document.getElementById('overlay');
  const addContactBox = document.getElementById('add-contact-db');
  contactName.value = '';
  contactEmail.value = '';
  contactPhone.value = '';
  addContactBox.classList.replace('box-slide-in', 'box-slide-out');
  overlay.classList.replace('overlay-on', 'overlay-off');
  setTimeout(() => {
    addContactBox.classList.add('d-none');
    overlay.classList.add('d-none');
  }, 350);
}

/**
 * Creates a new contact by getting the name, email, and phone values
 * from the add contact popup form. Generates a random color, creates
 * a contact object, adds it to the contacts array, updates the
 * formatted contact list, gets the new contact's index, renders the
 * updated contact list, closes the add contact popup, opens the new
 * contact's info, and shows a success message.
 */
function createContact() {
  let contactName = document.getElementById('add-contact-name').value;
  let contactEmail = document.getElementById('add-contact-email').value;
  let contactPhone = document.getElementById('add-contact-phone').value;
  const contactColor = chooseRandomColor();
  const newContact = {
    userData: {
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
    },
    color: contactColor,
  };
  contacts.push(newContact);
  formattedContactList = formatContactList(contacts);
  const newContactIndex = findIndexInFormattedList(newContact);
  saveUserData();
  scrollNewContactToTop(newContactIndex);
  renderContactList();
  closeAddContactDB();
  setTimeout(() => {
    openNewContactInfo(newContactIndex);
  }, 150);
  setTimeout(() => {
    showContactSuccess();
  }, 300);
}

/**
 * Chooses a random color from the hexColors array.
 * Used to generate a random color when creating a new contact.
 */
function chooseRandomColor() {
  const randomIndex = Math.floor(Math.random() * hexColors.length);
  return hexColors[randomIndex];
}

/**
 * Scrolls the new contact to the top of the contact list view.
 *
 * @param {number} newContactIndex - The index of the new contact to scroll to.
 */
function scrollNewContactToTop(newContactIndex) {
  let topSpacing;
  const screenWidth = window.innerWidth;
  if (screenWidth <= 607) {
    topSpacing = 264;
  } else {
    topSpacing = 106;
  }
  setTimeout(() => {
    const contactList = document.getElementById('contact-list');
    contactList.scrollTop =
      document.getElementById(`contact-list-item-${newContactIndex}`)
        .offsetTop - topSpacing;
  }, 0);
}

/**
 * Opens the contact info for a new contact.
 *
 * @param {number} newContactIndex - The index of the new contact to open.
 */
function openNewContactInfo(newContactIndex) {
  openContact(newContactIndex);
}

/**
 * Toggles the visibility of the contact success message box, animates it sliding in,
 * then sliding out after a delay. Handles toggling the 'd-none' class to hide/show the box,
 * and swapping the 'slide-in' and 'slide-out' classes to animate the slide effect.
 */
function showContactSuccess() {
  const successBox = document.getElementById('contact-success');
  successBox.classList.toggle('d-none');
  successBox.classList.replace('slide-out', 'slide-in');
  setTimeout(() => {
    successBox.classList.replace('slide-in', 'slide-out');
  }, 2000);
  setTimeout(() => {
    successBox.classList.toggle('d-none');
  }, 2150);
}
/**
 * Opens the edit contact overlay with the contact info for the contact at the given index pre-populated.
 * Handles setting the current contact, showing the overlay and edit contact box, and pre-filling the form.
 *
 * @param {number} i - The index of the contact to edit
 */

function openEditContactDB(i) {
  currentContact = formattedContactList[i];
  const overlay = document.getElementById('overlay');
  const editContactBox = document.getElementById('edit-contact-db');
  const contactName = document.getElementById('edit-contact-name');
  const contactEmail = document.getElementById('edit-contact-email');
  const contactPhone = document.getElementById('edit-contact-phone');
  contactName.value = currentContact.userData.name;
  contactEmail.value = currentContact.userData.email;
  contactPhone.value = currentContact.userData.phone;
  editContactBox.classList.remove('d-none');
  editContactBox.classList.replace('box-slide-out', 'box-slide-in');
  overlay.classList.remove('d-none');
  overlay.classList.replace('overlay-off', 'overlay-on');
  updateUserIconInDB(i);
  resetErrorFeedback('edit');
  resetErrorMessage('edit');
  setTimeout(() => {
    closeMobileEditMenu();
  }, 250);
}

/**
 * Closes the edit contact overlay by clearing the form fields, sliding the
 * overlay and edit contact box out, and hiding them after the animation.
 */
function closeEditContactDB() {
  const contactName = document.getElementById('edit-contact-name');
  const contactEmail = document.getElementById('edit-contact-email');
  const contactPhone = document.getElementById('edit-contact-phone');
  const overlay = document.getElementById('overlay');
  const editContactBox = document.getElementById('edit-contact-db');
  contactName.value = '';
  contactEmail.value = '';
  contactPhone.value = '';
  editContactBox.classList.replace('box-slide-in', 'box-slide-out');
  overlay.classList.replace('overlay-on', 'overlay-off');
  setTimeout(() => {
    editContactBox.classList.add('d-none');
    overlay.classList.add('d-none');
  }, 350);
}

function updateUserIconInDB(i) {
  const userIcon = document.getElementById('edit-contact-user-icon');
  const initials = formattedContactList[i].userData.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');
  userIcon.innerHTML = /*html*/ `
    <span>${initials}</span>
  `;
  userIcon.style.backgroundColor = formattedContactList[i].color;
}

/**
 * Edits the contact info for the currently selected contact.
 * Finds the contact index, updates the name/email/phone with values from the edit contact form,
 * updates the contacts list and formatted list, closes edit overlay, renders updated list,
 * and opens the updated contact's info box.
 */
function editContact() {
  const contactIndex = findIndexInContacts(currentContact);
  const updatedName = document.getElementById('edit-contact-name').value;
  const updatedEmail = document.getElementById('edit-contact-email').value;
  const updatedPhone = document.getElementById('edit-contact-phone').value;
  contacts[contactIndex].userData.name = updatedName;
  contacts[contactIndex].userData.email = updatedEmail;
  contacts[contactIndex].userData.phone = updatedPhone;
  formattedContactList = formatContactList(contacts);
  const updatedContactIndex = findIndexInFormattedList(currentContact);
  saveUserData();
  renderContactList();
  closeEditContactDB();
  setTimeout(() => {
    openNewContactInfo(updatedContactIndex);
  }, 150);
}

/**
 * Deletes the contact at the given index from the contacts array.
 * Removes the contact info box, updates the contacts array and
 * formatted contact list, re-renders the contact list, and closes
 * the edit contact overlay.
 */
function deleteAtContactInfoBox(i) {
  currentContact = formattedContactList[i];
  const contactIndex = findIndexInContacts(currentContact);
  contacts.splice(contactIndex, 1);
  formattedContactList = formatContactList(contacts);
  saveUserData();
  console.log('contact deleted', contactIndex);
  closeContactInfoBox(contactIndex);
  renderContactList();
  leaveMobileContactInfoBox();
}

/**
 * Deletes the contact at the given index from the contacts array.
 * Removes the contact info box, updates the contacts array and
 * formatted contact list, re-renders the contact list, and closes
 * the edit contact overlay.
 */
function deleteContact() {
  const contactIndex = findIndexInContacts(currentContact);
  contacts.splice(contactIndex, 1);
  formattedContactList = formatContactList(contacts);
  console.log('contact deleted', contactIndex);
  saveUserData();
  closeContactInfoBox(contactIndex);
  renderContactList();
  closeEditContactDB();
}

/**
 * Closes the currently open dialogue box for editing or adding a contact.
 * Checks if the edit contact box or add contact box is open, and closes
 * the appropriate one.
 */
function closeDialogueBox() {
  const editContactBox = document.getElementById('edit-contact-db');
  const addContactBox = document.getElementById('add-contact-db');
  if (editContactBox.classList.contains('d-none')) {
    closeAddContactDB();
  } else if (addContactBox.classList.contains('d-none')) {
    closeEditContactDB();
  }
}

/**
 * Validates the form for adding or editing a contact.
 * Checks if name, email, and phone are valid.
 * If valid, calls createContact() or editContact() depending
 * which form is been validated.
 * Returns false if validation fails.
 */
function validateForm(identifier) {
  const isValidName = validateName(identifier);
  const isValidEmail = validateEmail(identifier);
  const isValidPhone = validatePhone(identifier);
  if (isValidName && isValidEmail && isValidPhone) {
    if (identifier === 'add') {
      createContact();
    } else if (identifier === 'edit') {
      editContact();
    }
  }
  return false;
}

/**
 * Validates the contact name input field.
 * Checks if the name matches the required pattern and is not empty.
 * Adds/removes error class on input container and displays error message if invalid.
 * Returns true if valid, false if invalid.
 */
function validateName(identifier) {
  const nameInputCont = document.getElementById('input--name-' + identifier);
  const inputName = document.getElementById(identifier + '-contact-name');
  const nameError = document.getElementById('name-error-' + identifier);
  const validNamePattern = /^[a-zA-Z-]+ [a-zA-Z-]+ ?[a-zA-Z-]+?$/;
  if (
    !validNamePattern.test(inputName.value) ||
    inputName.value.trim() === ''
  ) {
    nameInputCont.classList.add('invalid');
    nameError.textContent = '*Please enter first- and surname.';
    return false;
  } else {
    nameInputCont.classList.remove('invalid');
    nameError.textContent = '';
    return true;
  }
}

/**
 * Validates the email input field.
 * Checks if email is in valid format and not empty.
 * Adds/removes error class on input container and displays error message if invalid.
 * Returns true if valid, false if invalid.
 */
function validateEmail(identifier) {
  const emailInputCont = document.getElementById('input--email-' + identifier);
  const inputEmail = document.getElementById(identifier + '-contact-email');
  const emailError = document.getElementById('mail-error-' + identifier);
  if (!inputEmail.value.includes('@') || inputEmail.value.trim() === '') {
    emailInputCont.classList.add('invalid');
    emailError.textContent = '*Please enter a valid email address.';
    return false;
  } else {
    emailInputCont.classList.remove('invalid');
    emailError.textContent = '';
    return true;
  }
}

/**
 * Validates the phone number input field.
 * Checks if the phone number contains only digits and is not empty.
 * Adds/removes error class on input container and displays error message if invalid.
 * Returns true if valid, false if invalid.
 */
function validatePhone(identifier) {
  const phoneInputCont = document.getElementById('input--phone-' + identifier);
  const inputPhone = document.getElementById(identifier + '-contact-phone');
  const phoneError = document.getElementById('phone-error-' + identifier);
  if (/[a-zA-Z]/.test(inputPhone.value) || inputPhone.value.trim() === '') {
    phoneInputCont.classList.add('invalid');
    phoneError.textContent = '*Please enter a valid phone number.';
    return false;
  } else {
    phoneInputCont.classList.remove('invalid');
    phoneError.textContent = '';
    return true;
  }
}

/**
 * Removes any invalid error styling from the name, email, and phone input
 * containers for the contact form depending on the given identifier.
 */
function resetErrorFeedback(identifier) {
  const nameInputCont = document.getElementById('input--name-' + identifier);
  const emailInputCont = document.getElementById('input--email-' + identifier);
  const phoneInputCont = document.getElementById('input--phone-' + identifier);
  nameInputCont.classList.remove('invalid');
  emailInputCont.classList.remove('invalid');
  phoneInputCont.classList.remove('invalid');
}

/**
 * Removes any error messages from the name, email, and phone
 * elements for the contact form depending on the given identifier.
 */
function resetErrorMessage(identifier) {
  const nameError = document.getElementById('name-error-' + identifier);
  const emailError = document.getElementById('mail-error-' + identifier);
  const phoneError = document.getElementById('phone-error-' + identifier);
  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
}
