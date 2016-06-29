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
    return <form onSubmit={this.handleSubmit} onBlur={this.saveChanges}>
      <input onChange={this.handleChange.bind(null, 'title')}
                value={this.state.title}/>

      <input onChange={this.handleChange.bind(null, 'notebook_id')}
                value={this.state.notebook_id}/>

      <input onChange={this.handleChange.bind(null, 'body')}
                value={this.state.body}/>
    </form>;
  }
});

module.exports = NoteForm;
