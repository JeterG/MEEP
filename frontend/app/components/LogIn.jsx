import axios from 'axios';
import React, { Component } from 'react';
import { API_BASE_URL } from '../Config';
import '../../public/css/materialize.min.css';
import M from '../../public/js/materialize.min.js';

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
      this.setState(response.data);

      saveLocal("user", response.data);

      // Redirect to "/"
      window.location.reload();
    })
    .catch(error => {
      // handle error
      console.error("login error", error);
      this.setState(error.response.data);
    });
  }

  render() {
    return (
      <div className="card-panel light-blue accent-1">
        <div className="container">
          <div className="center-align">
            <img src="/images/logo.png" />
          <div>
            <h3>Sign In</h3>
            <hr />
            <div id="message">
              {this.state.message}
            </div>
            <form onSubmit={ this.handleSubmit }>
              <div className="row">
                <div className="input-field col s6 offset-m3">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="username" type="text" className="validate" />
                  <label htmlFor="username">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 offset-m3">
                <i className="material-icons prefix">lock</i>
                  <input id="password" type="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
                </button>
              {/*<button type="submit">Submit</button> */}
              </form>
        </div>
      </div>
    </div>
    </div>
    )
  }
}

export default LogIn;
