const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
let _tags = {};
const TagStore = new Store(AppDispatcher);

const TagConstants = require('../constants/tag_constants');

const _resetTags = function(tags) {
  _tags = {};
  tags.forEach(tag => {
    _tags[tag.name] = tag;
  });
  TagStore.__emitChange();
};

TagStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case TagConstants.TAGS_RECEIVED:
      _resetTags(payload.tags);
      TagStore.__emitChange();
      break;
    case TagConstants.TAG_RECEIVED:
      _tags[payload.tag.name] = payload.tag;
      TagStore.__emitChange();
      break;
  }
};

TagStore.all = function() {
  return Object.keys(_tags).map( key => _tags[key] );
};

module.exports = TagStore;
