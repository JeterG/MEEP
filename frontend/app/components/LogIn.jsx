import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';

class LogIn extends React.Component {
  state = { "message" : null }

  handleSubmit = (e) => {
    // Prevents default behavior of refreshing the page
    e.preventDefault();

    // Data passed to the server.
    let submitData = {
      username: e.target[0].value,
      password: e.target[1].value
    }

    axios.post(API_BASE_URL + '/login', submitData)
    .then(response => {
      console.log(response.data);
      this.setState(response.data);
      this.props.setUser(response.data);
    })
    .catch(error => {
      // handle error
      this.setState(error.response.data);
      console.log(error.response);
    });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Sign In</h2>
          <hr />
          <div id="message">
            {this.state.message}
          </div>
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="username">Username</label><br />
            <input type="text" name="username" /><br />

          <label htmlFor="password">Pass</label><br />
          <input type="password" name="password" /><br />
          <button type="submit">Submit</button>
        </form>
        <Link to="/register">Create An Account</Link>
      </div>
    </div>
    )
  }
}

export default LogIn;
