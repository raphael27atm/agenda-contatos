(function(){
  'use strict';

  angular
    .module('app')
    .factory('Agenda', Agenda);

  Agenda.$inject = ['$resource','SERVER_API'];

  function Agenda($resource, SERVER_API) {
    return $resource(
      SERVER_API, {
        id: '@id'
      },
      {
        update: {
          method: 'PUT',
          url: SERVER_API
        }
      }
    );
  }

})();
