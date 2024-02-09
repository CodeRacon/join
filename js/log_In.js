let createdAccounts = [];
let login_value = [];
let num = 0;
let dataProperty;  // Verlagerung der dataProperty-Deklaration außerhalb der Funktionen

async function init() {
    await fetchSignUpData();
  
}

async function fetchSignUpData() {
    let url = `https://remote-storage.developerakademie.org/item?key=User&token=OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M`;
    let response = await fetch(url);
    createdAccounts = await response.json();
    dataProperty = createdAccounts.data;  // Aktualisiere dataProperty mit den Daten aus createdAccounts

    // If 'value' is a string, parse it into a JSON array
        let hombre = JSON.parse(dataProperty['value'])
    

    console.log(hombre[5]);
}

function checkExistence() {
    let mail = document.getElementById('login-email');
    let password = document.getElementById('login-password');  // Korrektur des ID-Namens
}



// Rufe init() auf, um den Datenabruf zu starten
init();
