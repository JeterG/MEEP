import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LogIn from './components/LogIn';
import Register from './components/Register'
import Home from './components/Home';
import Editor from './components/Editor/Editor';
import Document from './components/Document';
import DocumentDirectory from './components/DocumentDirectory';

class App extends React.Component {
  state = {
    user: null
    // user: {
    //   id: 0,
    //   name: "myusername",
    //   type: "guest",
    //   pic: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
    // }
  }

  componentWillMount = () => {
    // Get user log in status.
    var currentUser = localStorage.user ? JSON.parse(localStorage.user) : null;
    this.setState({user: currentUser});
  }

  render() {
    var { user } = this.state;
    var display = user ?
      <Home user={user} />
    : <LogIn />
    return (
      <BrowserRouter>
        <div className="meep-app">
          <Route exact path="/" component={LogIn} />             {/* Home page*/}
          <Route path="/register" component={Register} />     {/* Allow new users to register guest accounts */}
          <Route path="/documents" component={DocumentDirectory} />    {/* Return directory of all public documents */}
          <Route path="/doc/:doc_id" component={Document} />           {/* Display the editor for a given document */}
          <Route path="/users" component={DocumentDirectory} />        {/* Return directory of all public users */}
          <Route path="/user/:u_id" component={DocumentDirectory} />   {/* Display the profile for a given user */}
          <Route path="/taboos" component={DocumentDirectory} />       {/* Display the taboo list + suggestion form */}
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
