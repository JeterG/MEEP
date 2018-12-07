import React, { Component } from 'react';
import LogIn from './LogIn';
import Home from './Home';

class Landing extends React.Component {
  state = {
    user: null
    // user: {
    //   id: 0,
    //   name: "myusername",
    //   type: "guest",
    //   pic: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
    // }
  }

  componentDidMount = () => {
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
      <div>
        { display }
      </div>
    )
  }
}

export default Landing;
