import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';
import axios from 'axios';

import Header from './Header';

class DocumentDirectory extends React.Component {
  state = {
    docs: null
  }

  componentDidMount() {
    this.getDocs();
  }
  getDocs = () => { //get list of docs available for view to this user
    var userData = getLocal("user")
    var {name, type} = userData;

    axios.get(API_BASE_URL + "/docs", {
      params: {
        name: name,
        type: type
      }
    })
    .then(response => {
      console.log(response.data);
      if (response.data.length)
        this.setState({docs: response.data});
    })
  }

  render() {
    var { docs } = this.state;
    var items = docs ? docs.map(doc => {
      return (
        <ul className="collection">
        <li className="collection-item avatar">
          <i className="material-icons circle">description</i>
          <span className="title">
            <li key={doc.doc_id}>
            <Link to={"/docs/" + doc.doc_id}>
              <b>{doc.title}</b><br />
            </Link>
            <em>{doc.owner}</em>
            </li>
          </span>
        </li>
      </ul> 
      );
    })
    : <h3>No documents found</h3>;

    return (
      <div>
      <Header/>
      <hr />
      <h3>
          <div className="col s6">Doc Directory</div>
          </h3>
          <div className="col s12">{items}</div>
      </div>
    )
  }
}

export default DocumentDirectory;
