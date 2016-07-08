const React = require('react');
const ReactDOM = require('react-dom');

const NotebookStore = require('../../stores/notebook_store');

const NotebookDropdown = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.all(),
      selectedNb: NotebookStore.find(this.props.selectedId),
      isHidden: "hidden"
    };
  },
  handleSelection(notebook) {

  },
  openDropdown() {
    this.setState({ isHidden: "revealed" }, () => {
      ReactDOM.findDOMNode(this.refs.searchBar).focus();
    });

  },
  closeDropdown() {
    this.setState({ isHidden: "hidden" });
  },
  render() {
    return <div className="notebook input" onClick={ this.openDropdown }>
      <div className="current-notebook">
        <div className="icon"/>
        <span>{ this.state.selectedNb.title }</span>
      </div>
      <div className={ "dropdown-" + this.state.isHidden }>
        <div className="search"><input onBlur={ this.closeDropdown }
                    ref="searchBar"
                    placeholder="🔍 Find a notebook"/></div>
        <ul>
          <li className="new-notebook">
            <div/><span>Create new notebook</span>
          </li>
          {
            this.state.notebooks.map(notebook => {
              let title = notebook.title;
              title = title.length > 40 ? title.slice(0, 40) + "..." : title;
              let selected = "";
              if (notebook.id === this.state.selectedNb.id) {
                selected = "selected";
              }
              return <li onClick={ this.handleSelection.bind(null, notebook) }
                         key={ notebook.id }
                         className={ selected }>
                <span>{ title }</span><div/>
              </li>;
            })
          }
        </ul>
      </div>
    </div>;
  }
});

module.exports = NotebookDropdown;
