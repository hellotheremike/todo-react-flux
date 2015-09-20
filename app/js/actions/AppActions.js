var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/AppConstants');

var TodoActions = {
  loadTodos: function(todos) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_LOAD,
      todos: todos
    });
  },

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  toggleComplete: function(id, todo) {
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_COMPLETE_ALL
    });
  },

  reorderTodos: function(from, to){
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_REORDER,
      from: from,
      to: to
    });
  }

};

module.exports = TodoActions;
