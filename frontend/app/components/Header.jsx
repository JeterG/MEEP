import React from 'react';

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
        <li>New Document</li>
        <li>All Documents</li>
        <li>Taboo List</li>
        <li>Apply for OU</li>
        </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header;
