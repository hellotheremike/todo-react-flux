var Assign = require('object-assign');
var BuildEvents = require('../lib/Flux').buildEvents;
var Actions = require('../actions/AppActions');

var events = BuildEvents({
    storeChanged: [{}]
}, 'billing.');

/************************************************
  Store variables
************************************************/

var _todosLoaded = false;
var _todos = [];

/************************************************
  Helper functions for updating store
************************************************/

function create(text) {
  _todos.push({
    complete: false,
    text: text
  });
}

function update(id, updates) {
  _todos[id] = Assign({}, _todos[id], updates);
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
    _todos = todos;
    _todosLoaded = true;
    events.storeChanged();
});

Actions.create.listen(function(_text){
  var text = _text.trim();
  if (text !== '') {
    create(text);
    events.storeChanged();
  }
});

Actions.update.listen(function(object){
    object.complete = !object.complete;
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

/************************************************
  Store functions
************************************************/

module.exports = {
  todosLoaded: function() {
      return _todosLoaded;
  },

  getAll: function() {
    return _todos;
  }
}
