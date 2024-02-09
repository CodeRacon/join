const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'OLCMKPDCPKF9TQULRK3MARG5U8JK2GGGL5588K0M';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    try{
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
    }catch{
        console.log('nixgehen');
    }
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

