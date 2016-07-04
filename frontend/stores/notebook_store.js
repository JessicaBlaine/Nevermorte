const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
let _notebooks = {};
const NotebookStore = new Store(AppDispatcher);

const NotebookConstants = require('../constants/notebook_constants');

const _resetNotebooks = function(notebooks) {
  _notebooks = {};
  notebooks.forEach(notebook => {
    _notebooks[notebook.id] = notebook;
  });
  NotebookStore.__emitChange();
};

NotebookStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NotebookConstants.NOTEBOOKS_RECEIVED:
      _resetNotebooks(payload.notebooks);
      break;
    case NotebookConstants.NOTEBOOK_RECEIVED:
      _notebooks[payload.notebook.id] = payload.notebook;
      NotebookStore.__emitChange();
      break;
    case NotebookConstants.NOTEBOOK_REMOVED:
      delete _notebooks[payload.notebook.id];
      NotebookStore.__emitChange();
      break;
  }
};

NotebookStore.find = function(id) {
  return _notebooks[id];
};

NotebookStore.all = function() {
  return Object.keys(_notebooks).map(key => _notebooks[key]);
};

NotebookStore.defaultNotebook = 1;

module.exports = NotebookStore;
