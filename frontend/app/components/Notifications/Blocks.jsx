// For any user
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../Config';
import axios from 'axios';

class Blocks extends React.Component {
  state = {
    blocked: false,
    doc_id: null,
    doc_name: null,
    reason: null
  }

  componentDidMount() {
      var user = getLocal("user");
      axios.get(API_BASE_URL + "/users/" + user.id + "/blocked")
      .then( response => {
        console.log("user block", response.data);
        this.setState({...response.data})
      })
      .catch( error => {
        console.error("Blocks error", error, error.response.data);
      })
  }

  render() {
    var blocked = this.state.blocked ?
        (
          <div>
            <h4>You are BLOCKED because of taboo word in</h4>
            <div>Document: <Link to={"/docs/" + this.state.doc_id}>{this.state.doc_name}</Link></div>
            <div>Line Number: {this.state.reason}</div>
            <h4>The offending line must be corrected before you can access any other features</h4>
          </div>
        ): null;

    return (
      <div>
        <h1>Blocks</h1>
        {blocked}
      </div>
    );
  }
}

export default Blocks;
