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
        <li key={doc.doc_id}>
          <Link to={"/docs/" + doc.doc_id }>
            <b>{doc.title}</b><br />
          </Link>
          <em>{doc.owner}</em>
        </li>
      );
    })
    : <h3>No documents found</h3>;

    return (
      <div>
      <Header/>
        <h1>Doc Directory</h1>
        <ul>
        { items }
        </ul>
      </div>
    )
  }
}

export default DocumentDirectory;
