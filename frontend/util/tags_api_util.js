module.exports = {
  fetchTags(nameString, onSuccess, onError) {
    $.ajax({
      url: `api/tags?name=${nameString}`,
      method: 'GET',
      success: onSuccess,
      error: onError
    });
  },
  createTag(noteId, tag, onSuccess, onError) {
    $.ajax({
      url: `api/notes/${noteId}/tags`,
      method: 'POST',
      data: { tag },
      success: onSuccess,
      error: onError
    });
  },
  destroyTag(noteId, tagName, onSuccess, onError) {
    $.ajax({
      url: `api/notes/${noteId}/tags/${tagName}`,
      method: 'DELETE',
      success: onSuccess,
      error: onError
    });
  }
};
