var Assign = require('object-assign');
var Actions = require('../actions/AppActions');

var BuildEvents = require('../lib/Flux').buildEvents;

var events = BuildEvents({
    storeChanged: [{}]
}, 'billing.');

/************************************************
  Store variables
************************************************/

var _error = false;
var _todosLoaded = false;
var _todos = [];

/************************************************
  Helper functions for updating store
************************************************/

function update(id, updates) {
  _todos[id] = Assign({}, _todos[id], updates);
}

function updateLocally(old, response) {
  var index = _todos.indexOf(old);
  if (~index) {
      _todos[index] = response;
  }
}


function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function reorder(from, to) {
  _todos.splice(to, 0, _todos.splice(from, 1)[0]);
}


/************************************************
  Eventliseners for Store changes
************************************************/

Actions.loadTodos.listen(function(todos){
    if(todos && todos.length) {
      _todos = todos;
    }
    _todosLoaded = true;
    events.storeChanged();
});

Actions.create.listen(function(todo){
  var text = todo.text.trim();
  if (text !== '' && !_error) {
    _todos.push(todo);
    events.storeChanged();
  }
});

Actions.update.listen(function(object){
    object.complete = !object.complete;
    events.storeChanged();
});

Actions.updateLocally.listen(function(old, response){
  updateLocally(old, response);
  events.storeChanged();
});

Actions.updateAll.listen(function(){
    updateAll({complete: true});
    events.storeChanged();
});

Actions.reorder.listen(function(from, to){
    reorder(from, to);
    events.storeChanged();
});

Actions.apiError.listen(function(from, to){
    _error = true;
    events.storeChanged();
});

/************************************************
  Store functions
************************************************/

module.exports = {
  todosLoaded: function() {
      return _todosLoaded;
  },
  error: function(){
    return _error;
  },
  getAll: function() {
    return _todos;
  }
}
