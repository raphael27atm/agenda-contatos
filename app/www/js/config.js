(function() {
  'use strict';

  angular
    .module('app')
    .constant('SERVER_API','http://localhost:8888/github/agenda/index.php/contatos')
    .config(config);

    function config($stateProvider, $urlRouterProvider){
      $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html',
        controller: 'ListController'
      });

      $stateProvider.state('add', {
        url: '/add',
        templateUrl: 'templates/form.html',
        controller: 'AddController'
      });

      $stateProvider.state('edit', {
        url: '/edit/:id',
        templateUrl: 'templates/form.html',
        controller: 'EditController'
      });

      $urlRouterProvider.otherwise('/list');
    }
})();
