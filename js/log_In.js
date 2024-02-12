let createdAccounts = [];
let login_value = [];
let num = 0;
let SignUpData = [];
let logInValue = [];

async function init() {
    await fetchSignUpData();
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
    if(checkIfValueIsLegit(mail, password) == true){
        alert('found');
    }else{
        alert('dasd');
        document.getElementById('login-email').style.borderColor = 'red';
        document.getElementById('login-password').style.borderColor = 'red';
        document.getElementById('john').classList.remove('dn');
    }
}

function checkIfValueIsLegit(mail, password){
    for (let i = 0; i < SignUpData.length; i++) {
        if (SignUpData[i]['email'] == mail && SignUpData[i]['pasword'] == password) {
            return true;
        }
    }
    return false;
}

function checkBox(){
    let isCheckedOrNot = document.getElementById('checkedOrNot');
    isCheckedOrNot.innerHTML = `<img onclick="getBack()" class="imgmo" src="assets/img/icons/general/other/checked.svg" alt="" srcset="">`
} 

function getBack(){
    document.getElementById('checkedOrNot').innerHTML = `<img onclick="checkBox()" class="imgmo" src="assets/img/icons/general/other/unchecked.svg" alt="" srcset="">`
}

// Rufe init() auf, um den Datenabruf zu starten

