(function(){
  'use strict';

  angular
    .module('app')
    .factory('Agenda', Agenda)
    .factory('AgendaCreate', AgendaCreate);

  Agenda.$inject = ['$resource','SERVER_API'];
  function Agenda($resource, SERVER_API) {

    return $resource( SERVER_API, {id: '@id'},{
      'get':  {method:'GET'},
      'query':  {method:'GET', isArray:true},
      'save':   {method:'POST'},
      'update': { method: 'PUT'},
      'delete': {method:'DELETE', headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
    });

  }

  AgendaCreate.$inject = ['Agenda','$q'];
  function AgendaCreate(Agenda, $q){

    var service = {}

    service.create = function(contact) {
      return $q(function(resolve, reject) {
        if (contact.id) {
          Agenda.update({id : contact.id} ,contact, function() {
            resolve({
              message : contact.name + ' alterada com sucesso!',
              include : false
            });
          }, function(err) {
            console.log(err);
            resolve({
              message : contact.name + ' não foi alterada' ,
            });
          });
        } else {
          Agenda.save(contact, function() {
            resolve({
              message : contact.name + ' cadastrada com sucesso!',
              include : true
            });
          }, function(err) {
            console.log(err);
            resolve({
              message : contact.name + ' não foi cadastrada' ,
            });
          });
        }
      });

    };
    return service;
  }

})();
