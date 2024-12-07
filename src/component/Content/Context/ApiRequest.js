const { createContext } = require('react');

const apiData = 'http://192.168.155.2:4000/data';

function handleData(data, method) {
    const url = method == 'POST' ? apiData : apiData + `/${data.id}`;
    const request = fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (request) {
        console.log(`${method} Success`)

    }
    else { 
        console.log(`${method} Error`)

    }
        location.reload()

}

export { handleData };
