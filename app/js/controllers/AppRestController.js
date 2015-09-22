var when = require('when');
var $ = require('jquery');

var RequestTemplate = function(data, url, action) {
  var base_url = "http://localhost/api" + url;
  var deferred = when.defer();

  // $.ajax({
  //     url: base_url,
  //     type: action,
  //     data: {
  //         json_data: JSON.stringify(data)
  //     },
  //     success: function (result) {
  //         deferred.resolve(result);
  //     },
  //     error: function (error) {
  //         deferred.reject({error: error.responseText});
  //     }
  // });
  var data = {result:data, url: url};

  setTimeout(function(){
      deferred.resolve(data);
  }, 10);

  return deferred.promise;
}

var RestController = {

  createTodo: function (data) {
      return RequestTemplate(data, '/todos/new', 'PUT');
  },

  completeAllTodos: function (data) {
    return RequestTemplate(data, '/todos/complete-all', 'PUT');
  },

  undoCompleteTodo: function (data) {
    return RequestTemplate(data, '/todos/undo/' + data.id, 'PUT');
  },

  completeTodo: function (data) {
    return RequestTemplate(data, '/todos/complete/' + data.id, 'PUT');
  },

  reorderTodo: function (data) {
    return RequestTemplate(data, '/todos/reorder', 'PUT');
  },

  loadTodos: function (data) {
    return RequestTemplate(data, '/todos', 'GET');
  }

};


module.exports = RestController;
