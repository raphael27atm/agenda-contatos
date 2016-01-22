(function() {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController)
    .controller('AddController', AddController);

  ListController.$inject = ['$scope', 'Agenda'];
  function ListController($scope, Agenda){
    $scope.reordering = false;

    $scope.contacts = [];

    Agenda.query(function (data) {
      $scope.contacts = data;
    }, function (err) {
      console.log(err);
    });

    $scope.remove = function(contact) {
      Agenda.remove({ id: contact.id }, function() {
        $scope.contacts.forEach(function(p, index) {
          if (p.id == contact.id) $scope.contacts.splice(index, 1);
        });
        console.log('success'+ contact.name + ' Removido');
      });
    }

  }

  AddController.$inject = ['$scope', '$location','$stateParams', 'Agenda'];
  function AddController($scope, $location, $stateParams,Agenda){
    $scope.contact = new Agenda();
    $scope.contacts = [];

    if ($stateParams.id) {
      Agenda.get({ id: $stateParams.id}, function(data) {
        console.log(data);
        $scope.contact = data;
      }, function(erro) {
        console.log(erro);
      });
    }

    $scope.save = function(contact) {
      if ($scope.contact.id) {
        Agenda.update({id: $scope.contact.id}, contact);
        $location.path('/list');
        console.log('Contato Atualizado com sucesso');
      } else {
        $scope.contact.$save().then(function(response) {
          $scope.contacts.push(response);
          $location.path('/list');
          console.log(response);
        });
      }
    }

  }

})();
