let nextUserID = 1;

/**
 * Generates a unique user ID string by combining a timestamp, random string and prefix.
 *
 * @returns {string} - The generated unique user ID
 */
function generateUserID() {
	const timestamp = Date.now().toString(36); // Aktuelle Zeitstempel als Basis für die userID
	const randomString = Math.random().toString(36).substring(2, 7); // Zufälliger String für Eindeutigkeit
	const userID = `user_${timestamp}_${randomString}`;

	return userID;
}

// Beispiel-Format für remoteUserData:
// remoteUserData_user_1n6x0zx_3xf5;

/**
 * Creates remote user data for a new user and saves it to local storage.
 *
 * Generates a unique user ID, copies template data, assigns user details like name,
 * email and randomly generated color. Saves user and contact objects to arrays
 * in remote user data. Stringifies and saves remote user data to local storage
 * with a key based on user ID. Also creates user credentials for login.
 *
 * @param {string} userID - Unique ID for the new user
 * @param {string} email - Email address of the new user
 * @param {string} password - Password for the new user
 * @param {string} name - Name of the new user
 *
 * @returns {Object} remoteUserData - The remote user data object
 */
async function createRemoteUserData(userID, email, password, name) {
	const templateData = await getTemplateData();
	const remoteUserData = JSON.parse(JSON.stringify(templateData));
	const color = chooseRandomColor();
	remoteUserData.userID = userID;

	// Neuen Eintrag im users-Array erstellen
	const newUser = {
		isLoggedIn: true,
		userData: {
			name: name,
		},
		color: color,
		tasks: [],
	};
	const newContact = {
		userData: {
			name: name,
			email: email,
			phone: '',
		},
		color: color,
	};
	remoteUserData.users.push(newUser);
	remoteUserData.contacts.push(newContact);

	const remoteUserDataKey = 'remoteUserData_' + userID;
	await setItem(remoteUserDataKey, JSON.stringify(remoteUserData));

	// Anmeldeinformationen des Benutzers speichern
	await createUserCredentials(userID, email, password);

	console.log(remoteUserDataKey);
	return remoteUserData;
}

/**
 * Creates user credentials for authentication and saves them to remote storage.
 *
 * Credentials are stored in an object mapped by user ID under the key
 * 'allUserCredentials' in remote storage. Any existing credentials for the
 * given user ID will be overwritten.
 *
 * @param {string} userID - Unique ID for the user
 * @param {string} email - Email address for the user
 * @param {string} password - Password for the user
 */
async function createUserCredentials(userID, email, password) {
	try {
		const allUserCredentials = await getItem('allUserCredentials');
		const parsedUserCredentials = JSON.parse(allUserCredentials);

		// Füge die neuen Anmeldeinformationen zum allUserCredentials-Objekt hinzu
		parsedUserCredentials[userID] = {
			email: email,
			password: password,
		};

		// Speichere das aktualisierte allUserCredentials-Objekt im Remote-Speicher
		await setItem('allUserCredentials', JSON.stringify(parsedUserCredentials));
	} catch (error) {
		console.log('Error creating user credentials:', error);
	}
}

// FUNKTIONEN VON MICHA 04.04.2024

/**
 * Toggles the visibility of the login and signup boxes.
 * Hides one box and shows the other. Also toggles the
 * "call to signup" button visibility. Resets any
 * login/signup errors.
 */
function toggleLoginSignup() {
	const signupBox = document.getElementById('signup-box');
	const loginBox = document.getElementById('login-box');
	const showSignupBtn = document.getElementById('call-to-signup');
	signupBox.classList.toggle('d-none');
	loginBox.classList.toggle('d-none');
	showSignupBtn.classList.toggle('d-none');
	resetLoginSignupErrors();
}

/**
 * Adds a blinking animation class to the given element ID. Removes the class after 1 second.
 *
 * @param {string} identifier - The identifier of the element to blink, either 'login' or 'signup'
 */
function blinkAnimation(identifier) {
	const elementId =
		identifier === 'login' ? 'call-to-signup' : 'signup-checkbox-cont';
	const blinkElement = document.getElementById(elementId);
	blinkElement.classList.add('blink');
	setTimeout(() => {
		blinkElement.classList.remove('blink');
	}, 1000);
}

// #############################################

/**
 * Validates the login form by checking the email and password fields.
 * Logs a message if the form is valid or invalid. If valid, calls the
 * login function to authenticate the user.
 */
async function validateLoginForm() {
	const isValidEmail = validateLoginEmail();
	const isValidPassword = validateLoginPW();

	if (isValidEmail && isValidPassword) {
		console.log('Form is valid');

		// Benutzereingaben abrufen
		const email = document.getElementById('login-email').value;
		const password = document.getElementById('login-password').value;

		// Anmeldefunktion aufrufen
		await login(email, password);
	} else {
		console.log('Form is not valid');
		return false;
	}
}

/**
 * Validates the email entered in the login form.
 * Checks if the email contains an '@' symbol and is not empty.
 * Adds/removes error styling on the email field based on validation.
 * Returns true if valid, false otherwise.
 */
function validateLoginEmail() {
	const emailCont = document.getElementById('login-email-cont');
	const inputEmail = document.getElementById('login-email');
	const emailError = document.getElementById('email-error-login');
	if (!inputEmail.value.includes('@') || inputEmail.value.trim() === '') {
		emailCont.classList.add('invalid');
		emailError.textContent = '*Please enter a valid email address.';
		return false;
	} else {
		emailCont.classList.remove('invalid');
		emailError.textContent = '';
		return true;
	}
}

/**
 * Validates the password entered in the login form.
 * Checks if the password is at least 6 characters long.
 * Adds/removes error styling on the password field based on validation.
 * Returns true if valid, false otherwise.
 */
function validateLoginPW() {
	const pwCont = document.getElementById('login-password-cont');
	const inputPW = document.getElementById('login-password');
	const pwError = document.getElementById('pw-error-login');
	if (inputPW.value.length < 6 || inputPW.value.trim() === '') {
		pwCont.classList.add('invalid');
		pwError.textContent = '*Type in at least 6 characters.';
		return false;
	} else {
		pwCont.classList.remove('invalid');
		pwError.textContent = '';
		return true;
	}
}

// #############################################

/**
 * Validates the signup form and handles submission.
 *
 * Checks that all validation functions pass and required fields are filled.
 * If valid, submits user data to backend and logs user in locally.
 * If invalid, returns false without submitting.
 */
async function validateSignupForm() {
	const isValidName = validateSignupName();
	const isValidEmail = validateSignupEmail();
	const isValidPW = validateSignupPW();
	const isValidRepPW = validateSignupRepPW();
	const isPwMatch = comparePWs();
	const isChecked = document.getElementById('signup-checkbox').checked;

	if (
		isValidName &&
		isValidEmail &&
		isValidPW &&
		isValidRepPW &&
		isPwMatch &&
		isChecked
	) {
		console.log('Form is valid');

		// Benutzereingaben abrufen
		const name = document.getElementById('signup-name').value;
		const email = document.getElementById('signup-email').value;
		const password = document.getElementById('signup-pw').value;

		// Neue userID generieren
		const userID = generateUserID();

		// Remote-Benutzerdaten erstellen
		await createRemoteUserData(userID, email, password, name);

		// Benutzer als angemeldet markieren
		localStorage.setItem('loggedInUser', userID);

		// Weitere Aktionen nach erfolgreicher Anmeldung durchführen (z.B. Weiterleitung zur Hauptseite)
		console.log('Anmeldung erfolgreich');
		showSuccessMessage();
	} else if (!isChecked) {
		blinkAnimation();
		console.log('Form is not valid');
		return false;
	} else {
		console.log('Form is not valid');
		return false;
	}
}

/**
 * Validates the name entered in the signup form.
 * Checks if the name matches the expected pattern of first and last name.
 * Returns false if invalid, true if valid.
 */
function validateSignupName() {
	const nameCont = document.getElementById('signup-name-cont');
	const inputName = document.getElementById('signup-name');
	const nameError = document.getElementById('name-error-signup');
	const validNamePattern = /^[a-zA-Z-]+ [a-zA-Z-]+ ?[a-zA-Z-]+?$/;
	if (
		!validNamePattern.test(inputName.value) ||
		inputName.value.trim() === ''
	) {
		nameCont.classList.add('invalid');
		nameError.textContent = '*Please enter first- and surname.';
		return false;
	} else {
		nameCont.classList.remove('invalid');
		nameError.textContent = '';
		return true;
	}
}

/**
 * Validates the email entered in the signup form.
 * Checks if the email contains an '@' symbol and is not empty.
 * Returns false if invalid, true if valid.
 */
function validateSignupEmail() {
	const emailCont = document.getElementById('signup-email-cont');
	const inputEmail = document.getElementById('signup-email');
	const emailError = document.getElementById('email-error-signup');
	if (!inputEmail.value.includes('@') || inputEmail.value.trim() === '') {
		emailCont.classList.add('invalid');
		emailError.textContent = '*Please enter a valid email address.';
		return false;
	} else {
		emailCont.classList.remove('invalid');
		emailError.textContent = '';
		return true;
	}
}

/**
 * Validates the password entered in the signup form.
 * Checks if the password is at least 6 characters long.
 * Returns false if invalid, true if valid.
 */
function validateSignupPW() {
	const pwCont = document.getElementById('signup-pw-cont');
	const inputPW = document.getElementById('signup-pw');
	const pwError = document.getElementById('pw-error-signup');
	if (inputPW.value.length < 6 || inputPW.value.trim() === '') {
		pwCont.classList.add('invalid');
		pwError.textContent = '*Type in at least 6 characters.';
		return false;
	} else {
		pwCont.classList.remove('invalid');
		pwError.textContent = '';
		return true;
	}
}

/**
 * Validates that the repeated password entered matches the password.
 * Checks if the repeated password value is at least 6 characters long and matches the original password value.
 * Returns false if invalid, true if valid.
 */
function validateSignupRepPW() {
	const pwRepCont = document.getElementById('signup-pwrep-cont');
	const inputRepPW = document.getElementById('signup-pw-repeat');
	const pwRepError = document.getElementById('pwrep-error-signup');
	if (inputRepPW.length < 6 || inputRepPW.value.trim() === '') {
		pwRepCont.classList.add('invalid');
		pwRepError.textContent = '*Passwords do not match.';
		return false;
	} else {
		pwRepCont.classList.remove('invalid');
		pwRepError.textContent = '';
		return true;
	}
}

/**
 * Validates that the repeated password entered matches the original password.
 * Checks if passwords match after individual validation passes.
 * Returns true if passwords match, false if they do not match.
 */
function comparePWs() {
	const pw = document.getElementById('signup-pw').value;
	const pwRep = document.getElementById('signup-pw-repeat').value;
	const pwRepCont = document.getElementById('signup-pwrep-cont');
	const pwRepError = document.getElementById('pwrep-error-signup');
	if (validateSignupPW() && validateSignupRepPW()) {
		if (pw === pwRep) {
			return true;
		} else {
			pwRepCont.classList.add('invalid');
			pwRepError.textContent = '*Passwords do not match.';
			return false;
		}
	}
}

/**
 * Resets any error messages or invalid styles on login/signup form inputs.
 * Removes the 'invalid' class from all input containers and clears any error text.
 */
function resetLoginSignupErrors() {
	const allInputs = document.querySelectorAll(
		'.login-box .input-container, .signup-box .input-container '
	);
	const allErrors = document.querySelectorAll(
		'.login-box .error-message, .signup-box .error-message '
	);
	allInputs.forEach((input) => {
		input.classList.remove('invalid');
	});
	allErrors.forEach((error) => {
		error.textContent = '';
	});
}

// FUNKTION VON AMALIA 11.04.2024

/**
 * Shows a success message container and wrapper for 1.5 seconds before redirecting to the index page.
 * Hides the containers' "d-none" classes to make them visible, waits 1.5 seconds, then adds the classes back
 * and redirects to the index page.
 */
function showSuccessMessage() {
	let container = document.getElementById('success-container');
	let wrapper = document.getElementById('wrapper');
	container.classList.remove('d-none');
	wrapper.classList.remove('d-none');
	setTimeout(() => {
		container.classList.add('d-none');
		wrapper.classList.add('d-none');
		toggleLoginSignup();
	}, 1500);
}
