const React = require('react');
const Link = require('react-router').Link;
// flux
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteConstants = require('../../constants/note_constants');
// components
const NotesIndexItem = require('./notes_index_item');
const NoteForm = require('./note_form');

const NotesIndex = React.createClass({
  getInitialState: function() {
    const notes = NoteStore.all(NoteConstants.ASC_UPDATED);
    return {
      notes: notes,
      index: "hidden",
      noteForm: undefined,
      selectedNote: undefined,
      buttonClass: "notebook"
    };
  },
  handleDelete(id, event) {
    event.stopPropagation();
    NoteActions.destroyNote(id);
  },
  componentDidMount() {
    this.storeListener = NoteStore.addListener(this._onChange);
    NoteActions.fetchNotes();
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    // debugger;
    console.log("changing");
    const notes = NoteStore.all(NoteConstants.ASC_UPDATED);
    let selectedNote = notes[0];
    if (this.state.selectedNote) {
      const foundNote = NoteStore.find(this.state.selectedNote.id);
      if (foundNote) selectedNote = foundNote;
    }
    this.setState({
                  notes: notes,
                  selectedNote: selectedNote,
                  noteForm: <NoteForm note={selectedNote}/>
               });
  },
  openForm(note) {
    console.log("opening Form");
    this.setState({
      noteForm: <NoteForm note={note}/>,
      selectedNote: note
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
        </ul>
      </div>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = NotesIndex;
