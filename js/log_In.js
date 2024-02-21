let createdAccounts = [];
let login_value = [];
let num = 0;
let SignUpData = [];
let logInValue = [];
let switchTemplates = 0;

async function init() {
   
    loadTemplate();
}



function checkExistence() {
    let mail = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    if (checkIfValueIsLegit(mail, password) == true) {
        alert('found');
    } else if(checkIfValueIsLegit(mail, password) == false){
        alert('dasd');
    }
}

function checkIfValueIsLegit(mail, password) {
    
    for (let i = 0; i < startData.length; i++) {
        if (startData[i].hasOwnProperty('registerData')) {
            if (startData[i].registerData.Data['email'] == mail && startData[i].registerData.Data['password'] == password) {
                return true;   
            }   
        }
    }
    return false;
}

function yolo(){
    return false;
}

function checkBox() {
    let isCheckedOrNot = document.getElementById('checkedOrNot');
    isCheckedOrNot.innerHTML = `<img onclick="getBack()" class="imgmo" src="assets/img/icons/general/other/checked.svg" alt="" srcset="">`
}

function getBack() {
    document.getElementById('checkedOrNot').innerHTML = `<img onclick="checkBox()" class="imgmo" src="assets/img/icons/general/other/unchecked.svg" alt="" srcset="">`
}

function switchToSignUp() {
    switchTemplates = 1;
    saveSwitchInServer();
    if(switchTemplates == 1){
    return 2;
    }
}

function saveSwitchInServer(){
        let dd = JSON.stringify(switchTemplates);
        localStorage.setItem('Anzahl', dd);
}

function loadTemplate(){
       let dd = localStorage.getItem('Anzahl');
       if(dd){
        switchTemplates = JSON.parse(dd)
       }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTemplate();
    if(switchTemplates == 1){
    document.getElementById('anyt').innerHTML = `
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
    }
})

function getto(){
    switchTemplates = 0;
    saveSwitchInServer();
}

// speicher zahl in localStorage für die index hinweisung mit dem localStorage zahl greifst du wenn die Seite sich öffnet greifst du mit der zahl aufs json zu speichert die entsprechende stelle dan in einem anderen localstorage und löscht die Zahl die im Storage stand

// Rufe init() auf, um den Datenabruf zu starten

