import React, { Component } from 'react';
import LineCursor from './LineCursor';

const EditorLine = (props) => {
  var { lineNum, content, editing } = props;

  return(
    <div key={ lineNum } id={ lineNum } className="edit-line">
      { editing ? <LineCursor /> : null }
      { content }<br/>
    </div>
  )
}

export default EditorLine;
