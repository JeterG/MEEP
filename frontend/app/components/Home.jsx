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

  render() {
    var docList = this.state.documents.map(doc => {
      return <DocumentCard key={doc.doc_id} doc={doc} />
    });
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
