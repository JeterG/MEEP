import React, {Component} from 'react';

class Editor extends React.Component {
  state = {
    title: "My Test Doc",
    owner: "alexmatson",
    locked: true,
    lockedBy: "alexmatson",
    words: [
      { lineNum: 0, content: "test"},
      { lineNum: 1, content: "default"}
    ]
  }

  keyUpListen = (e) => {
    console.log("The key is", e);

    var { words, locked } = this.state;
    var typingWord = words[words.length - 1].content;

    console.log(!locked);

    if ( !locked ) {
      // If the document is unlocked...
      let currentWords = words;

      if (e.keyCode == 13 || e.keyCode == 32) {
        // If the user presses spacebar or enter, create a new empty line.
        let newID = words[words.length - 1].lineNum + 1;
        this.setState({
          words: [...currentWords, {lineNum: newID, content: ""}]
        });

      } else if (e.keyCode == 8) {
        // If the user presses backspace, begin deleting characters.

        typingWord = typingWord.substr(0, typingWord.length - 1);
        currentWords[words.length - 1].content = typingWord;

        if (typingWord == "")
          currentWords = words.slice(0, words.length - 1);

        this.setState({ words: currentWords });
      } else {
        // Otherwise, append new characters to the latest line.
        if (e.keyCode >= 33 && e.keyCode <= 126) // Only detect ASCII keyboard symbols a-z, A-Z, 0-9, and !,$,#, etc
          typingWord += e.key;

        currentWords[words.length - 1].content = typingWord;

        this.setState({
          // Append the new word to the word list
          words: currentWords
        });
      }
    }
  }

  componentWillMount = () => {
    console.log("Editor mounted");
    document.addEventListener("keyup", this.keyUpListen )
  }

  componentWillUnMount = () => {
    document.removeEventListener("keyup", this.keyUpListen );
  }

  handleUnlock = (e) => {
    var { words, locked } = this.state;

    if (locked) {
      // If the document is changing from locked to unlocked.

      let currentWords = words;

      this.setState({locked: false});
    } else {
      // Do this when the document is changing from unlocked to locked.

      var { words } = this.state;
      let lastID = words[words.length - 1].lineNum;

      this.setState({ locked: true });
    }
  }

  handleTyping = (e) => {
    var kc = e.keyCode;

    // "Enter" or "Space" button was typed
    if (kc == 32 || kc == 13) {
      // Conditional is too slow, sometimes a space and extra letter will get through
      // Thus, split the input by space to make sure only one word is assigned per line.
      var input = e.target.value.split(" ");
      var words = this.state.words;

      let newID = words[words.length - 1].lineNum + 1;
      let currentWords = words;
      this.setState({
        // Append the new word to the word list
        words: [...currentWords, { lineNum: newID, content: input[0] }]
      });

      // If the event captured some extra characters, return them to the text box.
      // Otherwise, wipe it out.
      e.target.value = input[1] || "";
    }
  }

  clickLine = (e) => {
    console.log(e.target.id);
  }

  render() {
    var { title, owner, locked, words } = this.state;

    let wordList = words.map(word => {
      return <div onClick={ this.clickLine } key={ word.lineNum } id={ word.lineNum } className="edit-line">{ word.content }<br/></div>
    })

    return (<div className="editor">
      <div className="doc-header">
        <h1>{ title }</h1>
        <h2>{ owner }</h2>
        <p>Status: { locked ? "Locked" : "Unlocked" }</p>
      </div>

      <div className="editor-composer" id="editor-composer">
        {wordList}
      </div>

      <div className="editor-buttons">
        <button>Save</button>
        <button onClick={ this.handleUnlock }>
          { locked ? "Unlock" : "Lock" }
        </button>
        <button>Complain</button>
      </div>
    </div>)
  }
}

export default Editor;
