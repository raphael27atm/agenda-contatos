(function() {
  'use strict';

  angular
    .module('app')
    .controller('ListController', ListController)
    .controller('AddController', ListController)
    .controller('EditController', ListController);

  ListController.$inject = ['$scope', 'Agenda'];
  function ListController($scope, Agenda){
    $scope.reordering = false;

    function refreshContacts() {
      Agenda.getAll().then(function(contacts) {
        $scope.contacts = contacts;
      });
    }

    refreshContacts();

    $scope.remove = function(id) {
      Agenda.destroy(id).then(refreshContacts);
    };

    /*$scope.move = function(note, fromIndex, toIndex) {
      NoteStore.move(note, fromIndex, toIndex);
    };

    $scope.toggleReordering = function() {
      $scope.reordering = !$scope.reordering;
    };*/
  }

  AddController.$inject = ['$scope', '$state', 'Agenda'];
  function AddController($scope, $state, Agenda){
    $scope.contact = {
      name: '',
      email: '',
      cellphone: ''
    };

    $scope.save = function() {
      Agenda.create($scope.contact).then(function() {
        $state.go('/list');
      });
    };
  }


  EditController.$inject = ['$scope', '$state', 'Agenda'];
  function EditController($scope, $state, Agenda){
    Agenda.get($state.params.id).then(function(contact) {
      $scope.contact = contact;
    });

    $scope.save = function() {
      Agenda.update($scope.contact).then(function() {
        $state.go('list');
      });
    };
  }

})();
