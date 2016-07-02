const React = require('react');
const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');

const NotebooksIndex = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.all()
    };
  },
  componentDidMount() {
    NotebookStore.addListener(this._onChange);
    NotebookActions.fetchNotebooks();
  },
  _onChange() {
    this.setState({ notebooks: NotebookStore.all() });
  },
  render() {
    return <div className={"notebooks-index " + this.props.hidden}>
      <div>
        <h1>NOTEBOOKS</h1>
        <button className="create" onClick={this.newNotebook}/>
        <ul>
          {
            this.state.notebooks.map(notebook => {
              let noteCount = notebook.noteCount;
              noteCount += noteCount === 1 ? " note" : " notes";
              return <li key={notebook.id}>
                <button></button>
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
