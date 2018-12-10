import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

class Header extends React.Component {
  state = { redirect : false }
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
  // <div className="header" style={{display: "inline-block", marginRight: "40px"}}>
  //   {this.renderRedirect()}
  //   <img src="/images/logo.png" onClick={this.setRedirect}/>
  // </div>

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
