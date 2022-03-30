angular.module('mainapp').factory('ConsultaClientesService', ConsultaClientesService);

function ConsultaClientesCtrl($scope, $window, $cookies, $location, $stateParams, $state, ConsultaClientesService, $filter) {
    $scope.closeOthers = true;
    $scope.isOpen = true;
    // $scope.datos;
    $scope.datos = [
        {
            companiaSeguro: "La Caja",
            cliente: {
                nombre: "Leo"
            }
        },
        {
            companiaSeguro: "Sancor",
            cliente: {
                nombre: "Edu"
            }
        }
    ];
}

angular.module('mainapp').controller('consultaClientesCtrl', ConsultaClientesCtrl);