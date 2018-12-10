import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE_URL } from '../Config';

class Taboos extends React.Component {
  state = {
    message: null,
    taboos: [] //taboos : ["taboo", "taboos"]
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let submitData = {
      suggestedTaboo: e.target[0].value,
    }

    axios.post(API_BASE_URL + '/taboos', submitData)
    .then(response => {
      console.log(response.data);
      this.setState(response.data);
    })
    .catch(error => {
      // handle error
      // this.setState(error.response.data);
      console.log(error.response);
      this.setState(error.response.data);
    });
  }

  componentWillMount() {
    this.getTaboo();
  }
  // get list of taboo words and post them
  getTaboo = () => {
    axios.get(API_BASE_URL + '/taboos')
    .then(response => {
      this.setState({taboos : response.data})
      console.log(response.data)
    })
  }

  render() {
    var userData = getLocal("user");
    var {name, type, pic} = userData;
    var tabooList = this.state.taboos.map(taboos => {
      return <li key={taboos}>{taboos}< /li>
    });

    return (
      <div className="taboo-page">
        <Header name={name} type={type} pic={pic} />
        <div>
          <h2>Taboo Words</h2>
          <div id="tabooList">{ tabooList }</div>
        </div>
        <div>
          <h2>Suggest Taboo</h2>
          <div>{ this.state.message }</div>
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
