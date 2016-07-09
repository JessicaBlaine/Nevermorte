const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SelectionStore = new Store(AppDispatcher);

const NoteConstants = require('../constants/note_constants');
const NotebookConstants = require('../constants/notebook_constants');

let _selectedNote = {};
let _selectedNotebook = {};

SelectionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NoteConstants.NOTE_SELECTED:
      if (_selectedNote.id !== payload.note.id) {
        _selectedNote = payload.note;
        SelectionStore.__emitChange();
      }
      break;
    case NoteConstants.NOTEBOOK_SELECTED:
      if (_selectedNote.id !== payload.note.id) {
        _selectedNote = payload.note;
        SelectionStore.__emitChange();
      }
      break;
  }
};

SelectionStore.selectedNote = () => Object.assign({}, _selectedNote);

SelectionStore.selectedNotebook = () => Object.assign({}, _selectedNotebook);

module.exports = SelectionStore;
