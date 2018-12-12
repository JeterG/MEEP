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
/* 
      <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Select...</a>
        <ul id='dropdown1' className='dropdown-content'>
          <li><a href="#!" value={0}>
            <i className="material-icons">description</i>Open</a></li>
          <li className="divider" tabindex="-1"></li>
          <li><a href="#!" value={1}>
            <i className="material-icons">account_circle</i>Restricted</a></li>
          <li className="divider" tabindex="-1"></li>
          <li><a href="#!" value={2}>
            <i className="material-icons">wc</i>Shared</a></li>
          <li className="divider" tabindex="-1"></li>
          <li><a href="#!" value={3}>
            <i className="material-icons">lightbulb_outline</i>Private</a></li>
        </ul></div>
 */    )
  }
}

export default EditorPrivacy;
