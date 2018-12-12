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
            <div style={{fontSize: 20}}><Link to={"/docs/" + c.doc_id}>{"/docs/" + c.doc_id}</Link></div>
            <div style={{fontSize: 20}}>Complaint By: <b>{c.complaintBy}</b></div>
            <div style={{fontSize: 20}}>Document Owner: <b>{c.complaintAbout}</b></div>
            <div className="red-text" style={{fontSize: 20}}>{c.problem}</div>
{/*             <button onClick={this.processComplaint}>Process</button>
 */}            <button className="btn waves-effect waves-light" onClick={this.processComplaint}>
              <i className="material-icons right">keyboard_arrow_right</i>
              Process
            </button>
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
