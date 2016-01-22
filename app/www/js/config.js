(function() {
  'use strict';

  angular
    .module('app')
    .constant('SERVER_API','http://localhost/php/agenda-contatos/index.php/contatos/:id')
    .config(config);

    function config($stateProvider, $urlRouterProvider,$httpProvider){
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

      // Intercept POST requests, convert to standard form encoding
      $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
        var key, result = [];

        if (typeof data === "string")
          return data;

        for (key in data) {
          if (data.hasOwnProperty(key))
            result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return result.join("&");
      });
    }
})();
