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
    console.log(startData);
    let combinedUser = {
        user: startData.users[num],
        contacts: startData.contacts
    }
    await checkIfArrayExistInServer(combinedUser);
    secondaryArray(startData);
}


function secondaryArray(startData){
    alert('hey')
  console.log(startData);
  loadamountds();
  console.log(TestStorage);
  for (let i = 0; i < startData.length; i++) {
    if (TestStorage[i].hasOwnProperty('users')) {

            localUserData.push(TestStorage[i]);
            saveUserData();
            // in dieser funktion muss noch der save für localUserData eingebaut werden
        
    }
    else{
        return;
    }
  }
}


async function checkIfArrayExistInServer(combinedUser) {
     loadamountds();
    localUserData.push(combinedUser);
     saveUserData();
    // Wenn combined User im Server vorhanden ist, wird ppt garnicht erst ausgeführt
}


/*let pageLeave = false;  Könnte villeicht funktionieren

window.onbeforeunload = function() {
  if (pageLeave == false) {
    pageLeave = true;
    localStorage.removeItem('changedData');
    return 'Sind Sie sicher, dass Sie diese Seite verlassen möchten? Ihre Änderungen werden nicht gespeichert.';
  }
}; */



window.onbeforeunload = async function() {
    // newarray.push('changedData') == Option1
    await youlo();
    localStorage.removeItem('changedData');
};



async function youlo(){
    await loadUserData();
    loadamountds();
    // newarray.push('changedData') == Option2 -> und muss ind die if anweisung statt localUserData rein
    for (let i = 0; i < TestStorage.length; i++) { 
     if (TestStorage[i].hasOwnProperty('user')) {
          if (TestStorage[i].user.registerData.Data.name ==  localUserData[0].user.registerData.Data.name) {
            alert('yolow');
            TestStorage[i] = localUserData[0];
            saveTestArray();
            localUserData[0] = TestStorage[i];
            saveUserData();
            // delete newarray from storage here
            return;
          }                 
        }  
     }
     TestStorage.push(localUserData[0]);
     saveTestArray();   
     return;
    
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



