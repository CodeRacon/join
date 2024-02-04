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
    <div class="add-contact">
          <span>Add Contact</span>
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

function openContact(i) {
  const contactItem = document.getElementById(`contact-list-item-${i}`);
  const allContactItems = document.querySelectorAll('.contact-list-item');

  setTimeout(() => {
    allContactItems.forEach((item) => item.classList.remove('selected'));
    contactItem.classList.toggle('selected');
  }, 325);
}
