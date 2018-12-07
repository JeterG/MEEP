import axios from 'axios';
import React, { Component } from 'react';
import { API_BASE_URL } from '../Config';

class Register extends React.Component {

  handleSubmit = (e) => {
    // Prevents default behavior of refreshing the page
    e.preventDefault();

    // Data passed to the server.
    let submitData = {
      username: e.target[0].value,
      password: e.target[1].value,
      interests: e.target[2].value
    }

    axios.post(API_BASE_URL + '/register', submitData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h2>Regististration for New Users</h2>
        <hr />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" /><br />

          <label htmlFor="password">Pass</label><br />
          <input type="password" name="password" /><br />

          <label htmlFor="interests">Interests</label><br />
          <input type="string" name="interests" /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Register;
