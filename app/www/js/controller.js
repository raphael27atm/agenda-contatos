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

  AddController.$inject = ['$scope', '$location','$stateParams', 'Agenda','AgendaCreate'];
  function AddController($scope, $location, $stateParams,Agenda,AgendaCreate){
    $scope.contact = {};

    if ($stateParams.id) {
      Agenda.get({ id: $stateParams.id}, function(data) {
        console.log(data);
        $scope.contact = data;
      }, function(erro) {
        console.log(erro);
      });
    }

    $scope.save = function(contact) {
      AgendaCreate.create($scope.contact).then(function(data) {
        $location.path('/list');
        console.log(data.message);
        if (data.include) $scope.contact = {};
      }).catch(function(err) {
        console.log(err.message);
      });
    }

  }

})();
