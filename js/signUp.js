// SignUp
// einfach load und storeStartData wegmachen wenn du den urprünglichen wert willst
loadUsers();

let cancelFunction = 0;
let nameOfInputsId = ['name','mail','paswort'];

async function createAccount(){
    let name = document.getElementById('name');
    let email = document.getElementById('mail');
    let paswort = document.getElementById('paswort');
    let passwordRepeat = document.getElementById('repeatPassword').value;
    if (passwordRepeat != paswort.value && cancelFunction == 1) {
        paswort.style.borderColor = 'red';
        passwordRepeat.style.borderColor = 'red';
    }
    else if(passwordRepeat != paswort.value){
        alert('friendo');
    }
    else if (cancelFunction == 1) {
        alert('sunshine');
        return 1;
    }
    return checkExistenceOfAccount(name, email, paswort) == true ? 1: await pushIntoArray(name, email, paswort);
}

function checkExistenceOfAccount(name, email, paswort){
    for (let i = 0; i < startData.users.length; i++) {
        if (startData.users[i].hasOwnProperty('registerData')){
        if (startData.users[i].registerData.Data['name'] == name.value || startData.users[i].registerData.Data['email'] == email.value ||  startData.users[i].registerData.Data['password'] == paswort.value) {
            alert('hey');
            return true;
        }}
        else{
            return false;
        }
    }
}

function generatePhoneNumber() {
    var phoneNumber = "";
    for (var i = 0; i < 10; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    
    // Telefonnummer im Format "(xxx) xxx-xxxx" zurückgeben
    return "(" + phoneNumber.substring(0, 3) + ") " +
           phoneNumber.substring(3, 6) + "-" +
           phoneNumber.substring(6, 10);
}

// Beispielaufruf
var randomPhoneNumber = generatePhoneNumber();
console.log(randomPhoneNumber);

async function pushIntoArray(name, email, paswort){
    let newData = {
        isRegistered: true,
        isLoggedIn: false,   // loged in true wenn sich der benutzer das erste mal einloggt und das bleibt auch so damit wenn zb der user eigelogt ist das man dan auf die copy mit zb has property zugreifen kann
        timeStamp: Date.now(),
        Data: { 
        "name": name.value,
        "phoneNumber": generatePhoneNumber(),
        "email": email.value,
        "password":paswort.value 
        }
    }; 
   
     for (let i = 0; i < startData.users.length; i++) {
        if (!startData.users[i].hasOwnProperty('registerData')) {
            startData.users[i].registerData = newData;
            await storeStartData();
            return 1;
        }
     }  
}


async function loadUsers(){
    try {
        startData = JSON.parse(await getItem('startData'));
        console.log(startData);
    } catch(e){
        console.error('Loading error:', e);
    }
}

function toogleNum(){
    cancelFunction = 1;  
}
// Funktion bei der der agb button angeclickt wird und dan auf 1 kommt wenn dies geschieht kann der button benutzt werden sont nicht

// https://remote-storage.developerakademie.org/item?key=User&token=OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M