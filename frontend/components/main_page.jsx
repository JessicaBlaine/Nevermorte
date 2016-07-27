const React = require('react');
const hashHistory = require('react-router').hashHistory;

const NotebooksIndex = require('./notebooks/notebooks_index');
const NoteForm = require('./notes/note_form');
const NoteActions = require('../actions/note_actions');
const NotebookStore = require('../stores/notebook_store');
const SessionApiUtil = require('../util/session_api_util');
const TagsIndex = require('./tags/tags_index');


const MainPage = React.createClass({
  getInitialState: function() {
    return {
      notebooks: "hidden",
      notebookButton: "notebook",
      notesButton: "notes",
      tags: "hidden",
      tagsButton: "tags",
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
  toggleTags() {
    let isHidden = this.state.tags === "hidden";
    this.setState({
      tags: isHidden ? "revealed" : "hidden",
      tagsButton: isHidden ? "tags selected" : "tags"
    });
  },
  toggleButtons(event) {
    const buttonPressed = event.currentTarget.className;
    this.setState({
      notebooks: "hidden",
      notebookButton: "notebook",
      notesButton: "notes",
      tags: "hidden",
      tagsButton: "tags"
    });
    if (buttonPressed.includes("notes")) {
      this.setState({ notesButton: "notes selected" });
      hashHistory.push('/notes');
    }
    if (buttonPressed.includes("notebook")) {
      this.toggleNotebooks();
    }
    if (buttonPressed.includes("tags")) {
      this.toggleTags();
    }
  },
  newNote() {
    let notebookId = window.location.hash.match(/#\/notebooks\/(\d+)/);
    NoteActions.createNote({
      title: "Name your Note",
      body: "and type!",
      notebook_id: notebookId ? notebookId[1] : null
    });
  },
  logout() {
    SessionApiUtil.logout(hashHistory.push.bind(this, "/"));
  },
  render() {
    return <div className="main-page">
      <NotebooksIndex hidden={this.state.notebooks}
                      hide={this.toggleNotebooks}/>

      <TagsIndex hidden={this.state.tags} hide={this.toggleTags}/>

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
            <span>LOGOUT</span>
          </div>
        </div>

        <div className={ this.state.tagsButton } onClick={this.toggleButtons}>
          <button className="tags"/>
          <span>TAGS</span>
        </div>

      </div>

      {this.props.children}

    </div>;
  }
});

module.exports = MainPage;
