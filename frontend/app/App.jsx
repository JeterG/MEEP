import React, { Component } from 'react';
import Config from './Config';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Editor from './components/Editor/Editor';
import axios from 'axios';

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
    axios.post(Config.API_BASE_URL + '/login').then(response => {
      console.log(response);
    }).catch(error => {
      // handle error
      console.log(error);
    })

    var currentUser = localStorage.user ? JSON.parse(localStorage.user) : null;
    this.setState({user: currentUser});
  }

  render() {
    var {user} = this.state;
    return (
      user ? <Home user={user} /> : <LogIn />
    )
  }
}

export default App;
