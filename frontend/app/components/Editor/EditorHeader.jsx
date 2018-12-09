import React, { Component } from 'react';
import EditorTitle from './EditorTitle';
import EditorPrivacy from './EditorPrivacy';

class EditorHeader extends React.Component {

  render() {
    var {title, setTitle, owner, selected, locked, lockedBy} = this.props;
    return (
      <div className="doc-header">
        <EditorTitle title={title} setTitle={setTitle} />
        <h2>{ owner }</h2>
        <EditorPrivacy selected={selected} />
        <p>Status: { locked ? "Locked by " + lockedBy : "Unlocked" }</p>
      </div>
    )
  }
}

export default EditorHeader;
