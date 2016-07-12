const React = require('react');
const prettyDate = require('../../util/pretty_date');
const NoteActions = require('../../actions/note_actions');

const NotesIndexItem = React.createClass({
  handleDelete(event) {
    event.stopPropagation();
    NoteActions.destroyNote(this.props.note.id);
  },
  render() {
    let body = this.props.note.body;
    const div = document.createElement("div");
    div.innerHTML = body;
    body = div.textContent || div.innerText || "";
    body = body.length <= 90 ? body : body.slice(0, 90) + "...";
    return <div>
      <button onClick={this.handleDelete}></button>
      <h4>{this.props.note.title}</h4>
      <h5>{prettyDate(this.props.note.updated_at)}</h5>
      <p>{body}</p>
    </div>;
  }
});

module.exports = NotesIndexItem;
