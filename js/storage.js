const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M';

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
 * local copy of the startData-array template in remoteStorage.
 */
let localUserData = [];
let isGuestUser = true;

/**
 * Loads user data from local storage if it exists, otherwise retrieves default data from remote storage.
 * Parses the loaded data as JSON before assigning to localUserData.
 */
async function loadUserData() {
	const savedData = localStorage.getItem('changedData');
	if (!savedData) {
		localUserData = JSON.parse(await getItem('startData'));
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

async function loadUsers() {
	try {
		startData = JSON.parse(await getItem('startData'));
		console.log(startData);
	} catch (e) {
		console.error('Loading error:', e);
	}
}

let loggedInData = [];

async function loadLoggedInData(){
    try {
		loggedInData = JSON.parse(await getItem('loggedInData'));
		console.log(loggedInData);
	} catch (e) {
		console.error('Loading error:', e);
	}
}

async function  storeLoggedInData() {
     await setItem('loggedInData', JSON.stringify(loggedInData));
}
