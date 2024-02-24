let test = [

];

//test bzw ein neuer Variablen name muss mit einem neuen key in den remote storage
async function init(){
    loadIndexNum();
     ppt();
    await loadUsers();
}

async function ppt(){
    await loadUsers();
    let combinedUser = {
        user: startData.users[num],
        contacts: startData.contacts
    }
    checkIfArrayExistInServer(combinedUser);
}

function checkIfArrayExistInServer(combinedUser){
    for (let i = 0; i < test.length; i++) {
        if (test[i].hasOwnProperty('user') && test[i].hasOwnProperty('contacts')) {
            if (test[i].user == combinedUser.user) {
                alert('hey');
                return; 
            }
        }
    }
    test.push(combinedUser);
}



window.addEventListener('unload', (event) =>{
        if(window.closed){
         localStorage.removeItem('accesToData');
         loadIndexNum();
        }
    } 
);