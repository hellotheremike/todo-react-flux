var when = require('when');

var RequestTemplate = function(data, url) {
  var base_url = "http://localhost/api" + url;
  var deferred = when.defer();
  // $.ajax({
  //     url: base_url + '/todos/new',
  //     type: 'PUT',
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
  }, 1000);

  return deferred.promise;
}

var RestController = {

  createTodo: function (data) {
      return RequestTemplate(data, '/todos/new');
  },

  completeAllTodos: function (data) {
    return RequestTemplate(data, '/todos/complete-all');
  },

  undoCompleteTodo: function (data) {
    return RequestTemplate(data, '/todos/undo/' + data.id);
  },

  completeTodo: function (data) {
    return RequestTemplate(data, '/todos/complete/' + data.id);
  },

  reorderTodo: function (data) {
    return RequestTemplate(data, '/todos/complete/' + data.id);
  },

  loadTodos: function (data) {
    return RequestTemplate(data, '/todos');
  }

};


module.exports = RestController;
