import React, { Component } from 'react';
import EditorHeader from './EditorHeader';
import EditorLine from './EditorLine';
import VersionHistory from './VersionHistory';

import {API_BASE_URL} from '../../Config.js';
import axios from 'axios';

class Editor extends React.Component {
  state = {
    editingLine: 0,
    listening: false
  }

  // Attach keyboard listener to the Editor
  componentDidMount = () => {
    var doc = this.props.doc;

    // Convert each line in the words array from the server to the object format
    // the editor is expecting. Mainly, { lineNum: 0, editing: true, content: "" }
    convertWords(doc);

    var editLine = doc.words.length > 0 ? doc.words.length - 1 : 0;

    this.setState(
      {
        doc: doc,
        user: this.props.user,
        editingLine: editLine
      }
    );

    console.log("Mounted Editor", this.state);
    console.log("WE ADDED THE LISTNEER");
    document.addEventListener("keyup", this.keyUpListen )
    this.setState({listening: true})
  }

  componentWillUnMount = () => {
    console.log("Unmounted Editor");
    document.removeEventListener("keyup", this.keyUpListen );
  }

  keyUpListen = (e) => {
    addedListener = true;

    var { doc, user, editingLine } = this.state;

    var { doc_id, words, locked, lockedBy } = doc;
    var { name } = user;

    // Set the typing word to the content that already exists on this line,
    //    or to blank if the word array is empty.
    var typingWord = words.length ? words[editingLine].content : "";

    // Editing should only occur if the document is locked
    //  and the document is locked by the current user
    // (OR if the document owner is editing -- TO BE IMPLEMENTED)
    var titleIsEditing = window.document.getElementById("title-rename");

    if ( !titleIsEditing && locked && lockedBy == name ) {

      let currentWords = [...words]; // Create copy of the words list to avoid altering state directly.

      currentWords = currentWords.length ? currentWords : currentWords.push({})

      // Test for key presses
      switch (e.key) {
        default:
          this.insertChar(currentWords, editingLine, typingWord, e.key);
          break;

        case "Enter":
        case " ":
          this.insertLine(doc_id, currentWords, editingLine);
          break;

        case "Backspace":
          this.pressBackspace(doc_id, typingWord, currentWords, editingLine);
          break;

        case "ArrowDown":
          this.moveCursorDown(doc_id, currentWords, editingLine);
          break;

        case "ArrowUp":
          this.moveCursorUp(doc_id, currentWords, editingLine);
          break;

        case "ArrowLeft":
          // Implement later if we have time
          break;

        case "ArrowRight":
          // Implement later if we have time
          break;
      }
    }
  }

  insertLine = (doc_id, currentWords, editingLine) => {
    // Calculate the newID aka line number for the inserted line
    let newID = currentWords.length ? currentWords[editingLine].lineNum + 1 : 0;

    // Set every word's 'editing' property to false
    currentWords = currentWords.map(word => {
      word.editing = false;
      return word;
    });

    // Insert an empty new line at the next editing position.
    currentWords.splice(
      newID, 0, {lineNum: newID, editing: true, content: ""}
    );

    // If the inserted line is in the middle of the document, we need to renumber all
    // the lines that follow it.

    // NOTE: Not sure why + 2 is needed. But it is neccessary.
    for (var i = editingLine + 2; i < currentWords.length; i++) {
      currentWords[i].lineNum += 1;
    }

    this.setState({
      doc: {
        ...this.state.doc,
        words: currentWords
      },
      editingLine: newID
    });

    // Call server to update
    console.log("THE ADD NEW LINE CONDITION", editingLine, currentWords.length)
    if (editingLine == currentWords.length - 2) {
      console.log("Adding new line", doc_id, currentWords[editingLine].content);
      this.props.addLine(doc_id, editingLine + 2, currentWords[editingLine].content);
    } else {
      // This is tricky because we only want to addLine if the previous word is a
      // new word. The first time this is done, the previous word will be one that is
      // already there.

      // Solution to the above problem:
      // Insert or call "addLine" on the empty string that gets inserted.
      // Then, just use "updated" to update that line.
      console.log("Inserting in middle of document", editingLine)
      this.props.addLine(doc_id, editingLine + 1, currentWords[editingLine + 1].content);
    }
  }

  insertChar = (currentWords, editingLine, typingWord, key) => {
    console.log("The typing word",
    typingWord);

    // Only detect ASCII keyboard symbols a-z, A-Z, 0-9, and !,$,#, etc. Ignore keypresses like "Insert", etc.
    if (key.length == 1) typingWord += key;

    // Set the current editing line to the typing word.
    currentWords[editingLine].content = typingWord;

    this.setState(
      {
        doc: {...this.state.doc, words: currentWords}
      }
    );
  }

  deleteChar = (typingWord, currentWords, editingLine) => {
    // If the user presses backspace, begin deleting characters.
    typingWord = typingWord.substr(0, typingWord.length - 1);

    var currentLineNumber = editingLine;
    console.log("THE INFO", editingLine, currentLineNumber, currentWords);

    currentWords[editingLine].content = typingWord;

    this.setState({
      doc: {
        ...this.state.doc,
        words: currentWords
      }
    });
  }

  deleteLine = (doc_id, currentWords, editingLine) => {
    var currentLineNumber = editingLine;
    var offset = editingLine ? 1 : 0;

    currentLineNumber -= offset;

    // Delete the index of the currently edited line, and reindex.
    if (editingLine > 0 || currentWords.length > 1) {
      currentWords.splice(editingLine, 1);
      for (var i = currentLineNumber + offset; i < currentWords.length; i++) {
        currentWords[i].lineNum -= 1;
      }

      currentWords[currentLineNumber].editing = true;

      this.setState({
        doc: {
          ...this.state.doc,
          words: currentWords
        },
        editingLine: currentLineNumber
      });

      // Call server to record the delete
      var deleteIndex = currentWords.length > 0 ? editingLine : 0;
      this.props.deleteLine(doc_id, deleteIndex);
    }
  }

  pressBackspace(doc_id, typingWord, currentWords, editingLine) {
    if (typingWord) {
      this.deleteChar(typingWord, currentWords, editingLine);
    } else {
      this.deleteLine(doc_id, currentWords, editingLine);
    }
  }

  moveCursorUp = (doc_id, currentWords, editingLine) => {
    console.log("move cursor up", currentWords);
    console.log("editingLine is", editingLine);
    var currentLine = editingLine;
    var newLine = currentLine > 0 ? currentLine - 1 : 0;

    currentWords[newLine].editing = true;

    if (newLine !== currentLine)
    currentWords[currentLine].editing = false;

    this.setState({
      doc: {
        ...this.state.doc,
        words: currentWords
      },
      editingLine: newLine
    })

    // Call server to update
    this.props.updateLine(doc_id, currentLine, currentWords[currentLine].content);
  }

  moveCursorDown = (doc_id, currentWords, editingLine) => {
    console.log("move cursor down");
    var currentLine = editingLine;
    var newLine = (currentLine < currentWords.length - 1) ? currentLine + 1 : currentWords.length - 1;

    currentWords[newLine].editing = true;

    if (newLine !== currentLine)
    currentWords[currentLine].editing = false;

    this.setState({
      doc: {
        ...this.state.doc,
        words: currentWords
      },
      editingLine: newLine
    });

    // Call server to update
    this.props.updateLine(doc_id, currentLine, currentWords[currentLine].content);
  }

  handleLock = (e) => {
    var { doc_id, words, locked } = this.state.doc;
    var doc = {...this.state.doc};
    var { id, name } = this.state.user;
    var {editingLine} = this.state;
    console.log("handle locked", name, locked)

    if (!locked) {
      // The user locks (i.e. reserves) the document for editing.
      doc.locked = true;
      doc.lockedBy = name;
      words[words.length - 1].editing = true;

      axios.post(API_BASE_URL + "/docs/" + doc_id + "/lock", {
        "user_id" : id
      }).then( response => {
        console.log(response.data);
      }).catch( error => {
        console.error("lock error", error, error.response.data);
      });

      this.setState(
        {
          doc: doc,
          editingLine: words.length - 1
        }
      );
    } else {
      // Do this when the document is changing from unlocked to locked.
      doc.locked = false;
      doc.lockedBy = null;

      // Save the line
      this.props.updateLine(doc_id, editingLine, words[editingLine].content);

      axios.post(API_BASE_URL + "/docs/" + doc_id + "/unlock", {
        "user_id" : id
      }).then( response => {
        console.log(response.data)
      }).catch( error => {
        console.error("unlock error", error, error.response.data);
      })

      this.setState(
        { doc: doc }
      );
    }
    document.getElementById("lock-btn").blur();
  }

  handleSave = (e) => {
    var { doc_id, words } = this.state.doc;
    var { editingLine } = this.state;

    console.log("The handle save is", doc_id);
    this.props.updateLine(doc_id, editingLine, words[editingLine].content);
  }

  lodgeComplaint = (e) => {
    var problem;
    var theprompt = prompt("Enter your complaint:", "");
    if (theprompt == null || theprompt == "") {
      problem = "Default, user just didn't like the document";
    } else {
      problem = theprompt
    }

    var payload = {
      doc_id : this.state.doc.doc_id,
      complainer : this.state.user.id,
      problem : problem
    };

    axios.post(API_BASE_URL + "/complaints", payload)
    .then( response => {
      console.log(response.data);
    })
    .catch( error => {
      console.error("complaint error", error, error.response.data);
    })
  }

  render() {
    if (this.state.doc) {
      var { title, owner, locked, lockedBy, privacy, words } = this.state.doc;
    }

    let wordList = words ? words.map(word => {
      return <EditorLine key={ word.lineNum } lineNum={ word.lineNum } content={ word.content } editing={ word.editing } locked={ locked }/>
    }) : null;

    return (
      <div className="editor">
        <EditorHeader
          title={this.props.doc.title}
          setTitle={this.props.setTitle}
          setPrivacy={this.props.setPrivacy}
          owner={owner}
          selected={privacy}
          locked={locked}
          lockedBy={lockedBy}
        />

        <div className="editor-composer" id="editor-composer">
        { wordList }
        </div>

        <div className="editor-buttons">
          <button className="btn waves-effect waves-light" onClick={this.handleSave}>
            <i className="material-icons left">save</i>Save</button>
          <button id="lock-btn" className="btn waves-effect waves-light" onClick={this.handleLock}>
            <i className="material-icons left">lock</i>
            { locked ? "Unlock" : "Lock" }</button>
          <button className="btn waves-effect waves-light" onClick={this.lodgeComplaint}>
            <i className="material-icons left">priority_high</i>Complain</button>
        </div>

        <VersionHistory doc_id={this.props.doc.doc_id} />
      </div>
    )
  }
};

function convertWords(doc) {
  if (doc.words.length > 0) {
    console.log("CONVERT WORDS", doc.words);
    var wordsMapped = [];

    for (var i = 0; i < doc.words.length; i++) {
      var line = { lineNum: i, editing: false, content: doc.words[i]};
      wordsMapped.push(line);
    }

    doc.words = wordsMapped;

    if (doc.words.length > 1) {
      doc.words[doc.words.length - 1].editing = true;
    } else {
      doc.words[0].editing = true;
    }
  } else {
    doc.words.push( { lineNum: 0, editing: true, content: "" } );
  }
}

export default Editor;
