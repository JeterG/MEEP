import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../Config';
import Header from './Header';
import Editor from './Editor/Editor';

class Users extends React.Component {
  state = {
    userSearch: null, // user's page
    documents: null // user's documents
  }

  componentDidMount() {
    var { u_id } = this.props.match.params;
    var userData = getLocal('user');

    console.log("component mount", u_id, this.props.match);
    if (Number.isInteger(Number(u_id))) {
      // GET user from API request
      var payload = {
        user_id: u_id,
        username: userData.id
      }
      this.getUser(u_id, payload);
    }
  }

  getUser = (id, payload) => {
    axios.get(API_BASE_URL + "/user/" + id, payload)
    .then( response => {
      console.log("got user information", response.data)
      this.setState({userSearch: response.data})
    })
    .catch( error => {
      console.error("Document error: ", error, error.response.data);
    })
  }

  render() {
    console.log("Inside Users render", this.state)
    var {document} = this.state;

    var user = this.state.userSearch;

    var name, type, pic;

    if (user) {
      name = user.name;
      type = user.type;
      pic = user.pic;
    }

    var display = user ? (
      <div>
        <div style={{fontSize: 30}}>{name.toUpperCase()}</div>
        <div style={{fontSize: 20}}>{type.toUpperCase()} user</div>
        <img className="profile-pic" src={pic} style={{paddingTop: 20}}/>
      </div>
    ) : <h2>User Does Not Exist</h2>;

    return (
      <div className="user">
        <Header/>
        <hr/>
        {display}
  {/*      <div className="col s12">
          <img className="profile-pic" src={pic} style={{paddingTop: 20}}/>
            <div style={{fontSize: 20}}>{type.toUpperCase()} user</div>
            <div style={{fontSize: 30}}>Welcome, {name.toUpperCase()}!</div>
         </div> */}
      </div>
    )
  }
}

export default Users;
