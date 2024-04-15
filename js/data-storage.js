const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'XQBTX32OP6AMU3264N0RRJTPMEBERH5Y728TDW5P';

/**
 * Sets an item in remote storage.
 *
 * @param {string} key - The key of the item to set
 * @param {any} value - The value of the item
 * @returns {Promise} A promise resolving to the stored item
 */
async function setItem(key, value) {
	const payload = { key, value, token: STORAGE_TOKEN };
	return fetch(STORAGE_URL, {
		method: 'POST',
		body: JSON.stringify(payload),
	}).then((res) => res.json());
}

/**
 * Gets an item from remote storage.
 *
 * @param {string} key - The key of the item to get
 * @returns {Promise} A promise resolving to the stored item value or rejection if not found
 */
async function getItem(key) {
	const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
	return fetch(url)
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				return res.data.value;
			}
			throw `Could not find data with key "${key}".`;
		});
}

/**
 * Stores templateData item in remote storage initially.
 *
 * @param {Object} templateData - The template data to store
 */
async function storeTemplateData(templateData) {
	try {
		await setItem('templateData', JSON.stringify(templateData));
		console.log('Template data stored successfully.');
	} catch (error) {
		console.error('Error storing template data:', error);
	}
}

/**
 * Sets the allUserCredentials item initially in remote storage to an empty object.
 */
async function setEmptyCredentials() {
	await setItem('allUserCredentials', JSON.stringify({}));
}

/**
 * Gets template data from remote storage.
 *
 * Tries to retrieve a JSON string with key 'templateData' from remote storage.
 * Parses and returns the data if found. Throws an error if not found.
 */
async function getTemplateData() {
	const templateDataString = await getItem('templateData');
	return JSON.parse(templateDataString);
}

let localUserData = [];
let isGuestUser = false;

/**
 * Logs in a guest user by retrieving template data from storage and setting localUserData and guest flag.
 * Redirects to summary page on success, or logs error on failure.
 */
async function guestLogin() {
	const templateData = await getTemplateData();
	localUserData = templateData;
	isGuestUser = true;
	window.location.href = 'summary.html';
}

/**
 * Logs a user in with their email and password.
 * Authenticates the user and loads their data if authentication succeeds.
 * Stores the user ID in local storage and redirects to the summary page.
 * Blinks the login element if authentication fails.
 */
async function login(email, password) {
	const userID = await authenticateUser(email, password);
	if (userID) {
		await loadUserData(userID);
		localStorage.setItem('loggedInUser', userID);
		window.location.href = 'summary.html';
	} else {
		blinkAnimation('login');
		noUserFoundFeedback();
	}
}

/**
 * Gets the user ID for a user by their email and password credentials.
 *
 * Searches the cached allUserCredentials object for a matching user
 * where the email and password match the provided credentials. Returns
 * the user ID if found, or null if no match is found.
 *
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {string|null} The user ID if credentials match, else null
 */
async function getUserIDByCredentials(email, password) {
	const allUserCredentials = await getItem('allUserCredentials');
	if (allUserCredentials) {
		const parsedUserCredentials = JSON.parse(allUserCredentials);
		for (const userID in parsedUserCredentials) {
			const userCredentials = parsedUserCredentials[userID];
			if (
				userCredentials.email === email &&
				userCredentials.password === password
			) {
				return userID;
			}
		}
	}
	return null;
}

/**
 * Authenticates a user by their email and password credentials.
 * Looks up the user ID from the cached credentials by calling
 * getUserIDByCredentials(). Returns the user ID as a string if
 * authentication succeeds, otherwise returns null.
 */
async function authenticateUser(email, password) {
	const userID = await getUserIDByCredentials(email, password);
	if (userID) {
		return userID.toString();
	}
	return null;
}

/**
 * Loads user data for the given user ID by retrieving it from localStorage and remote storage.
 *
 * Checks localStorage for previously saved changed data using the user ID as a key. Also retrieves
 * the latest data for the user from remote storage using a generated key. Returns a merged data
 * object, preferring locally saved changes over the remote data if both exist.
 *
 * @param {string} userID - The ID of the user to load data for
 * @returns {Object} The loaded user data object
 */
async function loadUserData(userID) {
	const savedData = localStorage.getItem('changedData');
	const remoteUserDataKey = 'remoteUserData_' + userID;
	const remoteUserData = await getItem(remoteUserDataKey);
	if (!savedData) {
		localUserData = JSON.parse(remoteUserData);
	} else {
		localUserData = JSON.parse(savedData);
	}
}

/**
 * Saves the edited localUserData to local storage.
 */
function saveUserData() {
	localStorage.setItem('changedData', JSON.stringify(localUserData));
}

/**
 * Checks if the user has previously saved their email and password in the browser's local storage, and if so, populates the login form with those values and checks the "Remember Me" checkbox.
 * This function is executed when the page loads, and is used to provide a convenient login experience for returning users.
 */
function checkForRememberedLogin() {
	let storedEmail = localStorage.getItem('rememberMeEmail');
	let storedPassword = localStorage.getItem('rememberMePassword');
	let checkBox = document.getElementById('login-checkbox');
	if (storedEmail && storedPassword) {
		document.getElementById('login-email').value = storedEmail;
		document.getElementById('login-password').value = storedPassword;
		checkBox.checked = true;
	}
}

/**
 * Saves the user's email and password in the browser's local storage if the "Remember Me" checkbox is checked.
 * If the checkbox is not checked, removes any previously saved email and password from local storage.
 */
function saveLoginDetails() {
	let email = document.getElementById('login-email').value.trim();
	let password = document.getElementById('login-password').value.trim();
	let checkBox = document.getElementById('login-checkbox');
	if (email !== '' && password !== '' && checkBox.checked) {
		localStorage.setItem('rememberMeEmail', email);
		localStorage.setItem('rememberMePassword', password);
	} else {
		checkBox.checked = false;
		localStorage.removeItem('rememberMeEmail');
		localStorage.removeItem('rememberMePassword');
	}
}
