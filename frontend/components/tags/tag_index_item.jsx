const React = require('react');
const hashHistory = require('react-router').hashHistory;

const TagActions = require('../../actions/tag_actions');

const TagIndexItem = React.createClass({
  handleDelete() {
    this.props.tag.notes.forEach(note => {
      TagActions.destroyTag(note.id, this.props.tag.name);
    });
  },
  openNotesIndex() {
    hashHistory.push(`/tags/${this.props.tag.name}`);
  },
  render() {
    return <div className="tag">
      <div className="name" onClick={this.openNotesIndex}>
        <span>{this.props.tag.name}</span>
        <span className="count">{this.props.tag.notes.length}</span>
      </div>
      <div className="buttons">
        <button className="delete" onClick={ this.handleDelete }/>
      </div>
    </div>;
  }
});

module.exports = TagIndexItem;
