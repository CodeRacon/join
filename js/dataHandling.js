let separateIndedNum = 0;
loadUserszr();
loadUsers();

localUserData = []; // wird beim ersten Mal in den LocalStorage gepackt und beim zweiten aufruf werden die Server daten in den LocalStorage gepackt


loadLoggedInData();
loadIndexNum();
console.log(num);




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
        user: startData.users[num],
        contacts: startData.contacts
    }
  
    await checkIfArrayExistInServer(combinedUser);
}


async function checkIfArrayExistInServer(combinedUser ) {
    await loadUsers();
     loadLoggedInData();
     
      localUserData = [];
        if(localStorage.length > 0){
            for (let i = 0; i < loggedInData.length; i++) {
                if (startData.users[num].userData.name == loggedInData[i].user.userData.name) {
                    alert('ok');
                    if (startData.users[num].userData.name == 'Guest' && startData.users[num].isLoggedIn == true) {
                            startData.users[num].isLoggedIn = false;
                            storeStartData();
                                alert('hry');
                                loggedInData[i] = combinedUser;
                                storeLoggedInData();
                                localUserData.push(loggedInData[i]);
                                saveUserData();
                                return;
                    }
                    localUserData.push(loggedInData[i]);
                    saveUserData();
                    return;
                }
                
            }
        }
        localUserData.push(combinedUser);
         saveUserData();
    } 
    
    // Wenn combined User im Server vorhanden ist, wird ppt garnicht erst ausgeführt





/*let pageLeave = false;  Könnte villeicht funktionieren

window.onbeforeunload = function() {
  if (pageLeave == false) {
    pageLeave = true;
    localStorage.removeItem('changedData');
    return 'Sind Sie sicher, dass Sie diese Seite verlassen möchten? Ihre Änderungen werden nicht gespeichert.';
  }
}; */


async function letMeCook(){
    await loadUsers(); 
    await loadUserData();
    console.log(startData);
   
    if (loggedInData.length > 0) {
        for (let i = 0; i < loggedInData.length; i++) {
            if (loggedInData[i].hasOwnProperty('user')) {
                if (loggedInData[i].user.userData.name == startData.users[num].userData.name) {
       
                    localUserData[0] = loggedInData[i];
                    saveUserData();
                
                }
               
            }
          
        }
    }
}

letMeCook();      

// ganz oben if true neues guest array und danach false 


window.onbeforeunload = async function() {
    await loadUserData();
    letMeCook();
    loadLoggedInData();
    await youlo();
    
    localStorage.removeItem('changedData');
    
    
};


async function youlo(){
    await loadUserData();
    loadLoggedInData();
  
    for (let i = 0; i < loggedInData.length; i++) { 
     if (loggedInData[i].hasOwnProperty('user')) {
          if (loggedInData[i].user.userData.name ==  localUserData[0].user.userData.name) {
    
            loggedInData[i] = localUserData[0];
            storeLoggedInData();
            localUserData[0] = loggedInData[i];
            saveUserData();
         
           return;
          }         
        }
        
     }
  

     loggedInData.push(localUserData[0]);
     storeLoggedInData();
     
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



