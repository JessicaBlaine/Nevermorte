const React = require('react');

// const TagStore = require('../../stores/tag_store');
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');

const TagForm = require('./tag_form');

const NoteTagsIndex = React.createClass({
  getInitialState: function() {
    return {
      tags: []
    };
  },
  componentDidMount() {
    this.storeListener = NoteStore.addListener(this._onChange);
    NoteActions.getNote(this.props.noteId);
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    let tags = NoteStore.find(this.props.noteId).tags;
    this.setState({ tags: tags ? tags.reverse() : [] });
  },
  render() {
    return <div className="tags-index input">
      <div className="icon"/>
      <ul>
        <li><TagForm noteId={ this.props.noteId }/></li>
        { this.state.tags.map(tag => <li key={tag.name}>{tag.name}</li>) }
      </ul>

    </div>;
  }
});

module.exports = NoteTagsIndex;
