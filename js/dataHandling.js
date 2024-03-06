let separateIndedNum = 0;
loadUserszr();

localUserData = []; // wird beim ersten Mal in den LocalStorage gepackt und beim zweiten aufruf werden die Server daten in den LocalStorage gepackt
let TestStorage = [];

loadamountds();

function loadamountds(){
    let dd = localStorage.getItem('Anzahlomp');
    if(dd){
      TestStorage = JSON.parse(dd);
    }
}

function saveTestArray(){
        let dd = JSON.stringify(TestStorage);
        localStorage.setItem('Anzahlomp', dd);
}

//test bzw ein neuer Variablen name muss mit einem neuen key in den remote storage
async function init(){
    loadIndexNum();
    await loadUserData();
    ppt();
    await loadUsers();
}

async function ppt(){
    await loadUserData();
    await loadUsers();
    let combinedUser = {
        user: startData.users[0],
        contacts: startData.contacts
    }
    await checkIfArrayExistInServer(combinedUser);
}


async function checkIfArrayExistInServer(combinedUser) {
    await loadUserData();
    
   
    
    localUserData.push(combinedUser);
    saveUserData();
    console.log(localUserData[0]);
    // Wenn combined User im Server vorhanden ist, wird ppt garnicht erst ausgeführt
}

function beforeUnloadHandler(event) {
    if(event.persisted){

        return;
    }
    if (document.readyState === 'complete') {
        TestStorage.push(localUserData);
        saveTestArray();
        localStorage.removeItem('changedData');
        return;
    }
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


function linkToNewSite(locateSite, ths, i) {
    let myLink = document.getElementById(locateSite);
    window.location.href = ths[i];
}

let lunk = [];

const links = document.querySelectorAll('a');

function dopemope(){
for (const link of links) {
    console.log(link.id);
    lunk.push(link.id);
}
}

let numForLinkLocation;

dopemope();

function higherNumber() {
    links.forEach((link) => {
        let ths = [];
        let nn;
        link.addEventListener('click', (event) => {
            for (let i = 0; i < lunk.length; i++) {
                if (lunk[i] == link.id) {
                    ths.push(link.href);
                    numForLinkLocation = i;
                    nn = i;
                }  
            }
            console.log(numForLinkLocation);
            // Hier oioipo aufrufen
            oioipo(lunk[numForLinkLocation], nn, ths); // Beachte die Korrektur des Index
        });
    });
}

// ...

// Entferne den vorherigen Aufruf von oioipo hier
function oioipo(idgrapper, i, ths) {
    let dynamicLink = document.getElementById(idgrapper);
        removeBeforeUnloadListener();
        linkToNewSite(idgrapper,ths, i);
        addBeforeUnloadListener();
}

async function loadUserszr(){
    try {
        spezLogInData = JSON.parse(await getItem('LogInData'));
        console.log(spezLogInData);
    } catch(e){
        console.error('Loading error:', e);
    }
}

// Example: Call oioipo with the ID of the link you want to dynamically handle
higherNumber();



