const React = require('react');
const hashHistory = require('react-router').hashHistory;

const NotebookStore = require('../../stores/notebook_store');
const NoteStore = require('../../stores/note_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteActions = require('../../actions/note_actions');
const NotesIndexItem = require('../notes/notes_index_item');
const NoteForm = require('../notes/note_form');
const NotebookEdit = require('./notebook_edit');

const NotebookIndexItem = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all(),
      noteForm: undefined,
      selectedNote: undefined,
      notebook: NotebookStore.find(this.props.params.notebookId),
      updated: ""
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
  },
  _onChange() {
    console.log("changing");
    setTimeout(this.setState.bind(this, { updated: "" }), 3000);
    const notes = NoteStore.all();
    let selectedNote = notes[0];
    if (this.state.selectedNote) {
      const foundNote = NoteStore.find(this.state.selectedNote.id);
      if (foundNote) selectedNote = foundNote;
    }
    this.setState({
                  notes: notes,
                  selectedNote: selectedNote,
                  noteForm: <NoteForm note={selectedNote}/>,
                  updated: "✓",
                  notebook: NotebookStore.find(this.props.params.notebookId)
              });
  },
  openForm(note) {
    console.log("opening Form");
    this.setState({
      noteForm: <NoteForm note={note}/>,
      selectedNote: note
    });
  },
  editNotebook() {
    hashHistory.push(`/notebooks/${this.props.params.notebookId}/edit`);
  },
  render() {
    let notebook = this.state.notebook;
    let title = "";
    if (notebook) {
        title = notebook.title;
        title = title.length <= 20 ? title : title.slice(0, 20) + "...";
    }
    return <div className="notes-index-container">
      <div>
        <header>
          <h1>{title}<span className="updated">{this.state.updated}</span></h1>
          <NotebookEdit notebook={notebook}/>
          <span>{this.state.notes.length + " notes"}</span>

        </header>
        <ul className="notes-index">
          {
            this.state.notes.map(note => {
              let selected = this.state.selectedNote === note ? "selected" : "";
              return <li key={note.id}
                className={selected}
                onClick={this.openForm.bind(null, note)}>
                  <NotesIndexItem handleDelete={this.handleDelete} note={note}/>
              </li>;
            })
          }
        </ul>
      </div>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = NotebookIndexItem;
