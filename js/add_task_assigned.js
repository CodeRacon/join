/**
 * Toggles opening and closing the dropdown content element
 * by changing its display style and rotating the arrow image.
 */
function openAndCloseDropDownToAssign() {
  const dropdownContent = document.getElementById("dropdownContent");
  const assignedTo = document.getElementById("assigned-to");
  const img = document.getElementById("arrowImg");
  if (dropdownContent.style.display !== "block") {
    dropdownContent.style.display = "block";
    dropdownContent.classList.add("onfocus");
    assignedTo.classList.add("onfocus");
    img.style.transform = "rotate(180deg)";
  } else {
    dropdownContent.style.display = "none";
    dropdownContent.classList.remove("onfocus");
    assignedTo.classList.remove("onfocus");
    img.style.transform = "rotate(0deg)";
  }
}

/**
 * Opens the dropdown content element
 * by changing its display style and adjusting the arrow image.
 * Only performs this action if dropdown is currently closed.
 */
function onlyOpenDropDownToAssign() {
  const dropdownContent = document.getElementById("dropdownContent");
  const img = document.getElementById("arrowImg");
  const assignedTo = document.getElementById("assigned-to");
  if (dropdownContent.style.display !== "block") {
    dropdownContent.style.display = "block";
    dropdownContent.classList.add("onfocus");
    assignedTo.classList.add("onfocus");
    img.style.transform = "rotate(180deg)";
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
  const dropdownContent = document.getElementById("dropdownContent");
  const img = document.getElementById("arrowImg");
  const assignedTo = document.getElementById("assigned-to");
  if (dropdownContent.style.display !== "block") {
    return;
  } else {
    dropdownContent.style.display = "none";
    dropdownContent.classList.remove("onfocus");
    assignedTo.classList.remove("onfocus");
    img.style.transform = "rotate(0deg)";
  }
}

/**
 * Displays a list of available contacts as checkboxes
 * by populating the 'labels' element with a checkbox input
 * for each contact in the 'contacts' array in localUserData.
 * Adds click handler to get assigned contacts when checkbox is clicked.
 */
function showContactsToAssign() {
  let content = document.getElementById("labels");
  content.innerHTML = "";
  for (let i = 0; i < localUserData["contacts"].length; i++) {
    const element = localUserData["contacts"][i];
    content.innerHTML += showContactsToAssignHTML(i, element);
  }
}

/**
 * Filters the list of contacts displayed in the "Assign To" dropdown based on the
 * input value in the search field. Contacts whose name includes the input value
 * will be shown, while the rest will be hidden.
 * If the input field is empty, the full list of contacts will be displayed.
 */
function filterContactsToAssign() {
  let input = document.getElementById("dropdownInput").value.toLowerCase();
  let contacts = localUserData.contacts;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const contactName = contact.userData.name.toLowerCase();
    const option = document.getElementById(`single-contact${i}`);
    if (contactName.includes(input)) {
      option.classList.remove("d-none");
    } else {
      option.classList.add("d-none");
    }
  }
}

/**
 * Toggles the 'checked-assigned-to' class on the contact container
 * when the contact checkbox is checked/unchecked. This highlights
 * the contact visually when it is assigned to the task.
 */
function changeCheckboxColor(i) {
  let checkbox = document.getElementById(`option${i}`);
  let input = document.getElementById(`dropdownInput`);
  let container = document.getElementById(`single-contact${i}`);
  if (checkbox.checked) {
    container.classList.add("checked-assigned-to");
  } else {
    container.classList.remove("checked-assigned-to");
  }
  input.value = "";
  filterContactsToAssign();
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
    .replace(/ \(You\)$/, "")
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
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
  let options = document.getElementsByClassName("single-contact");
  for (let i = 0; i < options.length; i++) {
    const checkbox = options[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      let option = options[i].querySelector("label");
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
  let content = document.getElementById("initialsOfAssigned");
  content.innerHTML = "";
  for (let i = 0; i < newAssignedContacts.length; i++) {
    const assignedContact = newAssignedContacts[i];
    const initials = assignedContact
      .replace(/ \(You\)$/, "")
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
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
  let container = document.getElementById("initialsOfAssigned");
  let options = document.getElementsByClassName("single-contact");
  for (let i = 0; i < options.length; i++) {
    const checkbox = options[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      let option = options[i].querySelector("label");
      option.checked = false;
    }
    container.innerHTML = "";
  }
}
