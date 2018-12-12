// For supers
import React, { Component } from 'react';
import { API_BASE_URL } from '../../Config.js';
import axios from 'axios';

class ComplaintsUsers extends React.Component {
  state = {
    complaints: null
  }

  componentDidMount() {
    var self = this;
    axios.get(API_BASE_URL + "/users/complaints")
    .then( response => {
      console.log(response.data);
      self.setState({complaints: response.data});
    })
    .catch( error => {
      console.error("error from cd", error, error.response.data);
    })
  }

  processComplaint = (e) => {
    // Not sure how core.py is going to process user complaints, consult with jeter.
  }

  render() {
    var complainList = this.state.complaints ?
      this.state.complaints.map( c => {
        return (
          <div key={c.c_id}>
            <div>Complaint By: <b>{c.complaintBy}</b></div>
            <div>Complaint About: <b>{c.complaintAbout}</b></div>
            <div className="red-text">{c.problem}</div>
            <button onClick={this.processComplaint}>Process</button>
          </div>
        )
      }) : null;

    return(
      <div>
        <h1>Complaints (about Users)</h1>
        { complainList }
      </div>
    );
  }
}

export default ComplaintsUsers;
