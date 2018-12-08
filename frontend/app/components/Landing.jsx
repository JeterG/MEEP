import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn';
import Home from './Home';

class Landing extends React.Component {
  state = {
    user: null
  }

  setUser = (user) => {
    console.log("Trying to set user...", user);
    this.setState({ user: user });
  }

  componentDidMount = () => {
    // Get user log in status.
    var currentUser = localStorage.user ? JSON.parse(localStorage.user) : null;
    // console.log("The current user is...", JSON.parse(localStorage.user))
    this.setState({user: currentUser});
  }

  render() {
    var { user } = this.state;
    var setUser = this.setUser;

    var display = user ?
      <Home user={user} />
    : (
      <div>
        <LogIn setUser={setUser} history={this.props.history} />
        <Link to="/register">Create An Account</Link>
      </div>
    )

    return (
      <div>
        { display }
      </div>
    )
  }
}

export default Landing;
