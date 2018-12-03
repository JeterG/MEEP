import axios from 'axios';
import React, { Component } from 'react';
import { API_BASE_URL } from '../Config';

class LogIn extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    let submitData = {
      username: e.target[0].value,
      password: e.target[1].value
    }

    axios.post(API_BASE_URL + '/login', submitData).then(response => {
      console.log(response.data);
    }).catch(error => {
      // handle error
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <hr />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" /><br />

          <label htmlFor="password">Pass</label><br />
          <input type="password" name="password" /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LogIn;
