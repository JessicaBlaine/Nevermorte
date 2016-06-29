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
    this.setState({ noteForm: <NoteForm note={note}/> });
  },
  render() {
    return <div>
      <ul>
        {
          this.state.notes.map(note => {
            return <li key={note.id} onClick={this.openForm.bind(null, note)}>
              <NotesIndexItem note={note}/>
            </li>;
          })
        }
      </ul>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = NotesIndex;
