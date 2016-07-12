const React = require('react');
const ReactDOM = require('react-dom');
const hashHistory = require('react-router').hashHistory;

const NotebookStore = require('../../stores/notebook_store');
const NotebookActions = require('../../actions/notebook_actions');

const NotebookDropdown = React.createClass({
  getInitialState: function() {
    return {
      notebooks: NotebookStore.all(),
      selectedNb: NotebookStore.find(this.props.selectedId),
      isHidden: "hidden"
    };
  },
  componentDidMount() {
    this.storeListener = NotebookStore.addListener(this._onChange);
    NotebookActions.fetchNotebooks();
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    this.setState({
      notebooks: NotebookStore.all(),
      selectedNb: NotebookStore.find(this.props.selectedId)
    });
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ selectedNb: NotebookStore.find(nextProps.selectedId) });
  },
  handleSelection(notebook) {
    this.setState({ selectedNb: notebook });
    this.props.handleChange('notebook_id', { target: { value: notebook.id }});
  },
  openDropdown() {
    this.setState({ isHidden: "revealed" }, () => {
      ReactDOM.findDOMNode(this.refs.searchBar).focus();
    });

  },
  closeDropdown() {
    this.setState({ isHidden: "hidden" });
  },
  createNotebook() {
    hashHistory.push('/notebooks/new');
  },
  render() {
    let nbTitle = this.state.selectedNb.title;
    nbTitle = nbTitle.length > 20 ? nbTitle.slice(0, 20) + "..." : nbTitle;
    return <div className="notebook input" onClick={ this.openDropdown }>
      <div className="current-notebook">
        <div className="icon"/>
        <div className="down-arrow"/>
        <span>{ nbTitle }</span>
        <span className="hover-text">Move note</span>
      </div>
      <div className={ "dropdown-" + this.state.isHidden }>
        <div className="search"><input onBlur={ this.openDropdown }
                    ref="searchBar"
                    placeholder="🔍 Find a notebook"/></div>
        <ul>
          <li className="new-notebook" onMouseDown={ this.createNotebook }>
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
              return (
                <li onMouseDown={ this.handleSelection.bind(null, notebook) }
                    key={ notebook.id }
                    className={ selected }>
                  <span>{ title }</span><div/>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>;
  }
});

module.exports = NotebookDropdown;
