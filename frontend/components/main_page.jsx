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
  render() {
    return <div>
      <NotebooksIndex hidden={this.state.notebooks}/>
      <div className="sidebar">
        <div className={this.state.notebookButton}
             onClick={this.toggleNotebooks}>
          <button className={"notebook"} />
        </div>
      </div>
      {this.props.children}
    </div>;
  }
});

module.exports = MainPage;
