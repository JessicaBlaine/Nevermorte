const React = require('react');
const hashHistory = require('react-router').hashHistory;

const TagActions = require('../../actions/tag_actions');
const TagStore = require('../../stores/tag_store');

const TagsSearch = React.createClass({
  getInitialState: function() {
    return {
      tagName: ""
    };
  },
  handleChange(event) {
    this.setState({ tagName: event.target.value }, () => {
      TagActions.fetchTags(this.state.tagName);
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    hashHistory.push(`/tags/${ TagStore.all()[0].name }`);

    this.props.closeTags();
  },
  render() {
    return <form onSubmit={this.handleSubmit} className="tags-search">
      <input value={ this.state.tagName }
             placeholder="🔍 Find a tag"
             onChange={ this.handleChange }/>
      <button type="hidden"/>
    </form>;
  }
});

module.exports = TagsSearch;
