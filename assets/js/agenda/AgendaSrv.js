agenda
    .factory('AgendaSrv', function($resource) {
       return $resource(
           'http://localhost:8080/estudos/agenda/index.php/contatos/:id', {
               id: '@id'
           },
           {
               update: {
                   method: 'PUT',
                   url: 'http://localhost:8080/estudos/agenda/index.php/contatos/:id/'
               }
           }
       );
    });