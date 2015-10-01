agenda
    .controller('AgendaCtrl',
        ['$scope', 'AgendaSrv', '$location', '$routeParams',
            function($scope, AgendaSrv, $location, $routeParams) {

                $scope.load = function() {
                    $scope.contatos = AgendaSrv.query();
                }

                $scope.clear = function() {
                    $scope.contato = "";
                }

                $scope.get = function() {
                    $scope.contato = AgendaSrv.get({id: $routeParams.id})
                }

                $scope.add = function(contato) {
                    $scope.success = false;
                    $scope.error = false;

                    $scope.result = AgendaSrv.save(
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

                    $scope.result = AgendaSrv.update(
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
                        AgendaSrv.remove(
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
        ]
    );