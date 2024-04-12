let createdAccounts = [];
let login_value = [];
let number = 0;
let SignUpData = [];
let logInValue = [];
let switchTemplates = 0;

async function init() {
  console.log(startData);
  loadTemplate();
}

function checkExistence() {
  loadUsers();
  console.log(startData);
  let mail = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  if (checkIfValueIsLegit(mail, password) == true) {
    window.open("test.html");
  } else if (checkIfValueIsLegit(mail, password) == false) {
    alert("dasd");
  }
}

function checkIfValueIsLegit(mail, password) {
  loadIndexNum();
  for (let i = 0; i < startData.users.length; i++) {
    if (startData.users[i].hasOwnProperty("userData")) {
      if (
        startData.users[i].userData["email"] == mail &&
        startData.users[i].userData["password"] == password
      ) {
        number = i;
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
  return false;
}

function saveIndexNum() {
  let indexValue = JSON.stringify(number);
  localStorage.setItem("accesToData", indexValue);
}

function loadIndexNum() {
  let numOfIndex = localStorage.getItem("accesToData");
  if (numOfIndex) {
    number = JSON.parse(numOfIndex);
  }
}

function yolo() {
  return false;
}

function checkBox() {
  let isCheckedOrNot = document.getElementById("checkedOrNot");
  isCheckedOrNot.innerHTML = `<img onclick="getBack()" class="imgmo" src="assets/img/icons/general/other/checked.svg" alt="" srcset="">`;
}

function getBack() {
  document.getElementById(
    "checkedOrNot"
  ).innerHTML = `<img onclick="checkBox()" class="imgmo" src="assets/img/icons/general/other/unchecked.svg" alt="" srcset="">`;
}

function switchToSignUp() {
  switchTemplates = 1;
  saveSwitchInServer();
  document.getElementById("anyt").innerHTML = `
    <form onsubmit="createAccount(); return false">
    <div>
        <input required id="name" required type="text" placeholder="Name">
    </div>
    <div>
        <input required id="mail" required type="email" placeholder="Email">
    </div>
    <div>
        <input required id="paswort" type="password" placeholder="Password">
    </div>
    <div>
        <input id="repeatPassword" required type="password" placeholder="Confirm Password">
    </div>
    <p style="color: red;" class="dn">Please make sure your passwords match</p>
    <button onclick="toogleNum()">Click button</button>
    <button>Do It</button>
</form>
<button onclick="getto()"></button>
    `;
  if (switchTemplates == 1) {
    return 2;
  }
}

function saveSwitchInServer() {
  let dd = JSON.stringify(switchTemplates);
  localStorage.setItem("Anzahl", dd);
}

function loadTemplate() {
  let dd = localStorage.getItem("Anzahl");
  if (dd) {
    switchTemplates = JSON.parse(dd);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTemplate();
  if (switchTemplates == 1) {
    document.getElementById("anyt").innerHTML = `

    <form class="registerInputBox" onsubmit="createAccount(); return false">
    <div>
        <img src="./assets/img/icons/login_signup/arrow-left-line.svg" alt="" srcset="">
    </div>
    <div>
        <input required id="name" required type="text" placeholder="Name">
    </div>
    <div>
        <input required id="mail" required type="email" placeholder="Email">
    </div>
    <div>
        <input required id="paswort" type="password" placeholder="Password">
    </div>
    <div>
        <input id="repeatPassword" required type="password" placeholder="Confirm Password">
    </div>
    <p style="color: red;" class="dn">Please make sure your passwords match</p>
    <button onclick="toogleNum()">Click button</button>
    <button>Do It</button>
</form>
<button onclick="getto()"></button>
    `;
  }
});

function getto() {
  switchTemplates = 0;
  saveSwitchInServer();
}

// speicher zahl in localStorage für die index hinweisung mit dem localStorage zahl greifst du wenn die Seite sich öffnet greifst du mit der zahl aufs json zu speichert die entsprechende stelle dan in einem anderen localstorage und löscht die Zahl die im Storage stand

// Rufe init() auf, um den Datenabruf zu starten

// irgendwo hier eine funktion die dafür sorgt das GuestUser auf den ursprünglichen Stand zurückgesetzt wird und in dem issloged in auf true gesetzt wird
function guestLogin() {
  loadIndexNum();
  loadUsers();
  console.log(startData);
  for (let i = 0; i < startData.users.length; i++) {
    if (startData.users[i].hasOwnProperty("userData")) {
      if (startData.users[i].userData.name == "Guest") {
        startData.users[i].isLoggedIn = true;
        storeStartData();
        number = i;
        saveIndexNum();
      }
    }
  }
  window.open("test.html");
}

// FUNKTIONEN VON AMALIA 11.04.2024
/**
 * Checks if the user has previously saved their email and password in the browser's local storage, and if so, populates the login form with those values and checks the "Remember Me" checkbox.
 * This function is executed when the page loads, and is used to provide a convenient login experience for returning users.
 */
window.onload = function () {
  let storedEmail = localStorage.getItem("rememberMeEmail");
  let storedPassword = localStorage.getItem("rememberMePassword");
  let checkBox = document.getElementById("login-checkbox");
  if (storedEmail && storedPassword) {
    document.getElementById("login-email").value = storedEmail;
    document.getElementById("login-password").value = storedPassword;
    checkBox.checked = true;
  }
};

/**
 * Saves the user's email and password in the browser's local storage if the "Remember Me" checkbox is checked.
 * If the checkbox is not checked, removes any previously saved email and password from local storage.
 */
function saveLoginDetails() {
  let email = document.getElementById("login-email").value.trim();
  let password = document.getElementById("login-password").value.trim();
  let checkBox = document.getElementById("login-checkbox");
  if (email !== "" && password !== "" && checkBox.checked) {
    localStorage.setItem("rememberMeEmail", email);
    localStorage.setItem("rememberMePassword", password);
  } else {
    checkBox.checked = false;
    localStorage.removeItem("rememberMeEmail");
    localStorage.removeItem("rememberMePassword");
  }
}

