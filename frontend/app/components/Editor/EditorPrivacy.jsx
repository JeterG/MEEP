import React, { Component } from 'react';

var privacies = {"OPEN" : 0, "RESTRICTED" : 1, "SHARED" : 2, "PRIVATE" : 3};

class EditorPrivacy extends React.Component {
  state = {
    selected: 3
  }

  componentDidMount() {
    this.setState({ selected: privacies[this.props.selected] })
  }

  changeSelect = (e) => {
    console.log("Changed Select", e);
  }

  render() {
    return (
      <select value={this.state.selected} onChange={this.changeSelect}>
        <option value={0}>Open</option>
        <option value={1}>Restricted</option>
        <option value={2}>Shared</option>
        <option value={3}>Private</option>
      </select>
    )
  }
}

export default EditorPrivacy;
