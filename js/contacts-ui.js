/**
 * Sets the mobile layout by hiding the contact details section if the
 * screen width is less than or equal to 607px.
 */
function setMobileLayout() {
  const screenWidth = window.innerWidth;
  const contactDetails = document.getElementById('contact-details');
  if (screenWidth <= 607) {
    contactDetails.classList.add('d-none');
  }
}

/**
 * hides or shows the contact details element
 * based on the window width, to hide/show it responsively.
 */
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

/**
 * Shows the contact info on mobile by removing the
 * 'd-none' class from the contact details and info box elements
 * if the screen width is less than or equal to 607px.
 */
function showContactInfoBoxMobile() {
  const contactDetails = document.getElementById('contact-details');
  const contactInfoBox = document.getElementById('contact-info-box');
  const screenWidth = window.innerWidth;
  if (screenWidth <= 607) {
    contactDetails.classList.remove('d-none');
    contactInfoBox.classList.remove('d-none');
  }
}

/**
 * Hides the contact info popup on mobile by adding the 'd-none' class back
 * to the contact details and info box elements, removing 'selected' from
 * all contact list items, and scrolling the new contact back to the top.
 * This is called when the user closes the popup by clicking the overlay.
 */
function leaveMobileContactInfoBox() {
  const contactDetails = document.getElementById('contact-details');
  const contactInfoBox = document.getElementById('contact-info-box');
  const allContactItems = document.querySelectorAll('.contact-list-item');
  allContactItems.forEach((item) => item.classList.remove('selected'));
  contactDetails.classList.add('d-none');
  contactInfoBox.classList.add('d-none');
  scrollNewContactToTop(1);
}

let menuOpen = false;

/**
 * Closes the mobile edit menu if the user clicks outside of it.
 * Checks if the click target is not contained within the edit menu element,
 * and if so, calls closeMobileEditMenu().
 *
 * @param {Event} event - The click event
 */
function handleClickOutside(event) {
  const editMenu = document.getElementById('edit-menu');
  if (!editMenu.contains(event.target)) {
    closeMobileEditMenu();
  }
}

/**
 * Toggles the mobile edit menu open/closed.
 * Opens the menu, adds a click handler to close on outside click,
 * closes the menu, and removes the click handler.
 * Handles menuOpen state.
 */
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

/**
 * Opens the mobile edit menu by:
 * - Removing the 'd-none' class and adding the 'em-on' class on the menu
 * - Adding a small timeout before toggling the 'd-none' class again to trigger
 *   the CSS transition animation
 * - Toggling the 'd-none' class on the edit button and body element
 *
 * This handles the initial opening transition animation of the mobile edit menu.
 */
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

/**
 * Closes the mobile edit menu by:
 * - Replacing the 'em-on' class with 'em-off' on the menu
 * - Adding a small timeout before toggling the 'd-none' class again to trigger
 *   the CSS transition animation
 * - Toggling the 'd-none' class on the edit button and body element
 * - Setting menuOpen to false
 *
 * This handles the closing transition animation of the mobile edit menu.
 */
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
  resetEditUI();
}

/**
 * Resets the edit contact UI after editing is complete.
 * Clears any error feedback and messages, then also closes
 * the mobile edit menu after a small delay.
 */
function resetEditUI() {
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
