import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';
import axios from 'axios';
import Header from './Header';

class Search extends React.Component{
  
  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
}
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
{/*         <div className="search-type">
        <select className="browser-default">
            <option value="Document">Document</option>
            <option value="Username">Username</option>
            <option value="Name">Name</option>
            <option value="Interest">Interest</option>
        </select>
        </div> */}
        <br/>

        <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Select...</a>
        <ul id='dropdown1' className='dropdown-content'>
          <li><a href="#!" value="Document">Document</a></li>
          <li><a href="#!" value="Username">Username</a></li>
          <li><a href="#!" value="Name">Name</a></li>
          <li><a href="#!" value="Interest">Interest</a></li>
        </ul>

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
      </div>
    )
  }
}

export default Search;
