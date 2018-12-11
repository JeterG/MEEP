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
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            {this.renderRedirect()}
            <img id="logo" src="/images/logo.png" onClick={this.setRedirect}/>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {displayNewDoc}
            <li><Link to="/docs">My Documents</Link></li>
            <li><Link to="/taboos">Taboo List</Link></li>
              {displayOUapply}
            <li><Link to="/search">Search</Link></li>
            <li><a className="waves-effect waves-light btn" onClick={this.logOut}>Log Out
              <i className="material-icons right">forward</i></a>
             </li>
          </ul>

{/*           <div style={{display: "inline-block", marginRight: "40px"}}>
            Welcome,<br />
            { name }
          </div> */}
          <br />
          <div style={{display: "inline-block"}}>
            <img className="profile-pic" src={ pic } />
            <div>{ type } user</div>
          </div>
          <br />
          <hr />
        </div>
        <div className="nav-content">
          <span className="nav-title">Welcome, {name}</span>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header);
