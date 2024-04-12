let separateIndedNum = 0;

loadUsers();

localUserData = []; // wird beim ersten Mal in den LocalStorage gepackt und beim zweiten aufruf werden die Server daten in den LocalStorage gepackt

loadLoggedInData();
loadIndexNum();

async function init() {

    loadIndexNum();
    await loadUserData();
    sendCombinedUserToServer();
    await loadUsers();
}

async function sendCombinedUserToServer() {
    await loadUserData();
    await loadUsers();

    let combinedUser = {
        user: startData.users[num],
        contacts: startData.contacts
    }

    await checkIfArrayExistInServer(combinedUser);
}


async function checkIfArrayExistInServer(combinedUser) {
    await loadUsers();
    await loadLoggedInData()

    localUserData = [];
    if (resetExistingGuestAccount(combinedUser) == true) {
        return;
    }
    localUserData.push(combinedUser);
    deleteSecondElementFromLocalUserData();
    saveUserData();
}


async function resetExistingGuestAccount(combinedUser) {
    if (localStorage.length > 0) {
        for (let i = 0; i < loggedInData.length; i++) {
            if (startData.users[num].userData.name == loggedInData[i].user.userData.name) {

                if (startData.users[num].userData.name == 'Guest' && startData.users[num].setToOriginallyState == true) {
                    if (await resetToOriginalyGuestData(i, combinedUser)) {
                        deleteSecondElementFromLocalUserData();
                        return true;
                    }
                }
                localUserData.push(loggedInData[i]);
                deleteSecondElementFromLocalUserData();
                saveUserData();
                return true;
            }

        }
    }
}

function deleteSecondElementFromLocalUserData(){
    loadUserData();
    if (localUserData.length > 1) {
        localUserData.splice(1, 1);
        saveUserData();
    }
}

async function resetToOriginalyGuestData(i, combinedUser) {
    startData.users[num].setToOriginallyState = false;
    storeStartData();
    loggedInData[i] = combinedUser;
    await storeLoggedInData();
    localUserData.push(loggedInData[i]);
    saveUserData();
    return true;
}


async function synchronizeUserDataWithLocalStorage() {
    await loadUsers();
    await loadUserData();
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

synchronizeUserDataWithLocalStorage();

// ganz oben if true neues guest array und danach false 


window.onbeforeunload = async function () {
    await loadUserData();
    synchronizeUserDataWithLocalStorage();
    loadLoggedInData();
    await pushFromServerToStorage();
    deleteSecondElementFromLocalUserData();
    localStorage.removeItem('changedData');


};


async function pushFromServerToStorage() {
    await loadUserData();
    loadLoggedInData();
    for (let i = 0; i < loggedInData.length; i++) {
        if (loggedInData[i].hasOwnProperty('user')) {
            if (loggedInData[i].user.userData.name == localUserData[0].user.userData.name) {
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
}

function removeBeforeUnloadListener() {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
}

function addBeforeUnloadListener() {
    window.addEventListener('beforeunload', beforeUnloadHandler);
}

let myLink = 0;

function linkToNewSite(locateSite, secHrefArray, i) {
    let myLink = document.getElementById(locateSite);
    window.location.href = secHrefArray[i];
}

let hrefs = [];

const links = document.querySelectorAll('a');

function pushAhrefsInArray() {
    for (const link of links) {

        hrefs.push(link.id);
    }
}

let numForLinkLocation;

pushAhrefsInArray();

function higherNumber() {
    links.forEach((link) => {
        let secHrefArray = [];
        let nn;
        link.addEventListener('click', (event) => {
            for (let i = 0; i < hrefs.length; i++) {
                if (hrefs[i] == link.id) {
                    secHrefArray.push(link.href);
                    numForLinkLocation = i;
                    nn = i;
                }
            }
            // Hier oioipo aufrufen
            addBeforeunloadEventToNewSite(hrefs[numForLinkLocation], nn, secHrefArray); // Beachte die Korrektur des Index
        });
    });
}



function addBeforeunloadEventToNewSite(idgrapper, i, secHrefArray) {
    let dynamicLink = document.getElementById(idgrapper);
    removeBeforeUnloadListener();
    linkToNewSite(idgrapper, secHrefArray, i);
    addBeforeUnloadListener();
}


higherNumber();
