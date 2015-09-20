var React = require('react');
var Actions = require('../../actions/AppActions');
var ReactPropTypes = React.PropTypes;


var Checkbox = React.createClass({

  propTypes: {
    todo: ReactPropTypes.object.isRequired,
    position: ReactPropTypes.object.isRequired
  },

  handleChange: function(event) {
    Actions.toggleComplete(this.props.position, this.props.todo);
  },

  render: function() {
    var todo = this.props.todo;
    return <input type="checkbox" checked={todo.complete} onChange={this.handleChange} />;
  }

});


module.exports = Checkbox;
