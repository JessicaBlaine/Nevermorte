const React = require('react');

const NotebookStore = require('../../stores/notebook_store');
const NoteStore = require('../../stores/note_store');
const NotebookActions = require('../../actions/notebook_actions');
const NoteActions = require('../../actions/note_actions');
const NotesIndexItem = require('../notes/notes_index_item');
const NoteForm = require('../notes/note_form');

const NotebookIndexItem = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all(),
      noteForm: undefined,
      selectedNote: undefined
    };
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
    this.setState({ notes: NoteStore.all() });
  },
  openForm(note) {
    console.log("opening Form");
    this.setState({
      noteForm: <NoteForm note={note}/>,
      selectedNote: note
    });
  },
  newNote() {
    NoteActions.createNote({
      title: "Name your note",
      body: "and start typing",
      notebook_id: 0
    });
    NotebookActions.getNotebook(this.props.params.notebookId);
  },
  render() {
    let noteBook = NotebookStore.find(this.props.params.notebookId);
    let title = noteBook ? noteBook.title : "";
    return <div className="notes-index-container">
      <div>
        <header>
          <h1>{title}</h1>
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
          <li onClick={this.newNote}>Start a new Note</li>
        </ul>
      </div>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = NotebookIndexItem;
