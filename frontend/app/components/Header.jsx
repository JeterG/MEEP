import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {

  logOut = (e) => {
    console.log('logOut', e, this.props);
    localStorage.clear();
    window.location.href = "/";
  }

  handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior

    let submitData = {  // pass data to server
      search : e.target[0].value
    }
    // create a get request
    // redirect page to results

  }

  render () {
    // if user type is guest render apply link to become an OU
    // else do nothing
    var displayOUapply = (this.props.type == "guest") ?
      ( <li><Link to="/apply">Become a Member</Link></li> ) : null;

    return (
      <div className="header">
        <div style={{display: "inline-block", marginRight: "40px"}}>
          <img id="logo" src="/images/logo.png" />
        </div>

        <div style={{display: "inline-block", marginRight: "40px"}}>
          Welcome,<br />
          { this.props.name }
        </div>

        <div style={{display: "inline-block"}}>
          <img className="profile-pic" src={ this.props.pic } />
          <div>{ this.props.type } user</div>
        </div>

        <div style={{display: "inline-block"}}>
          <nav>
          <ul>
            <li><Link to="/docs/new" onClick={window.location.reload}>New Document</Link></li>
            <li><Link to="/docs">All Documents</Link></li>
            <li><Link to="/taboos">Taboo List</Link></li>
            {displayOUapply}
          </ul>
          </nav>
          <button onClick={this.logOut}>Log Out</button>
        </div>

        <br />

        <div className="search-container">
          <form onSubmit={ this.handleSubmit }>
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <hr />
      </div>
    )
  }
}

export default withRouter(Header);
