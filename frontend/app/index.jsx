import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Editor from './components/Editor/Editor';

ReactDOM.render(
  <Editor />, //to see editor, change out Editor with App to see homepage
  document.getElementById('app')
);

// fetch("http://localhost:5000/helloWorld").then(res => {
//   return res.json();
// }).then(myjson => {
//   console.log(myjson);
// })
