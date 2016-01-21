(function() {
  'use strict';

  angular
    .module('app')
    .controller('AgendaController', AgendaController);

  AgendaController.$inject = ['$scope', '$location', '$routeParams', 'Agenda'];

  function AgendaController($scope, $location, $routeParams, Agenda){
    $scope.load = function() {
      $scope.contatos = Agenda.query();
    }

    $scope.clear = function() {
      $scope.contato = "";
    }

    $scope.get = function() {
      $scope.contato = Agenda.get({id: $routeParams.id})
    }

    $scope.add = function(contato) {
      $scope.success = false;
      $scope.error = false;

      $scope.result = Agenda.save(
        {},
        $jQuery.param(contato),
        function(data, status, headers, config) {
          $scope.success = true;
          $scope.success_text = "Contato cadastrado com sucesso.";

          $location.path('/');
        },
        function(data, status, headers, config) {
          $scope.error = true;
          $scope.error_text = 'Ocorreu um erro: '+data.messages[0];
        }
      );
    }

    $scope.editar = function(contato) {
      $scope.success = false;
      $scope.error = false;

      var params = $jQuery.param(JSON.parse(angular.toJson(contato)));

      $scope.result = Agenda.update(
        {id: $routeParams.id},
        params,
        function(data, status, headers, config) {
          $scope.success = true;
          $scope.success_text = "Contato editado com sucesso.";

          $location.path('/');
        },
        function(data, status, headers, config) {
          $scope.error = true;
          $scope.error_text = 'Ocorreu um erro: '+data.messages[0];
        }
      );
    }

    $scope.delete = function(id) {
      if(confirm('Deseja realmente excluir esse contato?')) {
        Agenda.remove(
          {id: id},
          {},
          function(data, status, headers, config) {
            $scope.load();
          },
          function(data, status, headers, config) {
            alert('Ocorreu um erro: '+data.messages[0]);
          }
        )
      }
    }
  }

})();
