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
    if (startData.users[num].userData.name == 'Guest') {
        alert('heysxoyxc');
        let guestUser = {
            user: startData.users[num],
            contacts: {}
        }
        await checkIfArrayExistInServer(guestUser);
        return;
    } 
    let combinedUser = {
        user: startData.users[num],
        contacts: startData.contacts
    }
    await checkIfArrayExistInServer(combinedUser);
}


async function checkIfArrayExistInServer(combinedUser) {
    
     loadamountds();
    // hier das ganze im server speichern usw
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


console.log(startData);

async function letMeCook(){
    await loadUsers(); 
    await loadUserData();
    console.log(startData);
    console.log(TestStorage[1]);
    if (TestStorage.length > 0) {
        for (let i = 0; i < TestStorage.length; i++) {
            if (TestStorage[i].hasOwnProperty('user')) {
                if (TestStorage[i].user.userData.name == startData.users[num].userData.name) {
                    alert('oh mnow');
                    localUserData[0] = TestStorage[i];
                    saveUserData();
                
                }
               
            }
          
        }
    }
}

letMeCook();      

async function fati(){
    await loadUsers()
    loadamountds();
    loadUserData();
    if (startData.users[num].tasks.length == 0) {
      
            TestStorage[0] = startData.users[num];
            saveTestArray();
          
        saveUserData();
        
}
startData.users[num].tasks.push('full')
storeStartData();
    if ( startData.users[num].tasks.length > 0) {
        startData.users[num].tasks.push('full')
        storeStartData();
        saveTestArray();
        
     }
    console.log(localUserData);
}

fati();

window.onbeforeunload = async function() {
    await loadUserData();
    letMeCook();
    loadamountds();
    await youlo();
    fati();
 
    localStorage.removeItem('changedData');
     
 
    
};


async function youlo(){
    await loadUserData();
    loadamountds();
  
    for (let i = 0; i < TestStorage.length; i++) { 
     if (TestStorage[i].hasOwnProperty('user')) {
          if (TestStorage[i].user.userData.name ==  localUserData[0].user.userData.name) {
            alert('yolow');
            TestStorage[i] = localUserData[0];
            saveTestArray();
            localUserData[0] = TestStorage[i];
            saveUserData();
         
           return;
          }         
        }
        
     }
  
    if (startData.users[num].tasks.length > 0) {
        
    }
     TestStorage.push(localUserData[0]);
     saveTestArray();
     
     return;
     // unter mir besser in den else teik
    
    
}
// Hinzufügen des Event-Listeners




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



