var RESTController = require('../controllers/AppRestController');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/AppConstants');
var Actions = require('../actions/AppActions');

var APIAdapter = function (Store) {

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
        RESTController.completeTodo({from: action.from, to: action.to}).then(function(data){
          console.log(data);
        });
        break;

      default:
        // no op
    }
  });

};

module.exports = APIAdapter;
