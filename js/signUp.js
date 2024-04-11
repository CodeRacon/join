loadUsers();
let heyo = [];
let cancelFunction = 0;
let nameOfInputsId = ["name", "mail", "paswort"];
let num = 0;
async function createAccount() {
  let name = document.getElementById("signup-name");
  let email = document.getElementById("signup-email");
  let paswort = document.getElementById("signup-pw");
  return await pushIntoArray(name, email, paswort);
}

function saveIndexNum() {
  let indexValue = JSON.stringify(num);
  localStorage.setItem("accesToData", indexValue);
}

function loadIndexNum() {
  let numOfIndex = localStorage.getItem("accesToData");
  if (numOfIndex) {
    num = JSON.parse(numOfIndex);
  }
}

function checkExistenceOfAccount(name, email, paswort) {
  for (let i = 0; i < startData.users.length; i++) {
    if (startData.users[i].hasOwnProperty("registerData")) {
      if (
        startData.users[i].registerData.Data["name"] == name.value ||
        startData.users[i].registerData.Data["email"] == email.value ||
        startData.users[i].registerData.Data["password"] == paswort.value
      ) {
        alert("hey");
        return true;
      }
    } else {
      return false;
    }
  }
}

// Beispielaufruf

async function pushIntoArray(name, email, paswort) {
  let newData = {
    isRegistered: true,
    isLoggedIn: false,
    userData: {
      name: name.value,

      email: email.value,
      password: paswort.value,
    },

    tasks: [],
  };
  startData.users.push(newData);
  storeStartData();
}
async function loadUsers() {
  try {
    startData = JSON.parse(await getItem("startData"));
    console.log(startData);
  } catch (e) {
    console.error("Loading error:", e);
  }
}
function toogleNum() {
  cancelFunction = 1;
}
// Funktion bei der der agb button angeclickt wird und dan auf 1 kommt wenn dies geschieht kann der button benutzt werden sont nicht
// https://remote-storage.developerakademie.org/item?key=User&token=OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M
// FUNKTIONEN VON MICHA 04.04.2024
function toggleLoginSignup() {
  const signupBox = document.getElementById("signup-box");
  const loginBox = document.getElementById("login-box");
  const showSignupBtn = document.getElementById("call-to-signup");
  signupBox.classList.toggle("d-none");
  loginBox.classList.toggle("d-none");
  showSignupBtn.classList.toggle("d-none");
  resetLoginSignupErrors();
}

function blinkAnimation() {
  const checkboxCont = document.getElementById("signup-checkbox-cont");
  checkboxCont.classList.add("blink");
  setTimeout(() => {
    checkboxCont.classList.remove("blink");
  }, 1000);
}

async function validateLoginForm() {
  const isValidEmail = await validateLoginEmail();
  const isValidPassword = validateLoginPW();
  if (isValidEmail && isValidPassword) {
    console.log("Form is valid");
    await checkExistence();
    window.location.href = "summary.html";
  } else {
    console.log("Form is not valid");
    return false;
  }
}

async function validateLoginEmail() {
  const emailCont = document.getElementById("login-email-cont");
  const inputEmail = document.getElementById("login-email");
  const emailError = document.getElementById("email-error-login");
  if (!inputEmail.value.includes("@") || inputEmail.value.trim() === "") {
    emailCont.classList.add("invalid");
    emailError.textContent = "*Please enter a valid email address.";
    return false;
  } else if ((await checkIfLoginEmailIsInServer()) == false) {
    emailCont.classList.add("invalid");
    emailError.textContent = "*Please enter a valid email address.";
    return false;
  } else {
    emailCont.classList.remove("invalid");
    emailError.textContent = "";
    return true;
  }
}

async function validateLoginPW() {
  const pwCont = document.getElementById("login-password-cont");
  const inputPW = document.getElementById("login-password");
  const pwError = document.getElementById("pw-error-login");
  if (inputPW.value.length < 6 || inputPW.value.trim() === "") {
    pwCont.classList.add("invalid");
    pwError.textContent = "*Type in at least 6 characters.";
    return false;
  } else if ((await checkIfLoginPasswordIsInServer()) == false) {
    pwCont.classList.add("invalid");
    pwError.textContent = "*Please enter a valid password.";

    return false;
  } else {
    pwCont.classList.remove("invalid");
    pwError.textContent = "";
    return true;
  }
}

async function validateSignupForm() {
  const isValidName = validateSignupName("signup");
  const isValidEmail = validateSignupEmail("signup");
  const isValidPW = validateSignupPW();
  const isValidRepPW = validateSignupRepPW();
  const isPwMatch = comparePWs();
  const isChecked = document.getElementById("signup-checkbox").checked;

  if (
    isValidName &&
    isValidEmail &&
    isValidPW &&
    isValidRepPW &&
    isPwMatch &&
    isChecked
  ) {
    console.log("Form is valid");
    await createAccount();
    showSuccessMessage();
  } else if (!isChecked) {
    blinkAnimation();
    console.log("Form is not valid");
    return false;
  } else {
    console.log("Form is not valid");
    return false;
  }
}

function validateSignupName() {
  const nameCont = document.getElementById("signup-name-cont");
  const inputName = document.getElementById("signup-name");
  const nameError = document.getElementById("name-error-signup");
  const validNamePattern = /^[a-zA-Z-]+ [a-zA-Z-]+ ?[a-zA-Z-]+?$/;
  if (
    !validNamePattern.test(inputName.value) ||
    inputName.value.trim() === ""
  ) {
    nameCont.classList.add("invalid");
    nameError.textContent = "*Please enter first- and surname.";
    return false;
  } else {
    nameCont.classList.remove("invalid");
    nameError.textContent = "";
    return true;
  }
}

function validateSignupEmail() {
  const emailCont = document.getElementById("signup-email-cont");
  const inputEmail = document.getElementById("signup-email");
  const emailError = document.getElementById("email-error-signup");
  if (!inputEmail.value.includes("@") || inputEmail.value.trim() === "") {
    emailCont.classList.add("invalid");
    emailError.textContent = "*Please enter a valid email address.";
    return false;
  } else if (checkIfEmailIsInServer() == true) {
    emailCont.classList.add("invalid");
    emailError.textContent = "*Please enter a valid email address.";
    return false;
  } else {
    emailCont.classList.remove("invalid");
    emailError.textContent = "";
    return true;
  }
}

function checkIfEmailIsInServer() {
  let mail = document.getElementById("signup-email").value;
  if (startData.users.length > 0) {
    for (let i = 0; i < startData.users.length; i++) {
      if (startData.users.length > 0) {
        if (mail == startData.users[i].userData.email) {
          return true;
        }
      }
    }
  }
  return false;
}

function validateSignupPW() {
  const pwCont = document.getElementById("signup-pw-cont");
  const inputPW = document.getElementById("signup-pw");
  const pwError = document.getElementById("pw-error-signup");
  if (inputPW.value.length < 6 || inputPW.value.trim() === "") {
    pwCont.classList.add("invalid");
    pwError.textContent = "*Type in at least 6 characters.";
    return false;
  } else {
    pwCont.classList.remove("invalid");
    pwError.textContent = "";
    return true;
  }
}

function validateSignupRepPW() {
  const pwRepCont = document.getElementById("signup-pwrep-cont");
  const inputRepPW = document.getElementById("signup-pw-repeat");
  const pwRepError = document.getElementById("pwrep-error-signup");
  if (inputRepPW.length < 6 || inputRepPW.value.trim() === "") {
    pwRepCont.classList.add("invalid");
    pwRepError.textContent = "*Passwords do not match.";
    return false;
  } else {
    pwRepCont.classList.remove("invalid");
    pwRepError.textContent = "";
    return true;
  }
}

function comparePWs() {
  const pw = document.getElementById("signup-pw").value;
  const pwRep = document.getElementById("signup-pw-repeat").value;
  const pwRepCont = document.getElementById("signup-pwrep-cont");
  const pwRepError = document.getElementById("pwrep-error-signup");
  if (validateSignupPW() && validateSignupRepPW()) {
    if (pw === pwRep) {
      return true;
    } else {
      pwRepCont.classList.add("invalid");
      pwRepError.textContent = "*Passwords do not match.";
      return false;
    }
  }
}

function resetLoginSignupErrors() {
  const allInputs = document.querySelectorAll(
    ".login-box .input-container, .signup-box .input-container "
  );
  const allErrors = document.querySelectorAll(
    ".login-box .error-message, .signup-box .error-message "
  );
  allInputs.forEach((input) => {
    input.classList.remove("invalid");
  });
  allErrors.forEach((error) => {
    error.textContent = "";
  });
}

async function guestLogin() {
  loadIndexNum();
  await loadUsers();
  for (let i = 0; i < startData.users.length; i++) {
    if (startData.users[i].hasOwnProperty("userData")) {
      if (startData.users[i].userData.name == "Guest") {
        startData.users[i].isLoggedIn = true;
        storeStartData();
        num = i;
        saveIndexNum();
      }
    }
  }
  window.location.href = "summary.html";
}

async function checkIfLoginEmailIsInServer() {
  await loadUsers();
  let loginEmail = document.getElementById("login-email").value;
  for (let i = 0; i < startData.users.length; i++) {
    if (loginEmail == startData.users[i].userData.email) {
      return true;
    }
  }
  return false;
}

async function checkIfLoginPasswordIsInServer() {
  await loadUsers();
  let loginPassword = document.getElementById("login-password").value;
  for (let i = 0; i < startData.users.length; i++) {
    if (loginPassword == startData.users[i].userData.password) {
      return true;
    }
  }
  return false;
}

async function checkExistence() {
  await loadUsers();
  let mail = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  if ((await checkIfValueIsLegit(mail, password)) == true) {
    window.location.href = "summary.html";
  }
}

async function checkIfValueIsLegit(mail, password) {
  await loadUsers();
  loadIndexNum();
  for (let i = 0; i < startData.users.length; i++) {
    if (startData.users[i].hasOwnProperty("userData")) {
      if (
        startData.users[i].userData["email"] == mail &&
        startData.users[i].userData["password"] == password
      ) {
        num = i;
        if (startData.users[i]["isLoggedIn"] == false) {
          startData.users[i]["isLoggedIn"] = true;
          storeStartData();
        }
        // Vom Server in den LocalStorage muss von hier beginnen aber nur isLoggedIn True ist und dan mit einer fors schleife überprüft wird ob der name in dem true zugeordnet ist auch in dem anderedd
        // Beachte die Dokumentation oben was heißt das du beim DataHandling.js villeicht par sachen ändern musst
        saveIndexNum();
        return true;
        //Wen logged in true ist und es den namen des users enthält wird die kopie genommen.
      }
    }
  }
}

// FUNKTION VON AMALIA 11.04.2024

/**
 * Displays a success message to the user for 1.5 seconds, then redirects them to the index.html page.
 *
 * This function is used to provide visual feedback to the user after a successful operation, such as a successful sign-up or login. It shows a success message container, waits for 1.5 seconds, then hides the container and redirects the user to the index.html page.
 */
function showSuccessMessage() {
  let container = document.getElementById("success-container");
  let wrapper = document.getElementById("wrapper");
  container.classList.remove("d-none");
  wrapper.classList.remove("d-none");
  setTimeout(() => {
    container.classList.add("d-none");
    wrapper.classList.add("d-none");
    window.location.href = "index.html";
  }, 1500);
}
