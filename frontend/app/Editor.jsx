import React, { Component } from 'react';
import EditorLine from './EditorLine';

class Editor extends React.Component {
  state = {
    title: "My Test Doc",
    owner: "myusername",
    locked: false,
    lockedBy: null,
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
    var { words, locked, lockedBy, editingLine } = this.state;
    var typingWord = "";
    var currentUser = "myusername";

    if (words.length > 0)
      typingWord = words[editingLine].content;

    if ( locked && lockedBy == currentUser ) {
      // If the document is unlocked...
      let currentWords = words;

      if (e.key == "Enter" || e.key == " ") {
        // If the user presses spacebar or enter, create a new empty line.
        let newID = 0;

        if (words.length > 0)
          newID = words[editingLine].lineNum + 1;

        currentWords.map(word => {
          return word.editing = false;
        });

        currentWords.splice(editingLine + 1, 0, {lineNum: newID, editing: true, content: ""});

        // Reindex the next lines:
        for (var i = editingLine + 2; i < currentWords.length; i++) {
          currentWords[i].lineNum += 1;
        }

        this.setState({
          words: currentWords,
          editingLine: newID
        });
      } else if (e.key == "Backspace") {
        // If the user presses backspace, begin deleting characters.
        typingWord = typingWord.substr(0, typingWord.length - 1);

        var currentLineNumber = editingLine;

        currentWords[currentLineNumber].content = typingWord;

        if (typingWord == "") {
          if (currentWords.length > 1) {
            // Delete the index of the currently edited line, and reindex.
            // currentWords = words.slice(0, words.length - 1);
            currentWords.splice(editingLine, 1);
            currentLineNumber -= 1;

            for (var i = currentLineNumber + 1; i < currentWords.length; i++) {
              currentWords[i].lineNum -= 1;
            }
          }
        }

        currentWords[currentLineNumber].editing = true;

        this.setState({
          words: currentWords,
          editingLine: currentLineNumber
        });

      } else if (e.key == "ArrowDown") {
        console.log("move cursor down");
        var currentLine = editingLine;
        var newLine = (currentLine < words.length - 1) ? currentLine + 1 : words.length - 1;

        var currentWords = words;
        currentWords[newLine].editing = true;

        if (newLine !== currentLine)
          currentWords[currentLine].editing = false;

        this.setState({
          words: currentWords,
          editingLine: newLine
        })

      } else if (e.key == "ArrowUp") {
        console.log("move cursor up")
        var currentLine = editingLine;
        var newLine = currentLine > 0 ? currentLine - 1 : 0;

        var currentWords = words;
        currentWords[newLine].editing = true;

        if (newLine !== currentLine)
          currentWords[currentLine].editing = false;

        this.setState({
          words: currentWords,
          editingLine: newLine
        })

      } else if (e.key == "ArrowLeft") {
        console.log("move cursor left")
        // Implement if we have time

      } else if (e.key == "ArrowRight") {
        console.log("move cursor right")
        // Implement if we have time

      } else {
        console.log("The typing word", typingWord);
        // Otherwise, append new characters to the EDITING line.
        if (e.keyCode >= 33 && e.keyCode <= 126) // Only detect ASCII keyboard symbols a-z, A-Z, 0-9, and !,$,#, etc
          typingWord += e.key;

        currentWords[editingLine].content = typingWord;

        this.setState({ words: currentWords });
      }
    }
  }

  handleLock = (e) => {
    var { words, locked } = this.state;
    var currentUser = "myusername";

    if (!locked) {
      // The user locks (i.e. reserves) the document for editing.
      this.setState({ locked: true, lockedBy: currentUser });
    } else {
      // Do this when the document is changing from unlocked to locked.
      this.setState({ locked: false, lockedBy: null });
    }

    document.getElementById("lock-btn").blur();
  }

  render() {
    var { title, owner, locked, lockedBy, words } = this.state;

    let wordList = words.map(word => {
      return <EditorLine key={ word.lineNum } lineNum={ word.lineNum } content={ word.content } editing={ word.editing } locked={ locked }/>
    })

    return (
      <div className="editor">
        <div className="doc-header">
          <h1>{ title }</h1>
          <h2>{ owner }</h2>
          <p>Status: { locked ? "Locked by " + lockedBy : "Unlocked" }</p>
        </div>

        <div className="editor-composer" id="editor-composer">
          { wordList }
        </div>

        <div className="editor-buttons">
          <button>Save</button>
          <button id="lock-btn" onClick={ this.handleLock }>
            { locked ? "Unlock" : "Lock" }
          </button>
          <button>Complain</button>
        </div>
      </div>
    )
  }
}

export default Editor;
