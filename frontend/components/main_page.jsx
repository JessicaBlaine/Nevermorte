const React = require('react');
const hashHistory = require('react-router').hashHistory;

const NotebooksIndex = require('./notebooks/notebooks_index');
const NoteForm = require('./notes/note_form');
const NoteActions = require('../actions/note_actions');
const NotebookStore = require('../stores/notebook_store');
const SessionApiUtil = require('../util/session_api_util');


const MainPage = React.createClass({
  getInitialState: function() {
    return {
      notebooks: "hidden",
      notebookButton: "notebook",
      notesButton: "notes",
      noteForm: ""
    };
  },
  toggleNotebooks() {
    let isHidden = this.state.notebooks === "hidden";
    this.setState({
      notebooks: isHidden ? "revealed" : "hidden",
      notebookButton: isHidden ? "notebook selected" : "notebook"
    });
  },
  toggleButtons(event) {
    const buttonPressed = event.currentTarget.className;
    let notesButton = this.state.notesButton;
    let notebooks = this.state.notebooks;
    let notebookButton = this.state.notebooks;
    if (buttonPressed.includes("notes")) {
      notesButton = "notes selected";
      notebooks = "hidden";
      notebookButton = "notebook";
      hashHistory.push('/notes');
    }
    if (buttonPressed.includes("notebook")) {
      let isHidden = this.state.notebooks === "hidden";
      notebooks = isHidden ? "revealed" : "hidden";
      notebookButton = isHidden ? "notebook selected" : "notebook";
      notesButton = "notes";
    }
    this.setState({
      notesButton: notesButton,
      notebooks: notebooks,
      notebookButton: notebookButton
    });
  },
  newNote() {
    let notebookId = window.location.hash.match(/#\/notebooks\/(\d+)/);
    NoteActions.createNote({
      title: "Name your Note",
      body: "and type!",
      notebook_id: notebookId ? notebookId[1] : 1
    });
  },
  logout() {
    SessionApiUtil.logout(hashHistory.push.bind(this, "/"));
  },
  render() {
    return <div className="main-page">
      <NotebooksIndex hidden={this.state.notebooks}
                      hide={this.toggleNotebooks}/>

      <div className="sidebar ">

        <div className="logo-image"/>

        <div className="new-note" onClick={this.newNote}>
          <button className="new-note" />
          <span>NEW NOTE</span>
        </div>

        <div className={this.state.notesButton} onClick={this.toggleButtons}>
          <button className="notes" />
          <span>NOTES</span>
        </div>

        <div className={this.state.notebookButton}
             onClick={this.toggleButtons}>
          <button className="notebook" />
          <span>NOTEBOOKS</span>
        </div>

        <div className="user-icon">
          <div className="logout">
            <div onClick={this.logout} />
          </div>
        </div>
      </div>

      {this.props.children}

    </div>;
  }
});

module.exports = MainPage;
