import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../Config';

class Register extends React.Component {
  state = { "message" : null,
            register : false,
            redirect : false}

  handleSubmit = (e) => {
    // Prevents default behavior of refreshing the page
    e.preventDefault();

    // Data passed to the server.
    let submitData = {
      username: e.target[0].value,
      password: e.target[1].value,
    }

    axios.post(API_BASE_URL + '/register', submitData)
    .then(response => {
      saveLocal("user", response.data);

      // Redirect to "/"
      this.props.history.push('/');
    })
    .catch(error => {
      // handle error
      console.error("register error", error);
      this.setState(error.response.data);
    });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    console.log(this.props);

    return (
      <div className="card-panel green accent-2">
{/*         <div className="header" style={{display: "inline-block", marginRight: "40px"}}>
          {this.renderRedirect()}
          <img src="/images/logo.png" onClick={this.setRedirect}/>
        </div> */}
        <div className="container">
          <div className="center-align">
            {this.renderRedirect()}
            <img src="/images/logo.png" onClick={this.setRedirect}/>
              <div>
                <h3>New User Registration</h3>
                <hr />
                <div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Register;
