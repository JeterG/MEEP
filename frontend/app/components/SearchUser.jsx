import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';
import axios from 'axios';
import Header from './Header';

class SearchUser extends React.Component{
  state = {
    searchType: "Username", // DEFAULT
    data: null
  }

  componentDidMount() {
    // let elems = document.querySelectorAll('.dropdown-trigger');
    // M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
    this.getAllUsers()
  }
  getAllUsers = () => {
    var userData = getLocal("user");
    axios.get(API_BASE_URL + "/searchUser")
    .then(response => {
      console.log(response.data);
      if (response.data.length)
        this.setState({data: response.data});
    })
  }
  // change = (e) => {
  //   this.setState({searchType: e.target.value});
  //   this.getData();
  // }
  // getData = () => {
  //   var userData = getLocal("user");
  //   axios.get(API_BASE_URL + "/searchUser", {
  //     params: {
  //       searchType: this.state.searchType,
  //       username: userData.name
  //     }
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //     if (response.data.length)
  //       this.setState({data: response.data});
  //   })
  // }


  handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior

    let submitData = {  // pass data to server
      search : e.target[0].value
    }
    //filter
  }

  render() {
    var resultList = this.state.data ?
    this.state.data.map( user => {
      var interests = user.interests.length > 0 ?
        user.interests.map( interest => {
          return <p key={interest}>{interest}</p>
        })
        : null

      return (
        <div key={user.id}>
          <Link to={"/user/" + user.id}> {user.name}</Link> <br />
          {interests} <br />
        </div>
      );
    })
    : <p>No results found.</p>

    return(
      <div>
        <Header />
        <h2>Search Users</h2>
        <div className="search-type"onChange={this.change}>
          <select className="browser-default">
              <option value="Username">Username</option>
              <option value="Name">Name</option>
              <option value="Interest">Interest</option>
          </select>
        </div>
        <br/>

        <div className="search-container">
          <form onSubmit={ this.handleSubmit }>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input id="search" type="text" className="validate" />
                <label htmlFor="search">Search...</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">search</i>
            </button>
          </form>
        </div>
        <div>{resultList}</div>
      </div>
    )
  }
}

export default SearchUser;
