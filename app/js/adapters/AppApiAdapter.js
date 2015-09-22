var RESTController = require('../controllers/AppRestController');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/AppConstants');
var Actions = require('../actions/AppActions');

var APIAdapter = function (Store) {

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

    Actions.loadTodos(_todos);
  });

  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case TodoConstants.TODO_CREATE:
        RESTController.createTodo({text: action.text}).then(function(data){
          console.log(data);
        })
        break;

      case TodoConstants.TODO_COMPLETE_ALL:
        RESTController.completeAllTodos().then(function(data){
          console.log(data);
        })
        break;

      case TodoConstants.TODO_UNDO_COMPLETE:
        RESTController.undoCompleteTodo({id: action.id}).then(function(data){
          console.log(data);
        });
        break;

      case TodoConstants.TODO_COMPLETE:
        RESTController.completeTodo({id: action.id}).then(function(data){
          console.log(data);
        });
        break;

      case TodoConstants.TODO_REORDER:
        RESTController.reorderTodo({from: action.from, to: action.to}).then(function(data){
          console.log(data);
        });
        break;

      default:
        // no op
    }
  });

};

module.exports = APIAdapter;
