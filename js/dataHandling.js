let separateIndedNum = 0;

let localUserLogin = []; // wird beim ersten Mal in den LocalStorage gepackt und beim zweiten aufruf werden die Server daten in den LocalStorage gepackt

function loadLocalLoginData(){
    let loadLocalLogin = localStorage.getItem('LogInData');
    if(loadLocalLogin){
        localUserLogin = JSON.parse(loadLocalLogin);
    }
}

function saveLocalLoginData(){
    let saveLocalLogin = JSON.stringify(localUserLogin);
    localStorage.setItem('LogInData', saveLocalLogin);
} 
//test bzw ein neuer Variablen name muss mit einem neuen key in den remote storage
async function init(){
    loadIndexNum();
    loadLocalLoginData();
     ppt();
    await loadUsers();
}



async function ppt(){
    await loadUsers();
    let combinedUser = {
        user: startData.users[0],
        contacts: startData.contacts
    }
    if (checkIfArrayExistInServer(combinedUser) == true) {
        // localStorage wird an die Stelle gepackt wo es ursprünglich im server war es wird sozusagen ersetzt meine damen und herren;
        return 1;
    }
}


function checkIfArrayExistInServer(combinedUser){
    loadLocalLoginData();
    for (let i = 0; i < localUserLogin.length; i++) {
        if (localUserLogin[i].hasOwnProperty('user') && localUserLogin[i].hasOwnProperty('contacts')) {
            if (localUserLogin[i].user == combinedUser.user) {
                alert('heyo');
                localUserLogin[i] = combinedUser;
                separateIndedNum = i;
                return true; 
            }
        }
    }
    localUserLogin.push(combinedUser);
    saveLocalLoginData();
    console.log(localUserLogin[0]);
    // wenn combined User im Server vorhanden ist wird ppt garnicht erst ausgeführt 
}

/*window.addEventListener('unload', () =>{
        if(window.closed){
            localStorage.removeItem('accesToData');
         localStorage.removeItem('LogInData');
          for (let i = 0; i < loginData.length; i++) {
            if(loginData[i].hasOwnProperty('user') && loginData[i].hasOwnProperty('contacts')){
                if(loginData[i].user == localUserLogin.user){
                    loginData[i] = localUserLogin;
                }
            }
          }
         
        }
    } 
);
*/
function beforeUnloadHandler(event) {
    if (event.persisted) {
        return;
    }

    localStorage.removeItem('accesToData');
    localStorage.removeItem('LogInData');
}

// Hinzufügen des Event-Listeners
window.addEventListener('beforeunload', beforeUnloadHandler);

// Funktion zum Entfernen des Event-Listeners
function removeBeforeUnloadListener() {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
}

// Funktion zum Wiederhinzufügen des Event-Listeners
function addBeforeUnloadListener() {
    window.addEventListener('beforeunload', beforeUnloadHandler);
}

let myLink = 0;




function linkToNewSite(locateSite) {
    let myLink = document.getElementById(locateSite);
    window.location.href = myLink.href;
}

let lunk = [];
const links = document.querySelectorAll('a');

function dopemope(){
for (const link of links) {
    console.log(link.id);
    lunk.push(link.id);
}
}

dopemope();

let numForLinkLocation = -1;

function numForLinkAcces(idOfAElement){
    for (const linkAccess of links) {
        if (linkAccess.id == idOfAElement) {
            alert('yolo');
        }
    }
}

function oioipo(idgrapper) {
    let dynamicLink = document.getElementById(idgrapper);
    dynamicLink.addEventListener('click', (event) => {
        event.preventDefault();
        removeBeforeUnloadListener();
        linkToNewSite(idgrapper);
        addBeforeUnloadListener();
    });
}

// Example: Call oioipo with the ID of the link you want to dynamically handle

oioipo(lunk[0]);


