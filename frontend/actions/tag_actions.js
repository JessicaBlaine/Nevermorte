const AppDispatcher = require('../dispatcher/dispatcher');
const TagConstants = require('../constants/tag_constants');
const TagsApiUtil = require('../util/tags_api_util');
const NoteActions = require('./note_actions');
const NoteConstants = require('../constants/note_constants');

module.exports = {
  fetchTags(nameString) {
    TagsApiUtil.fetchTags(nameString, this.receiveAllTags, this.handleError);
  },
  getTag(name) {
    TagsApiUtil.getTag(name, this.receiveTag, this.handleError);
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
      actionType: TagConstants.TAGS_RECEIVED,
      tags: tags
    });
  },
  receiveTag(tag) {
    AppDispatcher.dispatch({
      actionType: TagConstants.TAG_RECEIVED,
      tag: tag
    });
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: tag.notes
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
