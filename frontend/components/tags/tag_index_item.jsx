const React = require('react');

const TagIndexItem = React.createClass({

  render() {
    return <div>
      <div>
        <span>{this.props.tag.name}</span>
        <span>{this.props.tag.notes.length}</span>
      </div>
      <div>
        <button/>
      </div>
    </div>;
  }
});

module.exports = TagIndexItem;
