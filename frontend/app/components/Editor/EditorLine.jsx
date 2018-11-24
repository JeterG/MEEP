import React, { Component } from 'react';
import LineCursor from './LineCursor';

const EditorLine = (props) => {
  var { lineNum, content, editing, locked } = props;

  return(
    <div key={ lineNum } id={ lineNum } className="edit-line">
      { editing && locked ? <LineCursor /> : <span>&nbsp;</span> }
      { content }<br/>
    </div>
  )
}

export default EditorLine;
