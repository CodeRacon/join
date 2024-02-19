let createdAccounts = [];
let login_value = [];
let num = 0;
let SignUpData = [];
let logInValue = [];
let switchTemplates = 0;

async function init() {
    await fetchSignUpData();
    loadTemplate();
}

async function fetchSignUpData() {
    let url = `https://remote-storage.developerakademie.org/item?key=User&token=OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M`;
    let response = await fetch(url);
    createdAccounts = await response.json();
    let dataProperty = JSON.parse(createdAccounts.data.value);
    SignUpData = dataProperty;
}

function checkExistence() {
    let mail = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    if (checkIfValueIsLegit(mail, password) == true) {
        alert('found');
    } else {
        alert('dasd');
        document.getElementById('login-email').style.borderColor = 'red';
        document.getElementById('login-password').style.borderColor = 'red';
        document.getElementById('john').classList.remove('dn');
    }
}

function checkIfValueIsLegit(mail, password) {
    for (let i = 0; i < SignUpData.length; i++) {
        if (SignUpData[i]['email'] == mail && SignUpData[i]['pasword'] == password) {
            return true;
        }
    }
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

// Rufe init() auf, um den Datenabruf zu starten

