(function() {
  'use strict';

  angular
    .module('app')
    .constant('SERVER_API','http://localhost/php/agenda-contatos/index.php/contatos/:id')
    .config(config);

    function config($stateProvider, $urlRouterProvider){
      $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html',
        controller: 'ListController'
      }).state('add', {
        url: '/add',
        templateUrl: 'templates/form.html',
        controller: 'AddController'
      }).state('edit', {
        url: '/edit/:id',
        templateUrl: 'templates/form.html',
        controller: 'AddController'
      });

      $urlRouterProvider.otherwise('/list');
    }
})();
