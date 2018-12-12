// For supers and owners of docs
import React, { Component } from 'react';
import { API_BASE_URL } from '../../Config';
import axios from 'axios';

class ComplaintsDocuments extends React.Component {
  state = {
    complaints: null
  }

  componentDidMount() {
    axios.get(API_BASE_URL + "/complaints")
    .then( response => {
      console.log(response.data);
    })
    .catch( error => {
      console.error("error from cd", error, error.response.data);
    })
  }

  render() {
    var display = this.state.complaints ?
      (
        <h1>Complains (about Documents)</h1>
      )
      :
      null;
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default ComplaintsDocuments;
