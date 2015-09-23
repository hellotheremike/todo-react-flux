var BuildActions = require('../lib/Flux').buildActions;

/************************************************
  Register FLUX actions
************************************************/

module.exports = BuildActions({
    loadTodos: [/* load new todos */ Array],
    create: [/* new todo object */ Object ],
    update: [/* todo object */ Object ],
    updateLocally: [/* local todo */ Object, /* server response todo */ Object ],
    updateAll: [],
    reorder: [/* from */ Number, /* to */ Number]
}, 'todo.');
