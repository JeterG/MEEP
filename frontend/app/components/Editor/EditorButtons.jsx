import React, { Component } from 'react';

class EditorButtons extends React.Component {
  state = {
    has_access: null,
    needs_access: null,
    historical: null
  }

  componentDidMount() {
    var user = getLocal("user");
    var doc = this.props.doc;

    // FIGURE THIS OUT
    // should find out if logged in user has been given
    // access to this doc
    var userIsAccepted = true;

    var initialState = {
      has_access: null,
      needs_access: null,
      historical: null
    };

    var hasFullAccess = (user.name == doc.owner) || (user.type == "super") || userIsAccepted

    if (hasFullAccess && !this.props.oldVersion) {
      initialState.has_access = true;
    } else if (hasFullAccess && this.props.oldVersion) {
      initialState.historical = true;
    } else {
      initialState.needs_access = true;
    }

    this.setState({...initialState})
  }

  requestAccess = (e) => {

  }

  revertHere = (e) => {

  }

  render() {
    var buttons;
    if (this.state.has_access) {
      buttons = (
        <div className="editor-buttons">
          <button className="btn waves-effect waves-light" onClick={this.props.handleSave}>
            <i className="material-icons left">save</i>Save</button>
          <button id="lock-btn" className="btn waves-effect waves-light" onClick={this.props.handleLock}>
            <i className="material-icons left">lock</i>
              { this.props.locked ? "Unlock" : "Lock" }</button>
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

export default EditorButtons;
