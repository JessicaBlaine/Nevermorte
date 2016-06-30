const React = require('react');
// flux
const NoteStore = require('../stores/note_store');
const NoteActions = require('../actions/note_actions');
// components
const NotesIndexItem = require('./notes_index_item');
const NoteForm = require('./note_form');

const NotesIndex = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all(),
      noteForm: ""
    };
  },
  componentDidMount() {
    NoteStore.addListener(this._onChange);
    NoteActions.fetchNotes();
  },
  _onChange() {
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
    return <div >

      <ul className="notes-index">
        <header>
          <h1>NOTES</h1>
          <span>{this.state.notes.length + " notes"}</span>
        </header>
        {
          this.state.notes.map(note => {
            let selected = this.state.selectedNote === note ? "selected" : "";
            return <li key={note.id}
              className={selected}
              onClick={this.openForm.bind(null, note)}>
                <NotesIndexItem note={note}/>
            </li>;
          })
        }
        <li onClick={this.newNote}>Start a new Note</li>
      </ul>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = NotesIndex;
