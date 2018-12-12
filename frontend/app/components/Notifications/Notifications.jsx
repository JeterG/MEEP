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
  }

  render() {
    var notifs = [];
    var currentUser = getLocal("user");
    var userType = currentUser.type;

    switch(userType) {
      case "super":
        notifs.push(<Applications key={notifs.length}/>)
        notifs.push(<TabooSuggestions key={notifs.length}/>)
        notifs.push(<ComplaintsUsers key={notifs.length}/>)

      case "ordinary":
      case "super":
        notifs.push(<ComplaintsDocuments key={notifs.length}/>)
        notifs.push(<Invites key={notifs.length}/>)

      case "guest":
      case "ordinary":
      case "super":
        notifs.push(<Blocks key={notifs.length}/>)
    }

    return (
      <div>
        <Header />
        { notifs }
      </div>
    )
  }
}

export default Notifications;
