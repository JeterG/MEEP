import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import Register from './components/Register';
import OUapply from './components/OUapply';
import Taboos from './components/Taboos';
import UserDirectory from './components/UserDirectory';
import Document from './components/Document';
import DocumentDirectory from './components/DocumentDirectory';
import SearchUsers from './components/SearchUsers';
import SearchDocument from './components/SearchDocument';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="meep-app container">
          <Route exact path="/" component={Landing} />                 {/* Home page*/}
          <Route path="/register" component={Register} />              {/* Allow new users to register guest accounts */}
          <Route path="/apply" component={OUapply} />                  {/* Allow guest users to apply to be an ordinary user */}
          <Route exact path="/docs" component={DocumentDirectory} />   {/* Return directory of all public documents */}
          <Route path="/docs/:doc_id" component={Document} onChange={() => console.log('Entered /')} />            {/* Display the editor for a given document */}
          <Route path="/users" component={UserDirectory} />            {/* Return directory of all public users */}
          <Route path="/users/:u_id" component={DocumentDirectory} />  {/* Display the profile for a given user */}
          <Route path="/taboos" component={Taboos} />       {/* Display the taboo list + suggestion form */}
          <Route path="/searchUsers" component={SearchUsers} />       {/* Allow users to Search users, documents */}
          <Route path="/searchDocument" component={SearchDocument} />       {/* Allow users to Search users, documents */}

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
