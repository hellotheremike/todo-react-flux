var React = require('react');
var ReactPropTypes = React.PropTypes;
var Row = require('./row.jsx');
var Actions = require('../../actions/AppActions');

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var List = React.createClass({

  propTypes: {
    todos: ReactPropTypes.object.isRequired,
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
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {

    this.dragged.style.display = "block";
    // this.dragged.parentNode.removeChild(placeholder);

    // Update store
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;

    Actions.reorderTodos(from, to);
  },
  dragOver: function(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target.parentElement.parentElement;
    // e.target.parentNode.insertBefore(placeholder, e.target);

    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    if(relY > height) {
      this.nodePlacement = "after";
      // parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before"
      // parent.insertBefore(placeholder, e.target);
    }
  }

});


module.exports = List;
