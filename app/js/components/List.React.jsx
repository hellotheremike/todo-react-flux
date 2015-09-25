var React = require('react');
var ListItem = require('./ListItem.React.jsx');
var Actions = require('../actions/AppActions');
var ReorderListMixin = require('../lib/ReorderListsMixin');
var ReactPropTypes = React.PropTypes;

var List = React.createClass({

  mixins: [ReorderListMixin],

  propTypes: {
    allTodos: ReactPropTypes.array.isRequired,
  },

  render: function(){
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    return (
      <ul className="todos-list" onDragOver={this.dragOver}>
        {this._generateListItems()}
      </ul>
    );
  },

  _generateListItems: function() {
    var allTodos = this.props.allTodos;
    var listItems = [];

    for (var key in allTodos) {
      listItems.push(
        <li data-id={key} key={key}
          draggable="true"
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}>
          <ListItem todo={allTodos[key]} index={key}/>
        </li>
      );
    }
    return listItems;
  },

  _dragAndDropAction: function(from, to) {
    Actions.reorder(from, to);
  }

});


module.exports = List;
