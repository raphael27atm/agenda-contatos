(function() {
  'use strict';

  angular
    .module('app')
    .constant('SERVER_API','http://localhost:8888/github/agenda/index.php/contatos/:id')
    .config(config);

    function config($routeProvider){
      $routeProvider
          .when('/', {
            templateUrl: 'assets/js/agenda/templates/index.html'
          })
          .when('/contato/new', {
            templateUrl: 'assets/js/agenda/templates/adicionar.html'
          })
          .when('/contato/edit/:id', {
            templateUrl: 'assets/js/agenda/templates/editar.html'
          });
    }
})();
