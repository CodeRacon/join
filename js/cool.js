function beforeUnloadHandler(event) {
    if(event.persisted){   
        return;
    }
    if (document.readyState === 'complete') {
        
        localStorage.removeItem('changedData');
        return;
    }
}



// Hinzufügen des Event-Listeners

window.addEventListener('beforeunload', beforeUnloadHandler);