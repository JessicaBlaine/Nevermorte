const React = require('react');
const Link = require('react-router').Link;
// flux
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
// components
const NotesIndexItem = require('./notes_index_item');
const NoteForm = require('./note_form');

const NotesIndex = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all(),
      index: "hidden",
      noteForm: undefined,
      selectedNote: undefined,
      buttonClass: "notebook"
    };
  },
  handleDelete(id, event) {
    event.stopPropagation();
    NoteActions.destroyNote(id);
    this.setState({ selectedNote: undefined, noteForm: undefined });
  },
  componentDidMount() {
    this.storeListener = NoteStore.addListener(this._onChange);
    NoteActions.fetchNotes();
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
  },
  render() {
    return <div className="notes-index-container">

      <div>
        <header>
          <h1>NOTES</h1>
          <span>{this.state.notes.length + " notes"}</span>
        </header>
        <ul className="notes-index">
          {
            this.state.notes.map(note => {
              let selected = this.state.selectedNote === note ? "selected" : "";
              return <li key={note.id}
                className={selected}
                onClick={this.openForm.bind(null, note)}>
                  <NotesIndexItem handleDelete={this.handleDelete}
                                  note={note}/>
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

module.exports = NotesIndex;
