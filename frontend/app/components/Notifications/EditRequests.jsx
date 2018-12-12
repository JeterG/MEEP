// For any user
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../Config';
import axios from 'axios';

class EditRequests extends React.Component {
  render() {
    return(
      <div>
        <h1>Requests for Document Access</h1>
      </div>
    );
  }
}

export default EditRequests;
