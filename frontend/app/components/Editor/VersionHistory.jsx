import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../Config.js';
import axios from 'axios';

class VersionHistory extends React.Component {
  state = {
    history: null
  }

  componentDidMount() {
    axios.get(API_BASE_URL + "/docs/" + this.props.doc_id + "/vhistory")
    .then( response => {
      console.log(response.data);
      this.setState({history: response.data})
    })
    .catch( error => {
      console.error("VersionHistory error", error, error.response.data);
    })
  }

  render() {
    var listHistory = this.state.history ?
      this.state.history.slice(0).reverse().map( hist => {
        // hist[2] contains copy of document body at the time of revision
        return (
          <tr key={hist[0]}>
            <td>{hist[0]}</td>
            <td>{hist[1]}</td>
            <td>
              <Link to={"/docs/" + this.props.doc_id + "/v/" + hist[0]} onClick={window.location.reload}>
                {"/docs/" + this.props.doc_id + "/v/" + hist[0]}
              </Link>
            </td>
            <td>{hist[3]}</td>
            <td>{hist[4]}</td>
          </tr>
        )
      }) :
        <tr><td>No history found</td></tr>

    return (
      <div>
      <h4>Version History</h4>
        <table>
        <thead>
          <tr>
            <th>Version #</th>
            <th>Operation</th>
            <th>Read Version</th>
            <th>Author</th>
            <th>Time</th>
          </tr>
          </thead>

          <tbody>
          { listHistory }
          </tbody>
        </table>
      </div>
    )
  }
}

export default VersionHistory;
