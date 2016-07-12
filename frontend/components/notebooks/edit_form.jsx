const React = require('react');

const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');

const EditForm = React.createClass({
  getInitialState: function() {
    const notebook = NotebookStore.find(this.props.params.notebookId);
    return {
      isHidden: "hiddenNb",
      disabled: true,
      notebook: notebook,
      title: notebook.title,
      creator: notebook.creator
    };
  },
  componentDidMount() {
    this.storeListener = NotebookStore.addListener(this._onChange);
    NotebookActions.getNotebook(this.props.params.notebookId);
    setTimeout(() => {
      this.setState({ isHidden: "revealed" });
    }, 0);
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    const notebook = NotebookStore.find(this.props.params.notebookId);
    this.setState({
      notebook: notebook,
      title: notebook.title,
      creator: notebook.creator
    });
  },
  closeForm(event) {
    event.preventDefault();
    this.setState({ isHidden: "hiddenNb" });
    setTimeout(() => {
      window.history.back();
    }, 100);
  },
  saveChanges(event) {
    NotebookActions.editNotebook({
      id: this.state.notebook.id,
      title: this.state.title
    });
    this.closeForm(event);
  },
  handleChange(event) {
    const newTitle = event.currentTarget.value;
    if (newTitle !== this.state.notebook.title) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
    this.setState({ title: newTitle });
  },
  render() {
    return <form onSubmit={this.saveChanges}
                className={ "notebook-edit " + this.state.isHidden }>
      <div className="content">
        <div className="symbol"/>
        <h2>NOTEBOOK INFO</h2>

        <div className="title">
          <label>TITLE</label>
          <input onChange={this.handleChange}
                 value={this.state.title}/>
        </div>

        <div className="creator">
          <span>CREATOR:</span>
          <span>{this.state.creator}</span>
        </div>

        <div className="delete">
          <a onClick={this.handleDelete}>Delete notebook</a>
        </div>

        <div className="button-container">
          <button type="button" onClick={this.closeForm}>Cancel</button>
          <button type="submit"
                  disabled={this.state.disabled}
                  className="update"
                  onClick={this.saveChanges}>Save changes</button>
        </div>
      </div>
    </form>;
  }
});

module.exports = EditForm;
