// For super users only
import React, { Component } from 'react';
import { API_BASE_URL } from '../../Config.js';
import axios from 'axios';

class Applications extends React.Component {
  state = {
    applications: null
  }
  // updateMembership(userobj) 352
  componentDidMount() {
    axios.get(API_BASE_URL + "/pending/apps")
    .then( response => {
      console.log("pending applications,", response.data);
      this.setState({applications: response.data});
    })
    .catch( error => {
      console.error("error from cd", error, error.response.data);
    })
  }

  render() {
    var appList = this.state.applications ?
      this.state.applications.map( app => {
        // Something is wrong with the user object structure,
        // the "first" and "last" fields in app[0] are empty,
        // should show their first and last names which are in
        // another array. 
        return (
          <div key={app[0].id}>
            <div><b>{app[0].name}</b> wants to be promoted to Ordinary User.</div>
            <div>Their name is {app[1][0][0] + " " + app[1][0][1]}</div>
            <div>Their interests are {app[1][1]}</div>
            <button>Approve</button>
            <button>Reject</button>
          </div>
        )
      }) : null;

    return(
      <div>
        <h1>Applications for Ordinary Users</h1>
        { appList }
      </div>
    );
  }
}

export default Applications;
