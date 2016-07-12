const React = require('react');
const hashHistory = require('react-router').hashHistory;
// Flux
const NotebookStore = require('../../stores/notebook_store');
const NoteStore = require('../../stores/note_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteActions = require('../../actions/note_actions');
const NoteConstants = require('../../constants/note_constants');
// components
const NotesIndex = require('../notes/notes_index');
const NotesIndexItem = require('../notes/notes_index_item');
const NoteForm = require('../notes/note_form');
const NotebookEdit = require('./notebook_edit');

const NotebookIndexItem = React.createClass({
  getInitialState: function() {
    return {
      noteForm: undefined,
      notebook: NotebookStore.find(this.props.params.notebookId),
      updated: "",
      noteCount: 0
    };
  },
  componentWillReceiveProps(newProps) {
    NotebookActions.getNotebook(newProps.params.notebookId);
  },
  handleDelete(id, event) {
    event.stopPropagation();
    NoteActions.destroyNote(id);
    this.setState({ selectedNote: undefined, noteForm: undefined });
  },
  componentDidMount() {
    this.storeListener = NoteStore.addListener(this._onChange);
    NotebookActions.getNotebook(this.props.params.notebookId);
  },
  componentWillUnmount() {
    this.storeListener.remove();
    this.setState({ noteForm: undefined });
  },
  _onChange() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(
      this.setState.bind(this, { updated: "" }), 3000
    );
    const notes = NoteStore.all(NoteConstants.ASC_UPDATED);
    this.setState({
                  updated: "✓",
                  notebook: NotebookStore.find(this.props.params.notebookId)
              });
  },
  openForm(note) {
    this.setState({
      noteForm: <NoteForm note={note}/>
    });
  },
  editNotebook() {
    hashHistory.push(`/notebooks/${this.props.params.notebookId}/edit`);
  },
  setNoteCount(num) {
    this.setState({ noteCount: num });
  },
  render() {
    let notebook = this.state.notebook;
    let title = "";
    if (notebook.title) {
        title = notebook.title;
        title = title.length <= 20 ? title : title.slice(0, 20) + "...";
    }
    return <div className="notes-index-container">
      <div className="index">
        <header>
          <h1>{title}<span className="updated">{this.state.updated}</span></h1>
          <NotebookEdit notebook={notebook}/>
          <span>{this.state.noteCount + " notes"}</span>

        </header>
        <NotesIndex openForm={this.openForm} noteCount={this.setNoteCount}/>
      </div>

      <div className="block"/>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = NotebookIndexItem;
