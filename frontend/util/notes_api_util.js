
module.exports = {
  fetchNotes(onSuccess, onError) {
    $.ajax({
      url: `api/notes`,
      method: 'GET',
      success: onSuccess,
      error: onError
    });
  },
  getNote(id, onSuccess, onError) {
    $.ajax({
      url: `api/notes/${id}`,
      method: 'GET',
      success: onSuccess,
      error: onError
    });
  },
  createNote(note, onSuccess, onError) {
    $.ajax({
      url: `api/notes`,
      method: 'POST',
      data: { note },
      success: onSuccess,
      error: onError
    });
  },
  updateNote(note, onSuccess, onError) {
    $.ajax({
      url: `api/notes/${note.id}`,
      method: 'PATCH',
      data: { note },
      success: onSuccess,
      error: onError
    });
  },
  destroyNote(id, onSuccess, onError) {
    $.ajax({
      url: `api/notes/${id}`,
      method: 'DELETE',
      success: onSuccess,
      error: onError
    });
  }
};
