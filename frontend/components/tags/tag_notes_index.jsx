const React = require('react');

const TagActions = require('../../actions/tag_actions');
const TagStore = require('../../stores/tag_store');

const NotesIndex = require('../notes/notes_index');
const NoteForm = require('../notes/note_form');

const TagNotesIndex = React.createClass({
  getInitialState: function() {
    return {
      updated: "",
      noteCount: 0,
      noteForm: undefined
    };
  },
  componentDidMount() {
    // this.storeListener = TagStore.addListener(this._onChange);
    TagActions.getTag(this.props.params.tagName);
  },
  // componentWillUnmount() {
  //   this.storeListener.remove();
  // },
  _onChange() {
    console.log("tag changing");
  },
  componentWillReceiveProps(nextProps) {
    TagActions.getTag(nextProps.params.tagName);
  },
  openForm(note) {
    this.setState({ noteForm: <NoteForm note={note}/> });
  },
  setNoteCount(num) {
    this.setState({ noteCount: num });
  },
  render() {
    return <div className="notes-index-container">
      <div className="index">

        <header>
          <h1>
            {this.props.params.tagName}
            <span className="updated">{this.state.updated}</span>
          </h1>
          <span>{this.state.noteCount + " notes"}</span>
        </header>

        <NotesIndex openForm={this.openForm} noteCount={this.setNoteCount}/>

      </div>

      {this.state.noteForm}

    </div>;
  }
});

module.exports = TagNotesIndex;
