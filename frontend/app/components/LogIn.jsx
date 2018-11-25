import React, { Component } from 'react';

class LogIn extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <hr />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" /><br />

          <label htmlFor="password">Pass</label><br />
          <input type="password" name="password" /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LogIn;
