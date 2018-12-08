import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => {
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
          <li><Link to="/documents">All Documents</Link></li>
          <li><Link to="/taboos">Taboo List</Link></li>
          <li><Link to="/apply">Apply for OU</Link></li>
        </ul>
        </nav>
      </div>
    </div>
  )
}

export default withRouter(Header);
