import React, {Component} from 'react';
import Header from './Header';
import Editor from './Editor/Editor';

class Document extends React.Component {
  state = {
    document: {

    }
  }


  render() {
    console.log(this.props);
    var doc = null;
    var {name, type, pic} = getLocal("user");
    return (
      <div className="document">
        <Header name={name} type={type} pic={pic} />
        <Editor doc={this.state.document} />
      </div>
    )
  }
}

export default Document;
