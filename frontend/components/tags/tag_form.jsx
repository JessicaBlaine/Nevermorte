const React = require('react');

const TagActions = require('../../actions/tag_actions');

const TagForm = React.createClass({
  getInitialState: function() {
    return {
      name: ""
    };
  },
  componentWillReceiveProps() {
    this.setState({ name: "" });
  },
  handleSubmit(event) {
    event.preventDefault();
    TagActions.createTag(this.props.noteId, this.state);
  },
  handleChange(event) {
    this.setState({ name: event.target.value });
  },
  render() {
    return <div className="tag-form">
      <input placeholder="+"
             onChange={ this.handleChange }
             value={ this.state.name }></input>
      <button type="submit" onClick={ this.handleSubmit }/>
    </div>;
  }
});

module.exports = TagForm;
