import React, {Component} from 'react';

class Editor extends React.Component {
  state = {
    title: "My Test Doc",
    owner: "alexmatson",
    locked: true,
    words: [
      {lineNum: 0, content: "test"},
      {lineNum: 1, content: "default"}
    ]
  }

  handleUnlock = (e) => {
    console.log(e);

    var {words, locked} = this.state;

    if (locked) {
      // What to do if the document is changing from locked to unlocked.

      let currentWords = words;

      this.setState({
        locked: false,
      });

      setTimeout(function() {
        document.getElementById("add-word").focus()
      }, 5);

    } else {
      // Do this when the document is changing from unlocked to locked.

      var {words} = this.state;
      let lastID = words[words.length - 1].lineNum;

      // let currentWords = this.state.words.filter(word => {
      //   return lastID !== word.lineNum;
      // });

      this.setState({
        locked: true
        // words: currentWords
      });
    }
  }

  handleTyping = (e) => {
    console.log(e.keyCode);
    var kc = e.keyCode;

    if (kc == 32 || kc == 13) { // "Enter" button was typed
      var input = e.target.value.split(" ");
      var words = this.state.words;

      let newID = words[words.length - 1].lineNum + 1;
      let currentWords = words;
      this.setState({
        words: [...currentWords, {lineNum: newID, content: input[0]}]
      });

      e.target.value = input[1] || "";
    }
  }

  render() {
    var {title, owner, locked, words} = this.state;

    let wordList = words.map(word => {
      return <span key={word.lineNum}>{word.content}<br /></span>
    })

    return (
      <div className="editor">
        <div className="doc-header">
          <h1>{ title }</h1>
          <h2>{ owner }</h2>
          <p>Status: { locked ? "Locked" : "Unlocked" }</p>
        </div>

        <div className="editor-composer" id="editor-composer" onInput={this.handleTyping}>
          {wordList}
        </div>

        { locked ? null : (<input id="add-word" onKeyUp={this.handleTyping}></input>) }

        <div className="editor-buttons">
          <button>Save</button>
          <button onClick={this.handleUnlock}> { locked ? "Unlock" : "Lock" } </button>
          <button>Complain</button>
        </div>
      </div>
    )
  }
}

export default Editor;
