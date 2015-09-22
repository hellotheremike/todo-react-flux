var RESTController = require('../controllers/AppRestController');
var Actions = require('../actions/AppActions');

var APIAdapter = function (Store) {

  /************************************************
    Initial load of Todos
  ************************************************/

  RESTController.loadTodos().then(function(todos){
    var todos = [
      {id: "iesvomxr1", text: "Fix computer",  complete: false},
      {id: "iesvomxr2", text: "Check emails",  complete: false},
      {id: "iesvomxr3", text: "Call john",  complete: false},
      {id: "iesvomxr4", text: "Clean house",  complete: false},
      {id: "iesvomxr5", text: "Water plants",  complete: false},
      {id: "iesvomxr6", text: "Read books",  complete: false},
      {id: "iesvomxr7", text: "Go to the gym",  complete: false}
    ];

    Actions.loadTodos(todos);
  });


  /************************************************
    Eventliseners for API-updates
  ************************************************/

  Actions.create.listen(function(_text){
    RESTController.createTodo({text: _text}).then(function(data){
      console.log(data);
    })
  });

  Actions.toggleComplete.listen(function(index, object){
    if( object.complete ) {
      RESTController.undoCompleteTodo({id: index}).then(function(data){
        console.log(data);
      });
    } else {
      RESTController.completeTodo({id: index}).then(function(data){
        console.log(data);
      });
    }
  });

  Actions.toggleCompleteAll.listen(function(){
    RESTController.completeAllTodos().then(function(data){
      console.log(data);
    })
  });

  Actions.reorderTodos.listen(function(from, to){
    RESTController.reorderTodo({from: from, to: to}).then(function(data){
      console.log(data);
    });
  });

};

module.exports = APIAdapter;
