import React, { Component } from 'react';
import LineCursor from './LineCursor';

class EditorLine extends React.Component {
  state = {
    editing: false
  }

  toggleEditing = () => {
    if (this.state.editing)
      this.setState({editing: false});
    else
      this.setState({editing: true});
  }

  clickLine = (e) => {
    console.log(e.target.id);
    this.toggleEditing();
  }

  render() {
    var { lineNum, content } = this.props;
    var { editing } = this.state;

    return(
      <div onClick={ this.clickLine } key={ lineNum } id={ lineNum } className="edit-line">
        { editing ? <LineCursor /> : null }
        { content }<br/>
      </div>
    )
  }
}

export default EditorLine;
