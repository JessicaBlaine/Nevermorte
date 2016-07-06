const AppDispatcher = require('../dispatcher/dispatcher');
const TagConstants = require('../constants/tag_constants');
const TagsApiUtil = require('../util/tags_api_util');
const NoteActions = require('./note_actions');

module.exports = {
  fetchTags(nameString) {
    TagsApiUtil.fetchTags(nameString, this.receiveAllTags, this.handleError);
  },
  createTag(noteId, tag) {
    TagsApiUtil.createTag(
                          noteId,
                          tag,
                          NoteActions.receiveSingleNote,
                          this.handleError
                        );
  },
  destroyTag(noteId, tagName) {
    TagsApiUtil.destroyTag(
                           noteId,
                           tagName,
                           this.removeTag.bind(this),
                           this.handleError
                         );
  },
  receiveAllTags(tags) {
    AppDispatcher.dispatch({
      actionType: TagConstants.receiveAllTags,
      tags: tags
    });
  },
  removeTag(note) {
    this.fetchTags("");
    NoteActions.receiveSingleNote(note);
  },
  handleError(error) {

    console.log(error);
  }
};
