let contacts = [];
let formattedContactList = [];
let currentContact;

/**
 * Initializes the contacts page by setting the layout, loading user data,
 * populating the contacts array, and rendering the contact list.
 */
async function initContacts() {
  // storeStartData();
  setMobileLayout();
  await loadUserData();
  contacts = localUserData.contacts;
  renderContactList();
}

/**
 * Searches through the contacts array to find the index of the
 * contact that matches the provided wantedIndex.
 *
 * @param {*} wantedIndex - The contact object to search for
 * @returns {number} The index of the matching contact, or -1 if not found
 */
function findIndexInContacts(wantedIndex) {
  return contacts.findIndex((contact) => {
    return contact === wantedIndex;
  });
}

/**
 * Searches through the formattedContactList array to find the index of the
 * contact that matches the provided wantedIndex.
 *
 * @param {*} wantedIndex - The contact object to search for
 * @returns {number} The index of the matching contact, or -1 if not found
 */
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
 * Toggles the 'selected' class on the contact list item at the given index,
 * and removes 'selected' from all other list items after a short delay.
 *
 * @param {number} i - The index of the contact list item to select
 */
function selectListItems(i) {
  const contactItem = document.getElementById(`contact-list-item-${i}`);
  const allContactItems = document.querySelectorAll('.contact-list-item');
  setTimeout(() => {
    allContactItems.forEach((item) => item.classList.remove('selected'));
    contactItem.classList.toggle('selected');
  }, 125);
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
  createContactAftermath(newContactIndex);
}

/**
 * Performs actions after a new contact is created:
 * - Saves user data
 * - Scrolls new contact to top of list
 * - Renders updated contact list
 * - Closes add contact popup
 * - Waits 150ms, then opens new contact info
 * - Waits 300ms, then shows success message
 */
function createContactAftermath(newContactIndex) {
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
  saveUserData();
  closeContactInfoBox(contactIndex);
  renderContactList();
  closeEditContactDB();
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
 * Checks if the phone number contains only digits and is at least 9 digits long.
 * Adds/removes error class on input container and displays error message if invalid.
 * Returns true if valid, false if invalid.
 */
function validatePhone(identifier) {
  const phoneInputCont = document.getElementById('input--phone-' + identifier);
  const inputPhone = document.getElementById(identifier + '-contact-phone');
  const phoneError = document.getElementById('phone-error-' + identifier);
  if (
    /^[a-zA-Z]+$/.test(inputPhone.value) ||
    inputPhone.value.trim().length < 9
  ) {
    phoneInputCont.classList.add('invalid');
    phoneError.textContent =
      '*Please enter a valid phone number with at least 9 digits.';
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
