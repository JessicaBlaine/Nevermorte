const React = require('react');
const ReactQuill = require('react-quill');

const NoteActions = require('../../actions/note_actions');
const NoteStore = require('../../stores/note_store');
const NoteTagsIndex = require('../tags/note_tags_index');
const NotebooksDropdown = require('../notebooks/notebooks_dropdown');



const NoteForm = React.createClass({
  getInitialState: function() {
    let note = this.props.note;
    return {
      id: note.id,
      title: note.title,
      body: note.body,
      notebook_id: note.notebook_id
    };
  },
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
    // save after form edited
    this.idleTimeout = setTimeout(this.saveChanges, -1);

    this.setState({ [attr]: event.target.value });
  },
  handleSubmit(event) {
    event.preventDefault();
    this.saveChanges();
  },
  saveChanges() {
    NoteActions.editNote(this.state);
  },
  handleTextChange(value) {
    clearTimeout(this.idleTimeout);
    // save after form edited
    this.idleTimeout = setTimeout(this.saveChanges, -1);
    this.setState({ body: value });
  },
  render() {
    return <form className="note-form"
                 onSubmit={ this.handleSubmit }
                 onBlur={ this.saveChanges }>
      <div className="inputs">
        <div className="upper-inputs">
          <NotebooksDropdown handleChange={ this.handleChange }
                             selectedId={ this.state.notebook_id }/>

          <NoteTagsIndex/>
        </div>
        <input onChange={ this.handleChange.bind(null, 'title') }
               value={ this.state.title }
               className="title input"/>
      </div>
      <ReactQuill theme="snow"
                  onChange={ this.handleTextChange }
                  value={ this.state.body }/>


    </form>;
  }
});

module.exports = NoteForm;
