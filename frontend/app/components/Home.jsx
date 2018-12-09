import React, { Component } from 'react';
import Header from './Header';
import DocumentCard from './DocumentCard';

class Home extends React.Component {
  state = {
    documents: [
      {doc_id: 0, doc_title: "How to Cook", doc_owner: "James"},
      {doc_id: 1, doc_title: "Hiking for Beginners", doc_owner: "Annie"},
      {doc_id: 2, doc_title: "Analytical Algebra for Ph.D Students", doc_owner: "Lizzy"}
    ]
  }

  handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior

    let submitData = {  // pass data to server
      search = e.target[0].value
    }
    // create a get request
    // redirect page to results


  }

  logOut = (e) => {
    console.log('logOut', e, this.props);
    localStorage.clear();
    window.location.reload();
  }

  render() {
    var {name, type, pic} = this.props.user;
    var docList = this.state.documents.map(doc => {
      return <DocumentCard key={doc.doc_id} doc={doc} />
    });
    return (
      <div className="home-page">
        <Header name={name} type={type} pic={pic} />
        <div className="search-container">
          <form onSubmit={ this.handleSubmit }>
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <button onClick={this.logOut}>Log Out</button>

        <h2>Recently Edited</h2>
        <div>{ docList }</div>
      </div>
    )
  }
}

export default Home;
