import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';

class OUapp extends React.Component {
  state = { "message" : null }

  handleSubmit = (e) => {
    // Prevents default behavior of refreshing the page
    e.preventDefault();

    // Data passed to the server.
    let submitData = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      interests: e.target[2].value,
      userid: this.props.id,
      type: this.props.type
    }

    axios.post(API_BASE_URL + '/OUapp', submitData)
    .then(response => {
      console.log(response.data);
      this.setState(response.data);
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
          <h2>Apply for Promotion</h2>
          <hr />
          <div id="message">
            {this.state.message}
          </div>
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="firstName">First Name</label><br />
            <input type="text" name="firstName" /><br />

            <label htmlFor="lastName">Last Name</label><br />
            <input type="text" name="lastName" /><br />

            <label htmlFor="interests">Interests</label><br/>
            <input type="text" name="interests" /><br />

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default OUapp;
