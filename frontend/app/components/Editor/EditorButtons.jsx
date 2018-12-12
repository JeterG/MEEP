import React, { Component } from 'react';
import { API_BASE_URL } from '../../Config.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class EditorButtons extends React.Component {
  state = {
    has_access: null,
    needs_access: null,
    historical: null
  }

  componentDidMount() {
    console.log("BUTTONS PROPS", this.props);
    var user = getLocal("user");
    var doc = this.props.doc;

    axios.get(API_BASE_URL + "/users/" + user.id + "/allowed/" + doc.doc_id)
    .then( response => {
      console.log("get allowance", response.data, doc.privacy);
      var userIsAccepted = response.data;
      var isOldVersion = this.props.match.params.v_id;

      var initialState = {
        has_access: null,
        needs_access: null,
        historical: null
      };

      var hasFullAccess = (user.name == doc.owner) || (user.type == "super") || userIsAccepted

      if (hasFullAccess && !isOldVersion) {
        initialState.has_access = true;
      } else if (hasFullAccess && isOldVersion) {
        initialState.historical = true;
      } else {
        initialState.needs_access = true;
      }

      this.setState({...initialState})
    })
    .catch( error => {
      console.error("fetch allowance error", error, error.response.data);
    });
  }

  requestAccess = (e) => {
    var user = getLocal("user");
    var payload = {
      "user_id" : user.id
    }

    var d_id = this.props.doc.doc_id;
    axios.post(API_BASE_URL + "/docs/" + d_id + "/requestAccess", payload)
    .then( response => {
      console.log("requesting access", response.data.message);
    })
    .catch( error => {
      console.error("request error", error, error.response.data);
    })
  }

  revertHere = (e) => {
    var user = getLocal("user");
    var submitData = {
      "user_id" : user.id
    }
    var d_id = this.props.doc.doc_id;
    var v_id = this.props.match.params.v_id;
    axios.post(API_BASE_URL + "/docs/" + d_id + "/revert/" + v_id, submitData)
    .then( response => {
      console.log("Reverted document", response.data.message);
      window.location.href = "/docs/" + d_id;
    })
    .catch( error => {
      console.error("revert error", error, error.response.data);
    })
  }

  render() {
    var buttons;
    if (this.state.has_access) {
      buttons = (
        <div className="editor-buttons">
          <button id="lock-btn" className="btn waves-effect waves-light" onClick={this.props.handleLock}>
            <i className="material-icons left">{ this.props.locked ? "save" : "lock"}</i>
              { this.props.locked ? "Save" : "Lock" }</button>
          <button className="btn waves-effect waves-light" onClick={this.props.lodgeComplaint}>
          <i className="material-icons left">priority_high</i>Complain</button>
        </div>
      )
    } else if (this.state.needs_access) {
      buttons = (
        <div className="editor-buttons">
          <button className="btn waves-effect waves-light" onClick={this.requestAccess}>
            <i className="material-icons left">person_add</i>
            Request edit access
          </button>
          <button className="btn waves-effect waves-light" onClick={this.props.lodgeComplaint}>
          <i className="material-icons left">priority_high</i>Complain</button>
        </div>
      )
    } else if (this.state.historical) {
      buttons = (
        <div className="editor-buttons">
          <button className="btn waves-effect waves-light" onClick={this.revertHere}>
            <i className="material-icons left">restore</i>
            Revert
          </button>
          <button className="btn waves-effect waves-light" onClick={this.props.lodgeComplaint}>
          <i className="material-icons left">priority_high</i>Complain</button>
        </div>
      )
    }

    return (
      <div>
        {buttons}
      </div>
    )
  }
}

export default withRouter(EditorButtons);
