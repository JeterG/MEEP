import React, { Component } from 'react';
import EditorLine from './EditorLine';

class Editor extends React.Component {
  state = {
    title: "My Test Doc",
    owner: "alexmatson",
    locked: true,
    lockedBy: "alexmatson",
    editingLine: 0,
    words: [
      { lineNum: 0, editing: true, content: ""}
    ]
  }

  // Attach keyboard listener to the Editor
  componentWillMount = () => {
    document.addEventListener("keyup", this.keyUpListen )
  }

  componentWillUnMount = () => {
    document.removeEventListener("keyup", this.keyUpListen );
  }

  keyUpListen = (e) => {
    var { words, locked } = this.state;
    var typingWord = "";

    if (words.length > 0)
      typingWord = words[words.length - 1].content;

    console.log(!locked);

    if ( !locked ) {
      // If the document is unlocked...
      let currentWords = words;

      if (e.key == "Enter" || e.key == " ") {
        // If the user presses spacebar or enter, create a new empty line.
        let newID = 0;

        if (words.length > 0)
          newID = words[words.length - 1].lineNum + 1;

        currentWords.map(word => {
          return word.editing = false;
        });

        currentWords.push({lineNum: newID, editing: true, content: ""});
        this.setState({
          words: currentWords,
          editingLine: newID
        });

      } else if (e.key == "Backspace") {
        // If the user presses backspace, begin deleting characters.

        typingWord = typingWord.substr(0, typingWord.length - 1);

        if (words.length > 0) {
          currentWords[words.length - 1].content = typingWord;

          if (typingWord == "") {
            currentWords = words.slice(0, words.length - 1);
            currentWords[currentWords.length - 1].editing = true;
          }
        }

        this.setState({ words: currentWords });
      } else {
        console.log("The typing word", typingWord);
        // Otherwise, append new characters to the latest line.
        if (e.keyCode >= 33 && e.keyCode <= 126) // Only detect ASCII keyboard symbols a-z, A-Z, 0-9, and !,$,#, etc
          typingWord += e.key;

        if (words.length > 0)
          currentWords[words.length - 1].content = typingWord;
        else
          currentWords.push({lineNum: 0, content: typingWord});

        this.setState({ words: currentWords });
      }
    }
  }

  handleUnlock = (e) => {
    var { words, locked } = this.state;

    if (locked) {
      // If the document is changing from locked to unlocked.
      this.setState({locked: false});
      document.getElementById("lock-btn").blur();
    } else {
      // Do this when the document is changing from unlocked to locked.
      this.setState({ locked: true });
      document.getElementById("lock-btn").blur();
    }
  }

  render() {
    var { title, owner, locked, words } = this.state;

    let wordList = words.map(word => {
      return <EditorLine key={ word.lineNum } lineNum={ word.lineNum } content={ word.content } editing={ word.editing }/>
    })

    return (
      <div className="editor">
        <div className="doc-header">
          <h1>{ title }</h1>
          <h2>{ owner }</h2>
          <p>Status: { locked ? "Locked" : "Unlocked" }</p>
        </div>

        <div className="editor-composer" id="editor-composer">
          { wordList }
        </div>

        <div className="editor-buttons">
          <button>Save</button>
          <button id="lock-btn" onClick={ this.handleUnlock }>
            { locked ? "Unlock" : "Lock" }
          </button>
          <button>Complain</button>
        </div>
      </div>
    )
  }
}

export default Editor;