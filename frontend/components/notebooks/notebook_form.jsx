const React = require('react');

const NotebookForm = React.createClass({

  render() {
    return <form className={"notebook-form " + this.props.hidden}>
      <div className="modal-bg">
        <div className="notebook"/>
        <h1>Make a new Notebook</h1>

        <input type="text"/>
        <button>Cancel</button>
        <button>Create notebook</button>
      </div>
    </form>;
  }
});

module.exports = NotebookForm;
