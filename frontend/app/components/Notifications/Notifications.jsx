// Root component for displaying notifications
import React, {Component} from 'react';

import Header from '../Header';
import Blocks from './Blocks';
import Invites from './Invites';
import ComplaintsDocuments from './ComplaintsDocuments';
import ComplaintsUsers from './ComplaintsUsers';
import TabooSuggestions from './TabooSuggestions';
import Applications from './Applications';

class Notifications extends React.Component {
  state = {
    // blocks: [],
    // invites: [],
    // doc_complaints: [],
    // user_complaints: [],
    // taboo_suggestions: [],
    // applications: []
  }

  ntypeToComponent = (id, ntype) => {
    switch(ntype) {
      case "blocks":
        return (<Blocks key={id} />);
        break;

      case "invites":
        return (<Invites key={id} />);
        break;

      case "doc_complaints":
        return (<ComplaintsDocuments key={id} />);
        break;

      case "user_complaints":
        return (<ComplaintsUsers key={id} />);
        break;

      case "taboo_suggestions":
        return (<TabooSuggestions key={id} />);
        break;

      case "applications":
        return (<Applications key={id} />);
        break;
    }
  }

  getBlocks = () => {
    this.setState({ blocks: [] })
  }

  getInvites = () => {
    this.setState({ invites: [] })
  }

  getComplaintsDocuments = () => {
    this.setState({ doc_complaints: [] })
  }

  getComplaintsUsers = () => {
    this.setState({ user_complaints: [] })
  }

  getTabooSuggestions = () => {
    this.setState({ taboo_suggestions: [] })
  }

  getApplications = () => {
    this.setState({ applications: [] })
  }

  componentDidMount() {
    var currentUser = getLocal("user");
    var userType = currentUser.type;
    // TYPES OF NOTIFICATIONS FOR DIFFERENT USERS
    // ==========================================
    // Super Users:
    //  * Applications (for guest -> ordinary)
    //  * TabooSuggestions
    //  * ComplaintsUsers
    //  * ComplaintsDocuments (as su and owner)
    //  * Invites
    //  * Blocked

    // Ordinary Users:
    //  * ComplaintsDocuments (as owner)
    //  * Invites
    //  * Blocked

    // Guests
    //  * Blocked
    switch(userType) {
      case "guest":
      case "ordinary":
      case "super":
        this.getBlocks();

      case "ordinary":
      case "super":
        this.getInvites();
        this.getComplaintsDocuments();

      case "super":
        this.getComplaintsUsers();
        this.getTabooSuggestions();
        this.getApplications();
    }
  }

  displayNotifs(array, ntype) {
    if (this.state[ntype]) {
      if (this.state[ntype].length > 0) {
        console.log("pushed", ntype)
        array.push(
          this.ntypeToComponent(array.length, ntype)
        )
      }
    }
  }

  render() {
    var notifs = [];
    for (var ntype in this.state) {
      this.displayNotifs(notifs, ntype);
    }

    return (
      <div>
        <Header />
        {notifs}
      </div>
    )
  }
}

export default Notifications;
