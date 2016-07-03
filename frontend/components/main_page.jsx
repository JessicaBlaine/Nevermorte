const React = require('react');

const NotebooksIndex = require('./notebooks/notebooks_index');

const MainPage = React.createClass({
  getInitialState: function() {
    return {
      notebooks: "hidden",
      notebookButton: "notebook"
    };
  },
  toggleNotebooks() {
    let isHidden = this.state.notebooks === "hidden";
    this.setState({
      notebooks: isHidden ? "revealed" : "hidden",
      notebookButton: isHidden ? "notebook selected" : "notebook"
    });
  },
  newNote() {

  },
  render() {
    return <div className="main-page">
      <NotebooksIndex hidden={this.state.notebooks}
                      unhide={this.toggleNotebooks}/>
      <div className="sidebar">

        <div className={this.state.notebookButton}
             onClick={this.toggleNotebooks}>
          <button className="notebook" />
        </div>

        <div className="new-note" onClick={this.newNote}>
          <button className="new-note" />
        </div>
      </div>
      {this.props.children}
    </div>;
  }
});

module.exports = MainPage;
