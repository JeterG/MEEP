import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class Header extends React.Component {
  state = { redirect : false }
  logOut = (e) => {
    console.log('logOut', e, this.props);
    localStorage.clear();
    window.location.href = "/";
  }

  // redirect to homepage
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      if (window.location.pathname == '/') {
        window.location.reload()
      }
      else {
        return <Redirect to='/' />
      }
    }
  }

  render () {
    var userData = getLocal("user");
    var {name, type, pic} = userData;
    // if user type is guest render apply link to become an OU
    // else do nothing
    var displayOUapply = (type == "guest") ?
      ( <li><Link to="/apply">Become a Member</Link></li> ) : null;
    var displayNewDoc = (type == "guest") ? null :
      ( <li><Link to="/docs/new" onClick={window.location.reload}>New Document</Link></li> );


    return (
      <div className="header">
        <div style={{display: "inline-block", marginRight: "40px"}}>
          {this.renderRedirect()}
          <img id="logo" src="/images/logo.png" onClick={this.setRedirect}/>
        </div>

        <div style={{display: "inline-block", marginRight: "40px"}}>
          Welcome,<br />
          { name }
        </div>

        <div style={{display: "inline-block"}}>
          <img className="profile-pic" src={ pic } />
          <div>{ type } user</div>
        </div>

        <div style={{display: "inline-block"}}>
          <nav>
          <ul>
            {displayNewDoc}
            <li><Link to="/docs">My Documents</Link></li>
            <li><Link to="/taboos">Taboo List</Link></li>
            {displayOUapply}
            <li><Link to="/search">Search</Link></li>
          </ul>
          </nav>
          <button onClick={this.logOut}>Log Out</button>
        </div>
        <br />
        <hr />
      </div>
    )
  }
}

export default withRouter(Header);
