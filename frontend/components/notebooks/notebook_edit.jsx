const React = require('react');

const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');
const hashHistory = require('react-router').hashHistory;

const NotebookEdit = React.createClass({
  getInitialState: function() {
    return {
      form: <div className="icon"/>,
      disabled: true,
      title: ""
    };
  },
  closeForm(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      title: this.props.notebook.title,
      disabled: true,
      form: <div className="icon"/>
  });
  },
  componentWillReceiveProps(newProps) {
    if (newProps.notebook) {
      this.setState({title: newProps.notebook.title});
    }
  },
  handleChange(event) {
    const newTitle = event.currentTarget.value;
    if (newTitle !== this.props.notebook.title) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
    this.setState({ title: newTitle }, this.openForm);

  },
  saveChanges(e) {
    this.closeForm(e);
    NotebookActions.editNotebook({
      title: this.state.title,
      id: this.props.notebook.id
    });

  },
  handleDelete() {
    NotebookActions.destroyNotebook(this.props.notebook.id);
    hashHistory.push('/home');
  },
  openForm() {
    this.setState({
      form: <form onSubmit={this.saveChanges} className="notebook-edit" >
        <div className="content">
          <div className="symbol"/>
          <h2>NOTEBOOK INFO</h2>

          <div className="title">
            <label>TITLE</label>
            <input onChange={this.handleChange} value={this.state.title}/>
          </div>

          <div className="creator">
            <span>CREATOR:</span>
            <span>{this.props.notebook.creator}</span>
          </div>

          <div className="delete">
            <a onClick={this.handleDelete}>Delete notebook</a>
          </div>

          <div className="button-container">
            <button onClick={this.closeForm}>Cancel</button>
            <button type="submit"
                    disabled={this.state.disabled}
                    className="update"
                    onClick={this.saveChanges}>Save changes</button>
          </div>
        </div>
      </form>
    });
  },
  render() {
    return <div className={"edit " + this.state.hidden}
                onClick={this.openForm}>
      {this.state.form}
    </div>;

  }
});

module.exports = NotebookEdit;
