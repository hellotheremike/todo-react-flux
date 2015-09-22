var React = require('react');
var Row = require('./Item.React.jsx');
var Actions = require('../actions/AppActions');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var List = React.createClass({

  propTypes: {
    todos: ReactPropTypes.array.isRequired,
  },

  render: function(){
    if (Object.keys(this.props.todos).length < 1) {
      return null;
    }

    var allTodos = this.props.todos;
    var todos = [];
    var position = 0;

    for (var key in allTodos) {
      todos.push(
        <li data-id={key} key={key}
          draggable="true"
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}>
          <Row todo={allTodos[key]} position={position++}/>
      </li>
      );
    }

    return (
      <ul className="todos-list" onDragOver={this.dragOver}>
        {todos}
      </ul>
    );
  },

  dragStart: function(e) {
    this.dragged = $(e.currentTarget);
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {
    this.dragged.css({display:  "block"});
    $(".todos-list .placeholder").remove();

    var from = Number(this.dragged.data("id"));
    var to = Number(this.over.data("id"));
    if(from < to) to--;

    Actions.reorderTodos(from, to);
  },

  dragOver: function(e) {
    e.preventDefault();
    this.dragged.css({display:  "none"});
    var target = $(e.target);

    if(target.hasClass("placeholder")) return;
    if(target.hasClass("todo-item")){
      this.over = $(e.target.parentNode);
      $(placeholder).insertBefore( e.target);
    }
  }

});


module.exports = List;
