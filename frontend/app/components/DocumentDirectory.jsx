import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../Config';

class DocumentDirectory extends React.Component {
  state = {
    docs: null
  }

  componentDidMount() {
    axios.get(API_BASE_URL + "/documents").then(response => {
      console.log(response);
      this.setState({docs: response.data});
    })
  }

  render() {
    var { docs } = this.state;
    var items = docs ? docs.map(doc => {
      return (
        <li key={doc.doc_id}>
          <b>{doc.doc_title}</b><br />
          <em>{doc.doc_owner}</em>
        </li>
      );
    })
    : "No documents found";

    return (
      <div>
        <h1>Doc Directory</h1>
        <ul>
        { items }
        </ul>
      </div>
    )
  }
}

export default DocumentDirectory;
