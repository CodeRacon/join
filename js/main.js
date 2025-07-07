let hexColors = [
	'#b83c3c',
	'#00BEE8',
	'#1FD7C1',
	'#6E52FF',
	'#9747FF',
	'#A6C063',
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
	'#00B155',
	'#85FF00',
	'#FFD100',
	'#FFC300',
	'#FF00E1',
	'#FF0091',
	'#0077FF',
	'#00A6FF',
	'#FF6A00',
	'#FF8A00',
	'#FF0038',
	'#FF005E',
	'#006AFF',
	'#00B8AB',
];

let isLoggingOut = false;

/**
 * Chooses a random color from the hexColors array.
 * Used to generate a random color when creating a new contact.
 */
function chooseRandomColor() {
	const randomIndex = Math.floor(Math.random() * hexColors.length);
	return hexColors[randomIndex];
}

/**
 * Gets the ID of the currently logged in user from local storage.
 *
 * Returns the ID of the logged in user stored in localStorage, or null if no user is logged in.
 */
function getLoggedInUserID() {
	return localStorage.getItem('loggedInUser');
}

/**
 * Initializes the page by loading user data and including HTML.
 * Gets the ID of the logged in user from local storage, checks if they are a guest user,
 * loads their data, includes additional HTML files, sets their initials on the page
 * and highlights the correct nav link.
 */
async function initPage() {
	const userID = getLoggedInUserID();
	const loggedInUser = localStorage.getItem('loggedInUser');
	isGuestUser = loggedInUser === 'guest';
	await loadUserData(userID);
	await includeHTML();
	setUserInitials();
	highlightNavLink();
}

/**
 * Initializes the info page by loading additional HTML files, changing frames on new tabs,
 * highlighting external links, and handling resize events.
 */
async function initInfoPage() {
	await includeHTML();
	changeFrameOnNewTab();
	highlightExternalLink();
	const screenWidth = window.innerWidth;
	if (screenWidth <= 767) {
		setForSmallScreens();
		highlightMobileExtLinks();
	}
	window.addEventListener('resize', () => {
		if (window.innerWidth <= 767) {
			toggleFooterLinks();
		}
	});
}

/**
 * Sets the user's initials in the UI.
 *
 * Gets the logged in user data, extracts the first letter of each word in the user's
 * name, joins them into initials, and sets the initials in the UI element with id 'user-initials'.
 * Handles setting a default 'G' initial for guest users.
 */
function setUserInitials() {
	const userInitials = document.getElementById('user-initials');
	const loggedInUser = getLoggedInUser();
	const processedInitials = loggedInUser.userData.name
		.split(' ')
		.map((word) => word.charAt(0))
		.join('')
		.toUpperCase();
	if (isGuestUser === true) {
		userInitials.innerHTML = 'G';
	} else {
		userInitials.innerHTML = processedInitials;
	}
}

/**
 * Gets the logged in user from the local user data.
 *
 * Filters the local user data array to find the user where isLoggedIn is true,
 * and returns the first logged in user object.
 */
function getLoggedInUser() {
	const loggedInUsers = localUserData.users.filter(
		(user) => user.isLoggedIn === true
	);
	return loggedInUsers[0];
}

/**
 * Asynchronously fetches HTML snippets and includes them in the page.
 *
 * It looks for elements with the 'w3-include-html' attribute,
 * fetches the file specified in that attribute, and replaces the innerHTML
 * of the element with the fetched HTML.
 *
 * If the fetch fails, it sets the innerHTML to an error message instead.
 */
async function includeHTML() {
	let includeElements = document.querySelectorAll('[w3-include-html]');
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		file = element.getAttribute('w3-include-html');
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = 'Page not found';
		}
	}
}

/**
 * Navigates to the previous page in the browser history.
 */
function goBack() {
	window.history.back();
}

/**
 * Highlights the navigation link corresponding to the
 * current page.
 *
 * Loops through all navigation links and compares their
 * href to the current page URL. If they match, it adds
 * the 'visited' class to highlight the link.
 */
function highlightNavLink() {
	const currentUrl = window.location.pathname;
	const navLinks = getNavLinks();
	navLinks.forEach((navLink) => {
		const href = navLink.getAttribute('href');
		if (currentUrl === href) {
			navLink.classList.add('visited');
		} else {
			navLink.classList.remove('visited');
		}
	});
}

/**
 * Highlights the mobile external links in the footer
 * based on the current page.
 *
 * Checks the current page URL against the privacy policy
 * and legal notice page URLs. If there is a match, it
 * highlights the corresponding link by adding a 'visited'
 * class.
 */
function highlightMobileExtLinks() {
	const currentUrl = window.location.pathname;
	const extPrivacyLink = document.getElementById('mobile-privacy-link');
	const extLegalLink = document.getElementById('mobile-legal-link');
	if (currentUrl.includes('privacy_policy')) {
		extPrivacyLink.classList.add('visited');
		extLegalLink.classList.remove('visited');
	}
	if (currentUrl.includes('legal_notice')) {
		extLegalLink.classList.add('visited');
		extPrivacyLink.classList.remove('visited');
	}
}

/**
 * Gets the navigation links that should be highlighted
 * based on the current viewport.
 *
 * On mobile, returns the mobile navigation links.
 * On desktop, returns the desktop side navigation links.
 */
function getNavLinks() {
	const desktopLinks = document.querySelectorAll('#side-nav a');
	const mobileLinks = document.querySelectorAll('#mobile-nav a');
	const asideDisplay = getComputedStyle(
		document.querySelector('aside')
	).display;
	if (asideDisplay === 'none') {
		return mobileLinks;
	} else {
		return desktopLinks;
	}
}

/**
 * Toggles the visibility of the side navigation and header icons
 * when the privacy policy or legal notice pages are loaded.
 * This hides the side nav and header icons on those pages since they are
 * standalone legal pages.
 */
function changeFrameOnNewTab() {
	console.log('changed frame on new tab');
	const sideNav = document.getElementById('side-nav');
	const headerIcons = document.getElementById('corner-icons');
	const quickmenu = document.getElementById('quickmenu');
	const currentUrl = window.location.href;
	console.log(currentUrl);
	if (currentUrl.includes('legal') || currentUrl.includes('privacy')) {
		sideNav.classList.toggle('hidden');
		headerIcons.classList.toggle('hidden');
		quickmenu.classList.toggle('hidden');
	}
}

/**
 * Opens the given URL in a new tab, unless the current page is
 * the privacy policy or legal notice. For those pages, refresh
 * current page instead  of opening a new tab.
 */
function openExternalLink(url) {
	const currentUrl = window.location.pathname;
	const privacyUrl = '/privacy_policy.html';
	const legalNoticeUrl = '/legal_notice.html';
	if (currentUrl !== privacyUrl && currentUrl !== legalNoticeUrl) {
		window.open(url);
	} else if (currentUrl === privacyUrl) {
		closeQuickMenu();
		window.location.href = url;
	} else if (currentUrl === legalNoticeUrl) {
		closeQuickMenu();
		window.location.href = url;
	}
}

/**
 * Highlights the given links only on the external tab
 * if the current page URL contains the link text.
 * For example, highlights the "Privacy" link if the
 * current page URL contains "privacy".
 */
function highlightExternalLink() {
	const url = window.location.href;
	const privacyLink = document.getElementById('privacy-link');
	const legalLink = document.getElementById('legal-link');
	if (url.includes('privacy')) {
		privacyLink.classList.add('visited');
	} else if (url.includes('legal')) {
		legalLink.classList.add('visited');
	}
}

/**
 * Toggles footer links between small and large screen layouts.
 * Checks window width on resize and calls appropriate function.
 */
function toggleFooterLinks() {
	const screenWidth = window.innerWidth;
	if (screenWidth <= 767) {
		setForSmallScreens();
	} else {
		setForLargeScreens();
	}
}

/**
 * Toggles the visibility of the quick menu element. Checks if the element
 * already has the "d-none" class applied and calls the appropriate function
 * to open or close the menu.
 */
function toggleQuickMenu() {
	const quickMenu = document.getElementById('quickmenu');
	if (quickMenu.classList.contains('d-none')) {
		openQuickMenu();
	} else {
		closeQuickMenu();
	}
}

/**
 * Opens the quick menu by replacing the menu class and toggling display after a short delay.
 */
function openQuickMenu() {
	const quickMenu = document.getElementById('quickmenu');
	quickMenu.classList.replace('qm-off', 'qm-on');
	setTimeout(() => {
		quickMenu.classList.toggle('d-none');
	}, 125);
}

/**
 * Closes the quick menu by replacing the menu class and toggling display after a short delay.
 */
function closeQuickMenu() {
	const quickMenu = document.getElementById('quickmenu');
	quickMenu.classList.replace('qm-on', 'qm-off');
	setTimeout(() => {
		quickMenu.classList.toggle('d-none');
	}, 125);
}

/**
 * Sets the mobile navigation links for small screens.
 * Clears the mobile nav element and populates it with
 * privacy policy and legal notice links.
 */
function setForSmallScreens() {
	const mobileNav = document.getElementById('mobile-nav');
	mobileNav.innerHTML = '';
	mobileNav.innerHTML = /*html*/ `
  <div class="pp-ln">
    <a id="mobile-privacy-link" onclick="openExternalLink('/privacy_policy.html')"
      >Privacy Policy
    </a>
    <a id="mobile-legal-link" onclick="openExternalLink('/legal_notice.html')"
      >Legal Notice
    </a>
  </div>
  `;
}

/**
 * Sets the footer navigation links for large screens.
 * Clears the mobile nav element and populates it with
 * summary, add task, board, and contacts links.
 */
function setForLargeScreens() {
	const mobileNav = document.getElementById('mobile-nav');
	mobileNav.innerHTML = '';
	mobileNav.innerHTML = /*html*/ `  
  <nav id="mobile-nav">
    <a href="/summary.html" class="mobile-nav-summary" id="mobile-nav-summary">
      <div class="mobile-summary-icon"></div>
      <p>Summary</p>
    </a>
    <a
      href="/add_task.html"
      class="mobile-nav-add-task"
      id="mobile-nav-add-task">
      <div class="mobile-add-task-icon"></div>
      <p>Add Task</p>
    </a>
    <a href="/board.html" class="mobile-nav-board" id="mobile-nav-board">
      <div class="mobile-board-icon"></div>
      <p>Board</p>
    </a>
    <a
      href="/contacts.html"
      class="mobile-nav-contacts"
      id="mobile-nav-contacts">
      <div class="mobile-contacts-icon"></div>
      <p>Contacts</p>
    </a>
  </nav>
  `;
}

/**
 * Logs out the current user and redirects them to the index page.
 * If the user is a guest user, their local data is cleared.
 * If the user is a registered user, their local data is synced with the remote data
 * before clearing the local storage and redirecting to the index page.
 */
async function logoutUser() {
	isLoggingOut = true;
	
	if (isGuestUser === true) {
		localStorage.clear();
		localUserData = [];
	} else {
		const userID = getLoggedInUserID();
		await syncLocalUserDataWithRemote(userID);
		clearLocalStorage();
		localUserData = [];
	}
	isGuestUser = false;
	window.location.href = './index.html';
}

/**
 * Synchronizes the local user data with the remote user data for the specified user ID.
 * This function saves the local user data to the remote storage using the provided user ID.
 *
 * @param {string} userID - The ID of the user whose data should be synchronized.
 * @returns {Promise<void>} A Promise that resolves when the synchronization is complete.
 */
async function syncLocalUserDataWithRemote(userID) {
	const remoteUserDataKey = 'remoteUserData_' + userID;
	await setItem(remoteUserDataKey, JSON.stringify(localUserData));
}

window.addEventListener('beforeunload', syncDataBeforeUnload);

async function syncDataBeforeUnload(event) {
	if (isGuestUser === false && !isLoggingOut) {
		const userID = getLoggedInUserID();
		await syncLocalUserDataWithRemote(userID);
	}
}

/**
 * Clears all items from the local storage, except for the "rememberMePassword" and "rememberMeEmail" keys.
 */
function clearLocalStorage() {
	const keysToKeep = ['rememberMePassword', 'rememberMeEmail'];

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);

		if (!keysToKeep.includes(key)) {
			localStorage.removeItem(key);
		}
	}
}
