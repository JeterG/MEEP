import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import Register from './components/Register';
import OUapply from './components/OUapply';
import UserDirectory from './components/UserDirectory';
import Editor from './components/Editor/Editor';
import Document from './components/Document';
import DocumentDirectory from './components/DocumentDirectory';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="meep-app">
          <Route exact path="/" component={Landing} />                   {/* Home page*/}
          <Route path="/register" component={Register} />              {/* Allow new users to register guest accounts */}
          <Route path="/apply" component={OUapply} />                  {/* Allow guest users to apply to be an ordinary user */}
          <Route path="/documents" component={DocumentDirectory} />    {/* Return directory of all public documents */}
          <Route path="/doc/:doc_id" component={Document} />           {/* Display the editor for a given document */}
          <Route path="/users" component={UserDirectory} />        {/* Return directory of all public users */}
          <Route path="/user/:u_id" component={DocumentDirectory} />   {/* Display the profile for a given user */}
          <Route path="/taboos" component={DocumentDirectory} />       {/* Display the taboo list + suggestion form */}
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
