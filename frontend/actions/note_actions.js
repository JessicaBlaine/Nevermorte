const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NotesApiUtil = require('../util/notes_api_util');
const TagConstants = require('../constants/tag_constants');

module.exports = {
  fetchNotes() {
    NotesApiUtil.fetchNotes(this.receiveAllNotes.bind(this), this.onError);
  },
  getNote(id) {
    NotesApiUtil.getNote(id, this.receiveSingleNote.bind(this), this.onError);
  },
  createNote(note) {
    NotesApiUtil.createNote(note, this.receiveSingleNote.bind(this),
                            this.onError);
  },
  editNote(note) {
    NotesApiUtil.updateNote(note, this.receiveSingleNote.bind(this),
                            this.onError);
  },
  destroyNote(id) {
    NotesApiUtil.destroyNote(id, this.removeNote, this.onError);
  },
  selectNote(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_SELECTED,
      note: note
    });
  },
  receiveAllNotes(notes) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: notes
    });
  },
  receiveSingleNote(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_RECEIVED,
      note: note
    });
    this.selectNote(note);
  },
  removeNote(note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_REMOVED,
      note: note
    });
  },
  onError(resp) {
    //replace with actual error-handling
    console.log(resp);
  }
};
