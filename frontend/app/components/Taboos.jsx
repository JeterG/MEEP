import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE_URL } from '../Config';

class Taboos extends React.Component {
  state = {
    taboos: null
  }

  handleSubmit = (e) => {
    e.preventDefault();

    var userData = getLocal("user");

    let submitData = {
      suggestedTaboo: e.target[0].value,
      username: userData.name
    }
    // NEEDS MORE WORK. FIXXX
    axios.post(API_BASE_URL + '/taboos', submitData)
    .then(response => {
      console.log(response.data);
      this.setState(response.data);
    })
    .catch(error => {
      // handle error
      this.setState(error.response.data);
      console.log(error.response);
    });
  }

  render() {
    var userData = getLocal("user");
    var {name, type, pic} = userData;
    return (
      <div className="taboo-page">
        <Header name={name} type={type} pic={pic} />
        <div>
          <h2>Taboo Words</h2>
        </div>
        <div>
          <h2>Suggest Tabbo</h2>
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="suggestedTaboo">Taboo Suggestions</label><br />
            <input type="text" name="suggestedTaboo" /><br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Taboos;
