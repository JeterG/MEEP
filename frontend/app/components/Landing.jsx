import React, { Component } from 'react';
import LogIn from './LogIn';
import Home from './Home';

class Landing extends React.Component {
  state = {
    user: null
  }

  setUser = (user) => {
    this.setState({ user: user });
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
    : <LogIn setUser={this.setUser} />

    return (
      <div>
        { display }
      </div>
    )
  }
}

export default Landing;
