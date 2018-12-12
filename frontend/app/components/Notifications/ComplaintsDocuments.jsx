// For supers and owners of docs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../Config';
import axios from 'axios';

class ComplaintsDocuments extends React.Component {
  state = {
    complaints: null
  }

  componentDidMount() {
    var self = this;
    axios.get(API_BASE_URL + "/docs/complaints")
    .then( response => {
      console.log(response.data);
      self.setState({complaints: response.data});
    })
    .catch( error => {
      console.error("error from cd", error, error.response.data);
    })
  }

  processComplaint = (e) => {
    // Call API to use core.py processComplaintDocuments() function
    // It accepts a User object, so send the current user's id as submit data
  }

  render() {
    var complainList = this.state.complaints ?
      this.state.complaints.map( c => {
        return (
          <div key={c.c_id}>
            <div><Link to={"/docs/" + c.doc_id}>{"/docs/" + c.doc_id}</Link></div>
            <div>Complaint By: <b>{c.complaintBy}</b></div>
            <div>Complaint About: <b>{c.complaintAbout}</b></div>
            <div className="red-text">{c.problem}</div>
            <button onClick={this.processComplaint}>Process</button>
          </div>
        )
      }) : null;

    return (
      <div>
        <h1>Complaints (about Documents)</h1>
        {complainList}
      </div>
    );
  }
}

export default ComplaintsDocuments;
