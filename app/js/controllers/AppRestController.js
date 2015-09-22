var When = require('when');
var $ = require('jquery');

/************************************************
  AJAX request template
************************************************/

var RequestTemplate = function(data, url, action) {
  var base_url = "http://localhost:5000" + url;
  var deferred = When.defer();

  $.ajax({
      url: base_url,
      type: action,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
      success: function (result) {
          deferred.resolve(result);
      },
      error: function (error) {
          deferred.reject({error: error.responseText});
      }
  });

  return deferred.promise;
}

/************************************************
  Create controller for REST-endpoints
************************************************/

var TodoRestController = {

  create: function (data) {
    return RequestTemplate(data, '/todo/api/v1.0/tasks', 'POST');
  },
  
  update: function (data) {
    return RequestTemplate(data, data.uri, 'PUT');
  },

  updateAll: function (data) {
    return RequestTemplate(data, '/todo/api/v1.0/tasks', 'PUT');
  },

  getAll: function (data) {
    return RequestTemplate(data, '/todo/api/v1.0/tasks', 'GET');
  },

  reorder: function (data) {
    return RequestTemplate(data, '/todo/api/v1.0/reorder', 'PUT');
  }

};


module.exports = TodoRestController;
