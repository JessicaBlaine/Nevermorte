const React = require('react');
const NoteActions = require('../actions/note_actions');

const NoteForm = React.createClass({
  getInitialState: function() {
    const note = this.props.note;
    return {
      id: note.id,
      title: note.title,
      body: note.body,
      notebook_id: note.notebook_id
    };
  },
  componentWillReceiveProps(newProps) {
    const newNote = newProps.note;
    this.setState({
      id: newNote.id,
      title: newNote.title,
      body: newNote.body,
      notebook_id: newNote.notebook_id
    });
  },
  handleChange(attr, event) {
    clearTimeout(this.idleTimeout);
    // save after 5 second idle
    this.idleTimeout = setTimeout(this.saveChanges, 5000);
    this.setState({ [attr]: event.target.value });
  },
  handleSubmit(event) {
    event.preventDefault();
    this.saveChanges();
  },
  saveChanges() {
    NoteActions.editNote(this.state);
  },
  render() {
    return <form className="note-form" onSubmit={this.handleSubmit} onBlur={this.saveChanges}>
      <input onChange={this.handleChange.bind(null, 'notebook_id')}
        value={this.state.notebook_id}/>

      <input onChange={this.handleChange.bind(null, 'title')}
        value={this.state.title}/>

      <textarea onChange={this.handleChange.bind(null, 'body')}
        value={this.state.body}/>
    </form>;
  }
});

module.exports = NoteForm;
