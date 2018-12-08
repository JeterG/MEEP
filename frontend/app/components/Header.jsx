import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => {
  // if user type is guest render apply link to become an OU
  // else do nothing
  var displayOUapply = (props.type == "guest") ?
    ( <li>
        <Link to="/apply">Become a Member</Link>
      </li>
    ) : null;
  return (
    <div className="header">
      <div style={{display: "inline-block", marginRight: "40px"}}>
        Welcome,<br />
        { props.name }
      </div>

      <div style={{display: "inline-block"}}>
        <img className="profile-pic" src={ props.pic } />
        <div>{ props.type } user</div>
      </div>

      <div style={{display: "inline-block"}}>
        <nav>
        <ul>
          <li><Link to="/editor">New Document</Link></li>
          <li><Link to="/docs">All Documents</Link></li>
          <li><Link to="/taboos">Taboo List</Link></li>
          {displayOUapply}
        </ul>
        </nav>
      </div>
    </div>
  )
}

export default withRouter(Header);
