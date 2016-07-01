const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
let _notes = {};
const NoteStore = new Store(AppDispatcher);

const NoteConstants = require('../constants/note_constants');

const _resetNotes = function(notes) {
  _notes = {};
  notes.forEach(note => {
    _notes[note.id] = note;
  });
  NoteStore.__emitChange();
};

NoteStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NoteConstants.NOTES_RECEIVED:
      _resetNotes(payload.notes);
      break;
    case NoteConstants.NOTE_RECEIVED:
      _notes[payload.note.id] = payload.note;
      NoteStore.__emitChange();
      break;
    case NoteConstants.NOTE_REMOVED:
      delete _notes[payload.note.id];
      NoteStore.__emitChange();
      break;
  }
};

NoteStore.find = function(id) {
  return _notes[id];
};

NoteStore.all = function() {
  return Object.assign([], _notes);
};

module.exports = NoteStore;
