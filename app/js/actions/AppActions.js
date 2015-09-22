var BuildActions = require('../lib/Flux').buildActions;

/************************************************
  Register FLUX actions
************************************************/

module.exports = BuildActions({
    loadTodos: [/* load new todos */ Array],
    create: [/* todo text */ String ],
    toggleComplete: [/* todo index */ Number, /* todo object */ Object],
    toggleCompleteAll: [],
    reorderTodos: [/* from */ Number, /* to */ Number]
}, 'todo.');
