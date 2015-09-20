var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/AppActions');


var Footer = React.createClass({

  propTypes: {
   todos: ReactPropTypes.object.isRequired
  },

  render: function(){
    var allTodos = this.props.todos;
    var total = Object.keys(allTodos).length;
    var completed = 0;

    if (total === 0) {
      return null;
    }

    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;

    return (
      <div>
        Remaning tasks {itemsLeft}
        <a href="#" onClick={this._markTasksAsComplete}>Mark as done</a>
      </div>
    );
  },

  _markTasksAsComplete: function(e){
    Actions.toggleCompleteAll();
    e.preventDefault();
  }

});


module.exports = Footer;
