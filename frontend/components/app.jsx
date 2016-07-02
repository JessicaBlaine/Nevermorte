const React = require('react');
const Link = require('react-router').Link;

const SessionApiUtil = require('../util/session_api_util');

const App = React.createClass({

  render() {
    return <div>
      {this.props.children}
      
    </div>;
  }
});

module.exports = App;
