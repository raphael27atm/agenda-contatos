var agenda = angular.module('App', ['ngRoute', 'ngResource']);

agenda
    .config(
        [
            '$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'assets/js/agenda/templates/index.html'
                    })
                    .when('/contato/new', {
                        templateUrl: 'assets/js/agenda/templates/novo.html'
                    })
                    .when('/contato/edit/:id', {
                        templateUrl: 'assets/js/agenda/templates/editar.html'
                    })
                ;
            }
        ]
    );