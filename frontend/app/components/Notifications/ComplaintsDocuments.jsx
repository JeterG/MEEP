// For supers and owners of docs
import React, { Component } from 'react';
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

  render() {
    console.log("rendered", this.state);

    var title = this.state.complaints ?
      (
        <h1>Complaints (about Documents)</h1>
      ) : null;

    var complainList = this.state.complaints ?
      this.state.complaints.map( c => {
        return (
          <div key={c.c_id}>{c.problem}</div>
        )
      }) : null;

    return (
      <div>
        {title}
        {complainList}
      </div>
    );
  }
}

export default ComplaintsDocuments;
