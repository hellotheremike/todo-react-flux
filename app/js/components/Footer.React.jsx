var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/AppActions');


var Footer = React.createClass({

  propTypes: {
   todos: ReactPropTypes.array.isRequired
  },

  render: function(){
    var allTodos = this.props.todos;
    var total = allTodos.length;
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
      <footer className="todo-footer">
        <div className="remaning-cell">
          {itemsLeft} items left
        </div>
        <div className="complete-all-cell">
          <a href="#" onClick={this._markTasksAsComplete}>Mark all as complete</a>
        </div>
      </footer>
    );
  },

  _markTasksAsComplete: function(e){
    Actions.toggleCompleteAll();
    e.preventDefault();
  }

});


module.exports = Footer;
