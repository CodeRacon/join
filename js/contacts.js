/**
 * Array of hex color values used for contacts and task-categories
 */
let hexColors = [
  '#0038FF',
  '#00BEE8',
  '#1FD7C1',
  '#6E52FF',
  '#9747FF',
  '#C3FF2B',
  '#FC71FF',
  '#FF4646',
  '#FF5EB3',
  '#FF745E',
  '#FF7A00',
  '#FFA35E',
  '#FFBB2B',
  '#FFC701',
  '#FFE62B',
  '#00FF9D',
  '#00FFD5',
  '#85FF00',
  '#FFD100',
  '#FFC300',
  '#FF00E1',
  '#FF0091',
  '#0077FF',
  '#00FFFB',
  '#FF6A00',
  '#FF8A00',
  '#FF0038',
  '#FF005E',
  '#006AFF',
  '#00FFEC',
];

contacts = [
  {
    name: 'Kamilla Morgentau',
    phone: '(741) 762-6527',
    email: 'k.morgentau@gmail.com',
    color: '#0038FF',
  },
  {
    name: 'Gerd Förster',
    phone: '(606) 200-4805',
    email: 'g.foerster86@gmail.com',
    color: '#00BEE8',
  },
  {
    name: 'Bernd Steinemann',
    phone: '(606) 659-4325',
    email: 'steinemann83@mail.com',
    color: '#1FD7C1',
  },
  {
    name: 'Sophia Kostas',
    phone: '(264) 911-2395',
    email: 's.kostas84@mail.com',
    color: '#6E52FF',
  },
  {
    name: 'Ahmed Al-Farsi',
    phone: '(353) 365-9874',
    email: 'a.alfarsi89@mail.com',
    color: '#9747FF',
  },
  {
    name: 'Lindsay Orn',
    phone: '(079) 862-6516',
    email: 'lorn99@mail.com',
    color: '#687fc4',
  },
  {
    name: 'Annetta Grant',
    phone: '(778) 560-8034',
    email: 'a.grant@mail.com',
    color: '#FC71FF',
  },
  {
    name: 'Henna Yilmaz',
    phone: '(494) 694-8019',
    email: 'h.yilmaz79@gmail.com',
    color: '#FF4646',
  },
  {
    name: 'Joey Kub',
    phone: '(227) 955-4546',
    email: 'jokub74@mail.com',
    color: '#FF5EB3',
  },
  {
    name: 'Pascale Feeney',
    phone: '(830) 099-6852',
    email: 'pas.feeney@mail.com',
    color: '#FF745E',
  },
  {
    name: 'Lea Stamm',
    phone: '(004) 386-7068',
    email: 'lea.stamm98@gmail.com',
    color: '#FF7A00',
  },
  {
    name: 'Tess Moore',
    phone: '(549) 753-7594',
    email: 't.moore99@gmail.com',
    color: '#FFA35E',
  },
  {
    name: 'Jazmyn Tremblay',
    phone: '(866) 844-0133',
    email: 'j.tremblay92@mail.com',
    color: '#FFBB2B',
  },
  {
    name: 'George Kozey',
    phone: '(176) 842-2961',
    email: 'ge-ko@mail.com',
    color: '#FFC701',
  },
  {
    name: 'Hasan Demir',
    phone: '(733) 649-6102',
    email: 'hasan.demir81@mail.com',
    color: '#9c8900',
  },
  {
    name: 'Kjelt Becker',
    phone: '(484) 742-4202',
    email: 'k.becker@gmail.com',
    color: '#61c39d',
  },
  {
    name: 'Gene Ward',
    phone: '(876) 110-8650',
    email: 'g.ward@gmail.com',
    color: '#1dab93',
  },
  {
    name: 'Mike Skinner',
    phone: '(758) 519-1073',
    email: 'm.skinner89@gmail.com',
    color: '#659c2b',
  },
];

/**
 * Sorts the given array of contact objects alphabetically by name.
 * Modifies the contacts array in place.
 */
function sortContacts(contacts) {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
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

  let formattedContactList = [];
  let currentLetter = '';

  contacts.forEach((contact) => {
    const capFirstLetter = contact.name.charAt(0).toUpperCase();

    if (capFirstLetter !== currentLetter) {
      formattedContactList.push({ type: 'divider', letter: capFirstLetter });
      currentLetter = capFirstLetter;
    }
    formattedContactList.push(contact);
  });
  return formattedContactList;
}

const formattedContactList = formatContactList(contacts);

// console.log(formattedContactList);

/**
 * Renders the contact list by formatting the contacts,
 * then inserting dividers and list items into the DOM.
 */
function renderContactList() {
  const formattedContactList = formatContactList(contacts);
  let contactList = document.getElementById('contact-list');
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
     <div 
      onclick="openAddContactDB()"
      id="add-contact-btn" 
      class="add-contact-btn">
      <span>Add Contact</span>
      <img src="/assets/img/icons/contacts/add_contact-white.svg" />
    </div>
    <div class="spacer"></div>
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
  const initials = listEntry.name
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
        <p>${listEntry.name}</p>
        <p class="accentuated">${listEntry.email}</p>
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

  if (contactItem.classList.contains('selected')) {
    closeContactInfoBox(i);
  } else {
    swipeInContactInfoBox(i);
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
  const initials = listEntry.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');

  if (listEntry.type !== 'divider') {
    contactInfoBox.innerHTML = contactInfoBoxHTML(listEntry, initials);
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
function contactInfoBoxHTML(listEntry, initials) {
  return /*html*/ `
    <div class="user-label">
            <div class="user-icon" style="background-color: ${listEntry.color}" >
              ${initials}
            </div>
            <div class="user-name">
              <span>${listEntry.name}</span>
              <div class="edit-user-info">
                <div class="edit">
                  <img
                    src="/assets/img/icons/contacts/edit_contact.svg"
                    alt="" />
                </div>
                <div class="delete">
                  <img src="/assets/img/icons/contacts/delete_contact.svg"/>
                     
                </div>
              </div>
            </div>
          </div>
          <div class="sub-heading">Contact Information</div>
          <div class="mail-info">
            <p class="bold">Email</p>
            <a class="accentuated" href="mailto:${listEntry.email} ">
              ${listEntry.email}
            </a>
          </div>
          <div class="phone-info">
            <p class="bold">Phone</p>
            <p>${listEntry.phone}</p>
          </div>
  `;
}

/**
 * Shows the contact info popup by adding the 'swipe-in' class and removing
 * the 'd-none' class after a 125ms delay. It also adds the 'selected' class
 * to the clicked contact list item, and removes 'selected' from all other
 * list items after a 125ms delay.
 *
 * @param {number} i - The index of the clicked contact list item
 */
function swipeInContactInfoBox(i) {
  const contactInfoBox = document.getElementById('contact-info-box');
  const contactItem = document.getElementById(`contact-list-item-${i}`);
  const allContactItems = document.querySelectorAll('.contact-list-item');

  contactInfoBox.classList.remove('swipe-in', 'd-none');
  setTimeout(() => {
    contactInfoBox.classList.add('swipe-in');
  }, 125);

  setTimeout(() => {
    allContactItems.forEach((item) => item.classList.remove('selected'));
    contactItem.classList.toggle('selected');
  }, 125);
}

/**
 * Closes the contact info popup by removing the 'swipe-in' class and adding
 * the 'd-none' class. It also removes the 'selected' class from the
 * clicked contact list item.
 *
 * @param {number} i - The index of the clicked contact list item
 */
function closeContactInfoBox(i) {
  const contactInfoBox = document.getElementById('contact-info-box');
  const contactItem = document.getElementById(`contact-list-item-${i}`);

  contactInfoBox.classList.add('d-none');
  contactItem.classList.toggle('selected');
}

/**
 * Opens the add contact popup by removing the 'd-none' class from the
 * add contact box and overlay elements. It then replaces the
 * 'box-slide-out' class with 'box-slide-in' on the add contact box,
 * and replaces the 'overlay-off' class with 'overlay-on' on the overlay.
 */
function openAddContactDB() {
  const addContactBtn = document.getElementById('add-contact-btn');
  const overlay = document.getElementById('overlay');
  const addContactBox = document.getElementById('add-contact-db');

  addContactBox.classList.remove('d-none');
  addContactBox.classList.replace('box-slide-out', 'box-slide-in');
  overlay.classList.remove('d-none');
  overlay.classList.replace('overlay-off', 'overlay-on');
}

/**
 * Closes the add contact popup by sliding it out, turning off
 * the overlay, and then hiding the popup and overlay after
 * a 350ms delay.
 */
function closeAddContactDB() {
  const addContactBtn = document.getElementById('add-contact-btn');
  const overlay = document.getElementById('overlay');
  const addContactBox = document.getElementById('add-contact-db');

  addContactBox.classList.replace('box-slide-in', 'box-slide-out');
  overlay.classList.replace('overlay-on', 'overlay-off');
  setTimeout(() => {
    addContactBox.classList.add('d-none');
    overlay.classList.add('d-none');
  }, 350);
}
