var React = require('react');
var ReactDOM = require('react-dom');
var Register = require('./register');


var App = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Welcome! Please Sign Up</h2>
        <Register />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
