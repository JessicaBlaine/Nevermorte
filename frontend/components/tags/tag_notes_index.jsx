const React = require('react');

const NotesIndex = require('../notes/notes_index');
const NoteForm = require('../notes/note_form');

const TagNotesIndex = React.createClass({
  getInitialState: function() {
    return {
      updated: "",
      noteCount: 0,
      noteForm: undefined
    };
  },
  componentDidMount() {
    
  },
  openForm(note) {
    this.setState({ noteForm: <NoteForm note={note}/> });
  },
  setNoteCount(num) {
    this.setState({ noteCount: num });
  },
  render() {
    return <div className="notes-index-container">
      <div>

        <header>
          <h1>
            {this.props.params.tagName}
            <span className="updated">{this.state.updated}</span>
          </h1>
          <span>{this.state.noteCount + " notes"}</span>
        </header>

        <NotesIndex openForm={this.openForm} noteCount={this.setNoteCount}/>

      </div>

      {this.state.noteForm}

    </div>;
  }
});

module.exports = TagNotesIndex;
