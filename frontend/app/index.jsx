console.log("Hello World");

import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup LALALA DAAAda';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

fetch("http://localhost:5000/helloWorld").then(res => {
  return res.json();
}).then(myjson => {
  console.log(myjson);
})
