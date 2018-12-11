import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';
import axios from 'axios';
import Header from './Header';

class Search extends React.Component{
  state = {
    searchType: "Document" // DEFAULT
  }
  handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior

    let submitData = {  // pass data to server
      search : e.target[0].value
    }
    // create a get request
    // redirect page to results

  }
// guest users can ONLY search available documents. THAT IS IT!!
  render() {
    return(
      <div>
        <Header />
        <h2>Search</h2>
        <div className="search-type">
        <select className="browser-default">
            <option value="Document">Document</option>
            <option value="Username">Username</option>
            <option value="Name">Name</option>
            <option value="Interest">Interest</option>
        </select>
        </div>
        <div className="search-container">
          <form onSubmit={ this.handleSubmit }>
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Search;
