const React = require('react');

const TagStore = require('../../stores/tag_store');
const TagActions = require('../../actions/tag_actions');
const NoteStore = require('../../stores/note_store');

const TagIndexItem = require('./tag_index_item');
const TagsSearch = require('./tags_search');

const TagsIndex = React.createClass({
  getInitialState: function() {
    return {
      tags: TagStore.all()
    };
  },
  componentDidMount() {
    this.tagListener = TagStore.addListener(this._onChange);
    TagActions.fetchTags("");
  },
  _onChange() {
    this.setState({ tags: TagStore.all() });
  },
  render() {
    return <div onClick={ this.props.hide }
                className={ "tags-index " + this.props.hidden}>
      <div className="tags-container"
           onClick={ event => event.stopPropagation() }>
        <header>
          <h1>TAGS</h1>
          <TagsSearch closeTags={ this.props.hide }/>
        </header>
        <ul>
          {
            this.state.tags.map(tag => {
              return <li key={ tag.name }>
                <TagIndexItem closeTags={ this.props.hide } tag={ tag }/>
              </li>;
            })
          }
        </ul>
      </div>
    </div>;
  }
});

module.exports = TagsIndex;
