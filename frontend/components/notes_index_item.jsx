const React = require('react');
const prettyDate = require('../util/pretty_date');
const NoteActions = require('../actions/note_actions');

const NotesIndexItem = React.createClass({
  render() {
      let body = this.props.note.body;
      body = body.length <= 90 ? body : body.slice(0, 90) + "...";
    return <div>
      <button onClick={this.props.handleDelete}></button>
      <h4>{this.props.note.title}</h4>
      <h5>{prettyDate(this.props.note.updated_at)}</h5>
      <p>{body}</p>
    </div>;
  }
});

module.exports = NotesIndexItem;
