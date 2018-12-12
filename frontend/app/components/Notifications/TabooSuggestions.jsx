// For supers only
import React, { Component } from 'react';
import { API_BASE_URL } from '../../Config.js';
import axios from 'axios';

class TabooSuggestions extends React.Component {
  state = {
    pending: null
  }

  componentDidMount() {
    axios.get(API_BASE_URL + "/pending/taboos")
    .then( response => {
      console.log(response.data);
      this.setState({pending: response.data});
    })
    .catch( error => {
      console.error("error from cd", error, error.response.data);
    })
  }

  acceptWord = (e) => {
    // Create and use API route that calls core.py `updateTabooList()` function
  }

  rejectWord = (e) => {
    // First delete this word from the local copy of pending
  }

  render() {
    var pendingList = this.state.pending ?
      this.state.pending.map( (p, idx) => {
        return (
          <div key={idx}>
            <div>{p}</div>
{/*             <button onClick={this.acceptWord}>Accept</button>
            <button onClick={this.rejectWord}>Reject</button> */}
            <button className="btn waves-effect waves-light" onClick={this.acceptWord}>
              <i className="material-icons left">thumb_up</i>
              Accept
            </button>
            <button className="btn waves-effect waves-light" onClick={this.rejecctWord}>
              <i className="material-icons left">thumb_down</i>
              Reject
            </button>
          </div>
        )
      }) : null;

    return(
      <div>
        <h1 >Taboo Suggestions</h1>
        <div style={{fontSize: 20}}>{pendingList}</div>
      </div>
    );
  }
}

export default TabooSuggestions;
