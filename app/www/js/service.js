(function(){
  'use strict';

  angular
    .module('app')
    .factory('Agenda', Agenda);

  Agenda.$inject = ['$http','SERVER_API'];
  function Agenda($http, SERVER_API) {
    return {
      getAll: function() {
        return $http.get(SERVER_API).then(function(response) {
          return response.data;
        });
      },

      get: function(id) {
        return $http.get(SERVER_API +'/'+ id).then(function(response) {
          return response.data;
        });
      },

      move: function(contact, fromIndex, toIndex) {
        // TO DO
      },

      create: function(contact) {
        return $http.post(SERVER_API, contact);
      },

      update: function(contact) {
        return $http.put(SERVER_API +'/'+ contact.id, contact);
      },

      destroy: function(id) {
        return $http.delete(SERVER_API +'/'+ id);
      }
    };
  }

})();
