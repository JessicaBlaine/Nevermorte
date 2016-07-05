const React = require('react');
const hashHistory = require('react-router').hashHistory;

const NotebookActions = require('../../actions/notebook_actions');

const NotebookForm = React.createClass({
  getInitialState: function() {
    return {
      isHidden: "hidden",
      disabled: true,
      title: ""
    };
  },
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isHidden: "revealed" });
    }, 0);
  },
  closeForm(event) {
    event.preventDefault();
    this.setState({ isHidden: "hidden" });
    setTimeout(() => {
      window.history.back();
    }, 100);
  },
  handleChange(event) {
    const title = event.target.value;
    this.setState({
      title: title,
      disabled: title.length === 0
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    NotebookActions.createNotebook({ title: this.state.title });
    window.history.back();
  },
  render() {
    return <form onSubmit={this.handleSubmit}
                 className={"notebook-form " + this.state.isHidden}>
      <div className="modal-content">
        <div className="notebook"/>
        <h1>MAKE A NEW NOTEBOOK</h1>

        <input onChange={this.handleChange}
               value={this.state.title}
               placeholder="Title your notebook"/>

        <div className="button-container">
          <button onClick={this.closeForm}>Cancel</button>
          <button disabled={this.state.disabled}
                  className="create">Create notebook</button>
        </div>
      </div>
    </form>;
  }
});

module.exports = NotebookForm;
