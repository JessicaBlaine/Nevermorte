const AppDispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookApiUtil = require('../util/notebook_api_util');

module.exports = {
  fetchNotebooks() {
    NotebookApiUtil.fetchNotebooks(this.receiveAllNotebooks, this.onError);
  },
  getNotebook(id) {
    NotebookApiUtil.getNotebook(id, this.receiveSingleNotebook, this.onError);
  },
  createNotebook(notebook) {
    NotebookApiUtil.createNotebook(notebook,
                                    this.receiveSingleNotebook,
                                    this.onError
                                  );
  },
  editNotebook(notebook) {
    NotebookApiUtil.updateNotebook(notebook,
                                    this.receiveSingleNotebook,
                                    this.onError
                                  );
  },
  destroyNotebook(id) {
    NotebookApiUtil.destroyNotebook(id, this.removeNotebook, this.onError);
  },
  receiveAllNotebooks(notebooks) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOKS_RECEIVED,
      notebooks: notebooks
    });
  },
  receiveSingleNotebook(notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_RECEIVED,
      notebook: notebook
    });
  },
  removeNotebook(notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_REMOVED,
      notebook: notebook
    });
  },
  onError(resp) {
    console.log(resp);
  }
};
