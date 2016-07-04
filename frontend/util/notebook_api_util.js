
module.exports = {
  fetchNotebooks(onSuccess, onError) {
    $.ajax({
      url: `api/notebooks`,
      method: 'GET',
      success: onSuccess,
      error: onError
    });
  },
  getNotebook(id, onSuccess, onError) {
    $.ajax({
      url: `api/notebooks/${id}`,
      method: 'GET',
      success: onSuccess,
      error: onError
    });
  },
  createNotebook(notebook, onSuccess, onError) {
    $.ajax({
      url: `api/notebooks`,
      method: 'POST',
      data: { notebook: notebook },
      success: onSuccess,
      error: onError
    });
  },
  updateNotebook(notebook, onSuccess, onError) {
    $.ajax({
      url: `api/notebooks/${notebook.id}`,
      method: 'PATCH',
      data: { notebook: {title: notebook.title} },
      success: onSuccess,
      error: onError
    });
  },
  destroyNotebook(id, onSuccess, onError) {
    $.ajax({
      url: `api/notebooks/${id}`,
      method: 'DELETE',
      success: onSuccess,
      error: onError
    });
  }
};
