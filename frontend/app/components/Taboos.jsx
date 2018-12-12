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
    var userData = getLocal("user");
    var {name} = userData;

    let submitData = {
      suggestedTaboo: e.target[0].value,
      username: name
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
    var tabooList = this.state.taboos.map(taboos => {
      return(
       <li key={taboos}>{taboos}</li>)
    });

    return (
      <div className="taboo-page">
        <Header />
          <div>
            <h3>Taboo Words</h3>
            <ul className="collection">
              <li className="collection-item avatar">
                <i className="material-icons circle">close</i>
                <span className="title">
                  <div id="tabooList">{ tabooList }</div>
                </span>
              </li>
            </ul>
          </div>
        <div>
          <h3>Suggest Taboo</h3>
          <div>{ this.state.message }</div>
          <form onSubmit={ this.handleSubmit }>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">create</i>
                <input id="suggestedTaboo" type="text" className="validate" />
                <label htmlFor="suggestedTaboo">Suggest a Taboo Word</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Taboos;
