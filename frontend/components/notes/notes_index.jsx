const React = require('react');
// Flux
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteConstants = require('../../constants/note_constants');
const SelectionStore = require('../../stores/selection_store');
// components
const NotesIndexItem = require('./notes_index_item');

const NotesIndex = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all(NoteConstants.ASC_UPDATED),
      selectedNote: SelectionStore.selectedNote()
    };
  },
  componentDidMount() {
    this.noteStoreListener = NoteStore.addListener(this._noteChange);
    this.selectionStoreListener =
      SelectionStore.addListener(this._selectionChange);
      if (this.state.selectedNote.id) {
        this.props.openForm(this.state.selectedNote);
      }
  },
  componentWillUnmount() {
    this.noteStoreListener.remove();
    this.selectionStoreListener.remove();
  },
  componentWillReceiveProps() {
    delete this.props;
  },
  _noteChange() {
    const notes = NoteStore.all(NoteConstants.ASC_UPDATED);
    this.props.noteCount(notes.length);
    this.setState({ notes: notes });
  },
  _selectionChange() {
    const note = SelectionStore.selectedNote();
    this.setState({ selectedNote: note });
    this.props.openForm(note);
  },
  selectNote(note) {
    NoteActions.selectNote(note);
  },
  render() {
    return <ul className="notes-index">
      {
        this.state.notes.map(note => {
          let selected =
            this.state.selectedNote.id === note.id ? "selected" : "";
          return <li onClick={this.selectNote.bind(null, note)}
                     key={note.id}
                     className={selected}>

            <NotesIndexItem note={note}/>
          </li>;
        })
      }
    </ul>;
  }
});

module.exports = NotesIndex;
