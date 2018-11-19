import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor.jsx';

ReactDOM.render(
  <Editor />,
  document.getElementById('app')
);

// fetch("http://localhost:5000/helloWorld").then(res => {
//   return res.json();
// }).then(myjson => {
//   console.log(myjson);
// })
