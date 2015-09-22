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
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos.push({
    id: id,
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

Actions.toggleComplete.listen(function(index){
    update(index, {complete: !(_todos[index].complete)});
    events.storeChanged();
});

Actions.toggleCompleteAll.listen(function(){
    updateAll({complete: true});
    events.storeChanged();
});

Actions.reorderTodos.listen(function(from, to){
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
