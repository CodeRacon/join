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
	try {
		return fetch(STORAGE_URL, {
			method: 'POST',
			body: JSON.stringify(payload),
		}).then((res) => res.json());
	} catch {
		console.log('Could not set Item');
	}
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

// async function storeTemplateData(templateData) {
// 	try {
// 		await setItem('templateData', JSON.stringify(templateData));
// 		console.log('Template data stored successfully.');
// 	} catch (error) {
// 		console.error('Error storing template data:', error);
// 	}
// }

// async function setEmptyCredentials() {
// 	await setItem('allUserCredentials', JSON.stringify({}));
// }

/**
 * Gets template data from remote storage.
 *
 * Tries to retrieve a JSON string with key 'templateData' from remote storage.
 * Parses and returns the data if found. Throws an error if not found.
 */
async function getTemplateData() {
	try {
		const templateDataString = await getItem('templateData');
		return JSON.parse(templateDataString);
	} catch (error) {
		console.error('Error retrieving template data:', error);
		return null;
	}
}

let localUserData = [];
let isGuestUser = false;

/**
 * Logs in a guest user by retrieving template data from storage and setting local user data and guest flag.
 * Redirects to summary page on success, or logs error on failure.
 */
async function guestLogin() {
	const templateData = await getTemplateData();
	if (templateData) {
		localUserData = templateData;
		isGuestUser = true;
		console.log('Guest login successful.');
		console.log(localUserData);
		window.location.href = 'summary.html';
	} else {
		console.error('Failed to retrieve template data for guest login.');
	}
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
		console.log('Anmeldung erfolgreich. Benutzer-ID:', userID);
		await loadUserData(userID);
		// Benutzer als angemeldet markieren
		localStorage.setItem('loggedInUser', userID);
		// Weiterleitung zu summary-page
		window.location.href = 'summary.html';
	} else {
		blinkAnimation('login');
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
	console.log(remoteUserDataKey, localUserData);

	if (!savedData) {
		localUserData = JSON.parse(remoteUserData);
	} else {
		localUserData = JSON.parse(savedData);
	}
}

/**
 * Saves the edited local user data to local storage.
 */
function saveUserData() {
	localStorage.setItem('changedData', JSON.stringify(localUserData));

	console.log('Saved changed data');
}
