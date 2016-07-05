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

NoteStore.all = function(order) {
  const notes = Object.keys(_notes).map(key => _notes[key] );
  switch (order) {
    case NoteConstants.ASC_UPDATED:
      return notes.sort(function(a, b) {
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) - new Date(b.updated_at) === 0) return 0;
      });
    case NoteConstants.DESC_UPDATED:
      return notes.sort(function(a, b) {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return -1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) - new Date(b.updated_at) === 0) return 0;
      });
    case NoteConstants.ASC_CREATED:
      return notes.sort(function(a, b) {
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) - new Date(b.updated_at) === 0) return 0;
      });
    case NoteConstants.DESC_CREATED:
      return notes.sort(function(a, b) {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return -1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) - new Date(b.updated_at) === 0) return 0;
      });
    default:
      return notes;
  }
};

module.exports = NoteStore;
