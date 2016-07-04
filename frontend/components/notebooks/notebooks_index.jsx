const React = require('react');
const hashHistory = require('react-router').hashHistory;

const NotebookStore = require('../../stores/notebook_store');
const NoteStore = require('../../stores/note_store');
const NotebookActions = require('../../actions/notebook_actions');
const NotebookForm = require('./notebook_form');

const NotebooksIndex = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.all(),
      newForm: "hidden"
    };
  },
  componentDidMount() {
    this.noteListener = NotebookStore.addListener(this._onChange);
    this.notebookListener = NoteStore.addListener(
                          NotebookActions.fetchNotebooks.bind(NotebookActions)
                        );
    NotebookActions.fetchNotebooks();
  },
  componentWillUnmount() {
    this.noteListener.remove();
    this.notebookListener.remove();
  },
  _onChange() {
    this.setState({ notebooks: NotebookStore.all() });
  },
  showNotebook(notebook, event) {
    hashHistory.push(`/notebooks/${notebook.id}`);
    this.props.hide();
  },
  handleDelete(notebook, event) {
    event.stopPropagation();
    NotebookActions.destroyNotebook(notebook.id);
  },
  newNotebook() {
    this.setState({ newForm: "revealed" });
  },
  closeNewForm() {
    this.setState({ newForm: "hidden" });
  },
  render() {
    return <div onClick={this.props.hide}
                className={"notebooks-index " + this.props.hidden}>
      <div onClick={ (event) => event.stopPropagation() }>
        <h1>NOTEBOOKS</h1>
        <button className="create" onClick={this.newNotebook}/>
        <ul>
          {
            this.state.notebooks.map(notebook => {
              let noteCount = notebook.noteCount;
              noteCount += noteCount === 1 ? " note" : " notes";
              return <li onClick={this.showNotebook.bind(null, notebook)}
                         key={notebook.id}>
                <button onClick={this.handleDelete.bind(null, notebook)}/>
                <h2>{notebook.title}</h2>
                <span>{noteCount}</span>
              </li>;
            })
          }
        </ul>

      </div>



    </div>;
  }
});

module.exports = NotebooksIndex;

// <NotebookForm hidden={this.state.newForm} hide={this.closeNewForm}/>
