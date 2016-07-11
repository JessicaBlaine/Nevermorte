const React = require('react');
const Link = require('react-router').Link;
// flux
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteConstants = require('../../constants/note_constants');
// components
const NotesIndexItem = require('./notes_index_item');
const NoteForm = require('./note_form');
const NotesIndex = require('./notes_index');

const Index = React.createClass({
  getInitialState: function() {
    return {
      noteCount: 0,
      noteForm: undefined,
    };
  },
  componentDidMount() {
    NoteActions.fetchNotes();
  },
  setNoteCount(num) {
    this.setState({ noteCount: num });
  },
  openForm(note) {
    this.setState({
      noteForm: <NoteForm note={note}/>
    });
  },
  render() {
    return <div className="notes-index-container">
      <div className="index">
        <header>
          <h1>NOTES</h1>
          <span>{this.state.noteCount + " notes"}</span>
        </header>
        <NotesIndex openForm={this.openForm} noteCount={this.setNoteCount}/>
      </div>

      <div className="block"/>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = Index;
