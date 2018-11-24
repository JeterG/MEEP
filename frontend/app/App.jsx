import React, { Component } from 'react';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Editor from './components/Editor/Editor';

class App extends React.Component {

  state = {
    user: {
      id: 0,
      name: "myusername",
      type: "guest",
      pic: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
    }
  }

  componentWillMount = () => {
    // Get user log in status.
  }

  render() {
    var {user} = this.state;
    return (
      user ? <Home user={user} /> : <LogIn />
    )
  }
}

export default App;
