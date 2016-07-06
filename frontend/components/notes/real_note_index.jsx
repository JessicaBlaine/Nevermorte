const React = require('react');

const NoteStore = require('../../stores/note_store');

const RealNoteIndex = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all()
    };
  },
  render() {
    return <ul className="notes-index">
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
    </ul>;
  }
});

module.exports = RealNoteIndex;
