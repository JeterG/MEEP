import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';
import axios from 'axios';
import Header from './Header';
import DocumentCard from './DocumentCard';

class Home extends React.Component {
  state = {
    docs: null
  }
  componentDidMount(){
    this.getEdited()
  }
  getEdited = () => { //get list of docs edited or owned by the user
    var userData = getLocal("user")
    var {name, type} = userData;

    axios.get(API_BASE_URL + "/home", {
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
    var docList = this.state.docs ? this.state.docs.map(doc => {
      return (
        <li key={doc.doc_id}>
          <Link to={"/docs/" + doc.doc_id }>
            <b>{doc.title}</b><br />
          </Link>
          <em>{doc.owner}</em>
        </li>
      );
    })
    : <h3>No documents</h3>;

    return (
      <div className="home-page">
        <Header />

        <h2>Recently Edited</h2>
        <div>{ docList }</div>
      </div>
    )
  }
}

export default Home;
