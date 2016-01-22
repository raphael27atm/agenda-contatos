(function(){
  'use strict';

  angular
    .module('app')
    .factory('Agenda', Agenda);

  Agenda.$inject = ['$resource','SERVER_API'];
  function Agenda($resource, SERVER_API) {
    var Agenda = $resource( SERVER_API, {id: '@id'},{
      'headers':{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
      },
      'get':  {method:'GET'},
      'query':  {method:'GET', isArray:true},
      'save':   {method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      'update': { method: 'PUT', headers:{ 'Content-Type': 'application/x-www-form-urlencoded'}},
      'delete': {method:'DELETE', headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
    });

    return Agenda;
  }

})();
