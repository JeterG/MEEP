import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../Config';
import Header from './Header';

class UserDirectory extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    axios.get(API_BASE_URL + "/users").then(response => {
      console.log(response);
      this.setState({users: response.data});
    })
  }

  render() {
    var { users } = this.state;
    var items = users ? users.map(u => {
      return (
        <li key={u.id}>
          <b>{u.name}</b><br />
          <em>{u.type}</em>
        </li>
      );
    })
    : "No users found";

    return (
      <div>
        <Header />
        <h1>User Directory</h1>
        <ul>
        { items }
        </ul>
      </div>
    )
  }
}

export default UserDirectory;
