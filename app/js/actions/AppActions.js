var BuildActions = require('../lib/Flux').buildActions;

/************************************************
  Register FLUX actions
************************************************/

module.exports = BuildActions({
    loadTodos: [/* load new todos */ Array],
    create: [/* todo text */ String ],
    update: [/* todo text */ Object ],
    updateAll: [],
    reorder: [/* from */ Number, /* to */ Number]
}, 'todo.');
