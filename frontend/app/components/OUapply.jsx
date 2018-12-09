import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../Config';

class OUapply extends React.Component {
  state = { "message" : null,
            redirect: false}

  handleSubmit = (e) => {
    // Prevents default behavior of refreshing the page
    e.preventDefault();

    var userData = JSON.parse(localStorage.user);

    // Data passed to the server.
    let submitData = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      interests: e.target[2].value,
      username: userData.name
    }

    axios.post(API_BASE_URL + '/apply', submitData)
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
    return (
      <div>
        <div className="header" style={{display: "inline-block", marginRight: "40px"}}>
          {this.renderRedirect()}
          <img src="/images/logo.png" onClick={this.setRedirect}/>
        </div>
        <div style={{display: "inline-block"}}>
          <nav>
          <ul>
            <li><Link to="/editor">New Document</Link></li>
            <li><Link to="/docs">All Documents</Link></li>
            <li><Link to="/taboos">Taboo List</Link></li>
          </ul>
          </nav>
        </div>

        <div className="body">
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
      </div>
    )
  }
}

export default OUapply;
