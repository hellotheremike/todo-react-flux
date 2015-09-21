var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var RESTController = require('../controllers/AppRestController');

var CHANGE_EVENT = 'change';

var _todos = [];
var _todosLoaded = false;

function create(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos.push({
    id: id,
    complete: false,
    text: text
  });
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function reorder(from, to) {
  _todos.splice(to, 0, _todos.splice(from, 1)[0]);
}

if (Object.keys(_todos).length < 1) {
  RESTController.loadTodos().then(function(todos){
    _todos = [
      {id: "iesvomxr1", text: "Fix computer",  complete: false},
      {id: "iesvomxr2", text: "Check emails",  complete: false},
      {id: "iesvomxr3", text: "Call john",  complete: false},
      {id: "iesvomxr4", text: "Clean house",  complete: false},
      {id: "iesvomxr5", text: "Water plants",  complete: false},
      {id: "iesvomxr6", text: "Read books",  complete: false},
      {id: "iesvomxr7", text: "Go to the gym",  complete: false}
    ];
    _todosLoaded = true;
    TodoStore.emitChange();
  });
}


var TodoStore = assign({}, EventEmitter.prototype, {

  todosLoaded: function() {
      return _todosLoaded;
  },

  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_COMPLETE_ALL:
      updateAll({complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_REORDER:
      reorder(action.from, action.to);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_LOAD:
      _todos = todos;
      TodoStore.emitChange();
      break;


    default:
      // no op
  }

});


module.exports = TodoStore;
