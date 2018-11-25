import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// fetch("http://localhost:5000/helloWorld").then(res => {
//   return res.json();
// }).then(myjson => {
//   console.log(myjson);
// })

// Since our app will use HTML5 LocalStorage API, and not all browsers support it,
// only load the app if the localstorage object is available to us.
if (storageAvailable('localStorage')) {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}
else {
  ReactDOM.render(
    <p>Local storage is unsupported</p>,
    document.getElementById('app')
  );
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
