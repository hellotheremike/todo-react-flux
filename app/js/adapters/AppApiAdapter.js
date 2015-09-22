var RESTController = require('../controllers/AppRestController');
var Actions = require('../actions/AppActions');

var APIAdapter = function (Store) {

  /************************************************
    Initial load of Todos
  ************************************************/

  RESTController.getAll().then(function(todos){
    Actions.loadTodos(todos.tasks);
  });


  /************************************************
    Eventliseners for API-updates
  ************************************************/

  Actions.create.listen(function(text){
    RESTController.create({text: text}).then(function(data){
      console.log(data);
    })
  });

  Actions.update.listen(function(todo){
    RESTController.update(todo).then(function(data){
      console.log(data);
    });
  });

  Actions.updateAll.listen(function(){
    RESTController.updateAll().then(function(data){
      console.log(data);
    })
  });

  Actions.reorder.listen(function(from, to){
    RESTController.reorder({from: from, to: to}).then(function(data){
      console.log(data);
    });
  });

};

module.exports = APIAdapter;
