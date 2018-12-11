import React, { Component } from 'react';

class EditorTitle extends React.Component {
  state = {
    editingTitle: false
  }

  changeTitle = (e) => {
    e.preventDefault();
    console.log("changing title...", e.target[0].value);
    console.log("value is", e.target[0].value);
    if (e.target[0].value.length > 0) {
      this.props.setTitle(e.target[0].value);
    } else {
      this.props.setTitle("My Document");
    }
    this.setState({ editingTitle : false });
  }

  clickTitle = (e) => {
    if (this.props.locked) {
      this.setState({editingTitle: true });
    }
  }

  render() {
    var title = this.props.title;

    let outputTitle = this.state.editingTitle
    ?
    (
      <form onSubmit={this.changeTitle}>
        <input id="title-rename" type="text" name="title" defaultValue={title} />
      </form>
    )
    :
    (
      <h1 onClick={ this.clickTitle }>{ title }</h1>
    )

    setTimeout(() => {
      if (this.state.editingTitle) {
        window.document.getElementById("title-rename").focus();
      };
    }, 10);

    return (
      <div>{outputTitle}</div>
    )
  }
}

export default EditorTitle;
