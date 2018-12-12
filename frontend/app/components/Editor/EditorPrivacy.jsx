import React, { Component } from 'react';

var privacies = {"OPEN" : 0, "RESTRICTED" : 1, "SHARED" : 2, "PRIVATE" : 3};

class EditorPrivacy extends React.Component {
  state = {
    selected: 3
  }

  componentDidMount() {
    this.setState({
      selected: privacies[this.props.selected]
    })
  }

  changeSelect = (e) => {
    console.log("Changed Select", e);
    this.props.setPrivacy(e.target.value);
    this.setState({selected: e.target.value});
  }

  render() {
    // Disable if doc is unlocked, also disable if user does not have perms (TO-DO)
    var isDisabled = this.props.locked ? false : true;

    return (
      <select className="browser-default" disabled={isDisabled} value={this.state.selected} onChange={this.changeSelect}>
            <option value={0}>Open</option>
            <option value={1}>Restricted</option>
            <option value={2}>Shared</option>
            <option value={3}>Private</option>
      </select>
    )
  }
}

export default EditorPrivacy;
