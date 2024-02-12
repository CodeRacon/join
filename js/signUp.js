// SignUp
let createdAccountInfo = [];
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
    for (let i = 0; i < createdAccountInfo.length; i++) {
        if (createdAccountInfo[i]['name'] == name.value || createdAccountInfo[i]['email'] == email.value || createdAccountInfo[i]['pasword'] == paswort.value) {
            alert('hey');
            return true;
        }
    }
}

async function pushIntoArray(name, email, paswort){
    window.open('index.html');
    let accountInfo = {
        "name": name.value,
        "email": email.value,
        "pasword":paswort.value 
    };   
    createdAccountInfo.push(accountInfo);
    await setItem('User', JSON.stringify(createdAccountInfo));
    console.log(createdAccountInfo);
}

async function loadUsers(){
    try {
        createdAccountInfo = JSON.parse(await getItem('User'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

function toogleNum(){
    cancelFunction = 1;  
}
// Funktion bei der der agb button angeclickt wird und dan auf 1 kommt wenn dies geschieht kann der button benutzt werden sont nicht

// https://remote-storage.developerakademie.org/item?key=User&token=OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M