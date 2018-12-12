import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../Config';
import axios from 'axios';
import Header from './Header';

class SearchDocument extends React.Component {
  state = {
    docs: null
  }

  componentDidMount() {
    this.getDocs();
  }
  getDocs = () => { //get list of docs available for view to this user
    var userData = getLocal("user")
    var {name, type} = userData;

    axios.get(API_BASE_URL + "/searchDocument", {
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

  handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior

    // create a get request
    // redirect page to results

  }
// guest users can ONLY search available documents. THAT IS IT!!
  render() {
    var { docs } = this.state;
    var items = docs ? docs.map(doc => {
      return (
      <div className="collection" key={doc.doc_id}>
        <div className="collection-item avatar">
          <h2 className="material-icons circle">description</h2>
          <div className="title">
            <Link to={"/docs/" + doc.doc_id}>
              <b>{doc.title}</b><br />
            </Link>
            <em>{doc.owner}</em>
          </div>
        </div>
      </div>
      );
    })
    : <h3>No documents found</h3>;

    return (
      <div>
        <Header/>
        <hr />
        <h3>
          <div className="col s6">Search Documents</div>
        </h3>
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
        <div className="col s12">{items}</div>
      </div>
    )
  }
}

export default SearchDocument;
