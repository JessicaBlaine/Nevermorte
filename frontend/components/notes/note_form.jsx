const React = require('react');
const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');

const NoteForm = React.createClass({
  getInitialState: function() {
    let note;
    if (this.props.note) {
      note = this.props.note;
    } else {
      // note = { id: this.props.params.noteId };
    }
    return {
      id: note.id,
      title: note.title,
      body: note.body,
      notebook_id: note.notebook_id
    };
  },
  // componentDidMount() {
  //   this.storeListener = NoteStore.addListener(this._onChange);
  //   NoteActions.getNote(this.state.id);
  // },
  // _onChange() {
  //   const note = NoteStore.find(this.state.id);
  //   this.setState({
  //     id: note.id,
  //     title: note.title,
  //     body: note.body,
  //     notebook_id: note.notebook_id
  //   });
  // },
  // componentWillUnmount() {
  //   this.storeListener.remove();
  // },
  componentWillReceiveProps(newProps) {
    const newNote = newProps.note;
    if (newNote) {
      this.setState({
        id: newNote.id,
        title: newNote.title,
        body: newNote.body,
        notebook_id: newNote.notebook_id
      });
    }
  },
  handleChange(attr, event) {
    clearTimeout(this.idleTimeout);
    // save after 5 second idle
    this.idleTimeout = setTimeout(this.saveChanges, 3000);
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
