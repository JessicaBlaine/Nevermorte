const React = require('react');

const TagStore = require('../../stores/tag_store');
const TagActions = require('../../actions/tag_actions');
const TagIndexItem = require('./tag_index_item');
const NoteStore = require('../../stores/note_store');

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
        <h1>TAGS</h1>
        <ul>
          {
            this.state.tags.map(tag => {
              return <li key={ tag.name }><TagIndexItem tag={ tag }/></li>;
            })
          }
        </ul>
      </div>
    </div>;
  }
});

module.exports = TagsIndex;
