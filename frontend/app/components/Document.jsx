import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../Config';
import Header from './Header';
import Editor from './Editor/Editor';

class Document extends React.Component {
  constructor(props) {
    super(props);

    //Here ya go
    // this.props.history.listen((location, action) => {
    //   console.log("on route change");
    //   this.updateDoc();
    // });
  }

  state = {
    document: null
  }

  updateDoc() {
    console.log("in the updateDoc")
    var { doc_id } = this.props.match.params;
    var user = getLocal('user');

    console.log("check bool", Number.isInteger(Number(doc_id)), doc_id)
    if (Number.isInteger(Number(doc_id))) {
      // GET doc from API request
      console.log("in this")
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
      console.error("Document error: ", error, error.response);
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
      console.error("error is", error)
    })
  }

  saveDoc = (id, payload) => {
    axios.post(API_BASE_URL + "/docs/" + id, payload)
    .then( response => {

    })
    .catch( error => {

    })
  }

  componentWillMount() {
    console.log("the component will Mount", this.props.match.params);
    this.updateDoc();
  }

  render() {
    var {name, type, pic} = getLocal("user");
    var {document} = this.state;

    var display = document
    ? <Editor doc={document} />
    : <h3>Invalid Document ID</h3>;

    return (
      <div className="document">
        <Header name={name} type={type} pic={pic} />
        { display }
      </div>
    )
  }
}

export default withRouter(Document);
