import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../Config';
import Header from './Header';
import Editor from './Editor/Editor';

class Document extends React.Component {
  state = {
    document: null
  }

  componentDidMount() {
    var { doc_id } = this.props.match.params;
    var user = getLocal('user');

    if (Number.isInteger(Number(doc_id))) {
      // GET doc from API request
      this.getDoc(doc_id);
    } else if (doc_id == "new") {
      // Create new doc and get its ID
      var payload = {
        title: "New Document",
        user_id: user.id
      }
      this.newDoc(payload);
    }
  }

  getDoc = (id) => {
    axios.get(API_BASE_URL + "/docs/" + id)
    .then( response => {
      console.log("got doc, ", response.data)
      this.setState({document: response.data})
    })
    .catch( error => {
      console.error("Document error: ", error, error.response.data);
    })
  }

  newDoc = (payload) => {
    console.log("newDoc activate", payload);
    axios.post(API_BASE_URL + "/docs/new", payload)
    .then( response => {
      console.log("response is ", response)
      this.props.history.push("/docs/" + response.data.doc_id);
      this.setState({ document: response.data })
    })
    .catch( error => {
      console.error("NewDoc error ", error, error.response.data);
    })
  }

  addLine = (id, index, content) => {
    var user = getLocal('user')
    let payload = {
      "user_id" : user.id,
      "content" : content,
      "index" : index
    };

    axios.post(API_BASE_URL + "/docs/" + id + "/addLine", payload)
    .then( response => {
      console.log(response.data.message);
    })
    .catch( error => {
      console.error("addLine error,", error, error.response.data);
    })
  }

  deleteLine = (id, index) => {
    var user = getLocal('user')
    let payload = {
      "user_id" : user.id,
      "index" : index
    };

    axios.post(API_BASE_URL + "/docs/" + id + "/deleteLine", payload)
    .then( response => {
      console.log(response.data.message);
    })
    .catch( error => {
      console.error("addLine error,", error, error.response.data);
    })
  }

  updateLine = (id, index, content) => {
    var user = getLocal ('user')
    let payload = {
      'user_id' : user.id,
      'index' : index,
      'content' : content
    };

    axios.post(API_BASE_URL + "/docs/" + id + "/updateLine", payload)
    .then( response => {
      console.log(response.data.message);
    })
    .catch( error => {
      console.error("addLine error,", error, error.response.data);
    })
  }

  saveDoc = (id, payload) => {
    console.log("Saving the document...");

    axios.post(API_BASE_URL + "/docs/" + id, payload)
    .then( response => {
      console.log(response.data);
    })
    .catch( error => {
      console.error("SaveDoc error", error, error.response.data);
    })
  }

  setTitle = (title) => {
    var submit = {title: title}

    axios.post(API_BASE_URL + "/docs/" + this.state.document.doc_id + "/rename", submit)
    .then( response => {
      console.log("Changing title... ", response.data.message);
    })
    .catch( error => {
      console.error("SetTitle error", error, error.response.data);
    });

    console.log("this state", this.state);

    this.setState({
      document: {
        ...this.state.document,
        title : title
      }
    });
  }

  setPrivacy = (privacy) => {
    var user = getLocal('user')
    var submit = {user_id: user.id, privacy: privacy};

    axios.post(API_BASE_URL + "/docs/" + this.state.document.doc_id + "/setPrivacy", submit)
    .then( response => {
      console.log(response.data.message);
    })
    .catch( error => {
      console.error("setPrivacy error", error, error.response.data);
    })
  }

  render() {
    var {document} = this.state;
    var user = getLocal('user');

    var display = document
    ? (
      <div>
        <Editor
          doc={document}
          user={user}
          setTitle={this.setTitle}
          setPrivacy={this.setPrivacy}
          saveDoc={this.saveDoc}
          addLine={this.addLine}
          deleteLine={this.deleteLine}
          updateLine={this.updateLine}
        />
      </div>
    )
    : <h3>Invalid Document ID</h3>;

    return (
      <div className="document">
        <Header/>
        <hr/>
        { display }
      </div>
    )
  }
}

export default Document;
