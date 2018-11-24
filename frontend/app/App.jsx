import React, { Component } from 'react';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Editor from './components/Editor/Editor';

class App extends React.Component {

  state = {
    username: null
  }

  componentWillMount = () => {
    // Get user log in status.
  }

  render() {
    var {username} = this.state;
    return (
      username ? <Home /> : <LogIn />
    )
  }
}

export default App;
