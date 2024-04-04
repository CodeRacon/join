// SignUp
// einfach load und storeStartData wegmachen wenn du den urprünglichen wert willst
loadUsers();
let heyo = [];

let cancelFunction = 0;
let nameOfInputsId = ['name', 'mail', 'paswort'];

async function createAccount() {
	let name = document.getElementById('name');
	let email = document.getElementById('mail');
	let paswort = document.getElementById('paswort');
	let passwordRepeat = document.getElementById('repeatPassword').value;
	if (passwordRepeat != paswort.value && cancelFunction == 1) {
		paswort.style.borderColor = 'red';
		passwordRepeat.style.borderColor = 'red';
	} else if (passwordRepeat != paswort.value) {
		alert('friendo');
	} else if (cancelFunction == 1) {
		alert('sunshine');
		return 1;
	}
	return await pushIntoArray(name, email, paswort);
}

function checkExistenceOfAccount(name, email, paswort) {
	for (let i = 0; i < startData.users.length; i++) {
		if (startData.users[i].hasOwnProperty('registerData')) {
			if (
				startData.users[i].registerData.Data['name'] == name.value ||
				startData.users[i].registerData.Data['email'] == email.value ||
				startData.users[i].registerData.Data['password'] == paswort.value
			) {
				alert('hey');
				return true;
			}
		} else {
			return false;
		}
	}
}

function generatePhoneNumber() {
	var phoneNumber = '';
	for (var i = 0; i < 10; i++) {
		phoneNumber += Math.floor(Math.random() * 10);
	}

	// Telefonnummer im Format "(xxx) xxx-xxxx" zurückgeben
	return (
		'(' +
		phoneNumber.substring(0, 3) +
		') ' +
		phoneNumber.substring(3, 6) +
		'-' +
		phoneNumber.substring(6, 10)
	);
}

function hexColorGenerator() {
	return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}
// Beispielaufruf
var randomPhoneNumber = generatePhoneNumber();
console.log(randomPhoneNumber);

async function pushIntoArray(name, email, paswort) {
	let newData = {
		isRegistered: true,
		isLoggedIn: false,
		userData: {
			name: name.value,
			phone: generatePhoneNumber(),
			email: email.value,
			password: paswort.value,
		},
		color: hexColorGenerator(),
		tasks: [],
	};

	for (let i = 0; i < startData.users.length; i++) {
		if (startData.users[i].hasOwnProperty('userData')) {
			if (startData.users[i].userData['name'] == newData.userData['name']) {
				alert('forget');
				return 1;
			}
		}
	}
	startData.users.push(newData);
	storeStartData();
}

async function loadUsers() {
	try {
		startData = JSON.parse(await getItem('startData'));
		console.log(startData);
	} catch (e) {
		console.error('Loading error:', e);
	}
}

function toogleNum() {
	cancelFunction = 1;
}
// Funktion bei der der agb button angeclickt wird und dan auf 1 kommt wenn dies geschieht kann der button benutzt werden sont nicht

// https://remote-storage.developerakademie.org/item?key=User&token=OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M

// FUNKTIONEN VON MICHA 04.04.2024

function toggleLoginSignup() {
	const signupBox = document.getElementById('signup-box');
	const loginBox = document.getElementById('login-box');
	const showSignupBtn = document.getElementById('call-to-signup');
	signupBox.classList.toggle('d-none');
	loginBox.classList.toggle('d-none');
	showSignupBtn.classList.toggle('d-none');
	resetLoginSignupErrors();
}

function blinkAnimation() {
	const checkboxCont = document.getElementById('signup-checkbox-cont');
	checkboxCont.classList.add('blink');
	setTimeout(() => {
		checkboxCont.classList.remove('blink');
	}, 1000);
}

function validateLoginForm() {
	const isValidEmail = validateLoginEmail();
	const isValidPassword = validateLoginPW();
	if (isValidEmail && isValidPassword) {
		console.log('Form is valid');
		// Login-Funktion aufrufen
	} else {
		console.log('Form is not valid');
		return false;
	}
}

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

function validateSignupForm() {
	const isValidName = validateSignupName('signup');
	const isValidEmail = validateSignupEmail('signup');
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
		// Signup-Funktion aufrufen
	} else if (!isChecked) {
		blinkAnimation();
		console.log('Form is not valid');
		return false;
	} else {
		console.log('Form is not valid');
		return false;
	}
}

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
