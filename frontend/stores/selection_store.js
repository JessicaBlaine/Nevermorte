const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SelectionStore = new Store(AppDispatcher);

const NoteConstants = require('../constants/note_constants');

let _selectedNote = {};

SelectionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NoteConstants.NOTE_SELECTED:
      if (_selectedNote.id !== payload.note.id) {
        _selectedNote = payload.note;
        SelectionStore.__emitChange();
      }
      break;
    default:

  }
};

SelectionStore.selectedNote = () => Object.assign({}, _selectedNote);

module.exports = SelectionStore;
