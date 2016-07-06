const React = require('react');
const hashHistory = require('react-router').hashHistory;
// Flux
const NoteStore = require('../../stores/note_store');
const NoteActions = require('../../actions/note_actions');
const NoteConstants = require('../../constants/note_constants');
const TagActions = require('../../actions/tag_actions');
const TagStore = require('../../stores/tag_store');
// components
const NotesIndexItem = require('../notes/notes_index_item');
const NoteForm = require('../notes/note_form');

const TagNotesIndex = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all(NoteConstants.ASC_UPDATED),
      noteForm: undefined,
      selectedNote: undefined,
      tag: TagStore.find(this.props.params.tagId),
      updated: ""
    };
  },
  componentWillReceiveProps(newProps) {
    TagActions.fetchTags(newProps.params.tagId);
  },
  handleDelete(id, event) {
    event.stopPropagation();
    NoteActions.destroyNote(id);
    this.setState({ selectedNote: undefined, noteForm: undefined });
  },
  componentDidMount() {
    this.storeListener = NoteStore.addListener(this._onChange);
    NotebookActions.getNotebook(this.props.params.tagId);
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    console.log("changing");
    setTimeout(this.setState.bind(this, { updated: "" }), 3000);
    const notes = NoteStore.all(NoteConstants.ASC_UPDATED);
    let selectedNote = notes[0];
    if (this.state.selectedNote) {
      const foundNote = NoteStore.find(this.state.selectedNote.id);
      if (foundNote) selectedNote = foundNote;
    }
    this.setState({
                  notes: notes,
                  selectedNote: selectedNote,
                  noteForm: <NoteForm note={selectedNote}/>,
                  updated: "✓",
                  tag: NotebookStore.find(this.props.params.tagId)
              });
  },
  openForm(note) {
    console.log("opening Form");
    this.setState({
      noteForm: <NoteForm note={note}/>,
      selectedNote: note
    });
  },
  editNotebook() {
    hashHistory.push(`/tags/${this.props.params.tagId}/edit`);
  },
  render() {
    let tag = this.state.tag;
    let title = "";
    if (tag) {
        title = tag.title;
        title = title.length <= 20 ? title : title.slice(0, 20) + "...";
    }
    return <div className="notes-index-container">
      <div>
        <header>
          <h1>{title}<span className="updated">{this.state.updated}</span></h1>
          <NotebookEdit tag={tag}/>
          <span>{this.state.notes.length + " notes"}</span>

        </header>
        <ul className="notes-index">
          {
            this.state.notes.map(note => {
              let selected = this.state.selectedNote === note ? "selected" : "";
              return <li key={note.id}
                className={selected}
                onClick={this.openForm.bind(null, note)}>
                  <NotesIndexItem handleDelete={this.handleDelete} note={note}/>
              </li>;
            })
          }
        </ul>
      </div>
      {this.state.noteForm}
    </div>;
  }
});

module.exports = TagNotesIndex;
