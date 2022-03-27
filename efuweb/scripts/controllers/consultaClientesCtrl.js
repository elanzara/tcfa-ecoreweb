angular.module('mainapp').factory('ConsultaClientesService', ConsultaClientesService);

function ConsultaClientesCtrl($scope, $window, $cookies, $location, $stateParams, $state, ConsultaClientesService, $filter) {
    $scope.cliente;
}

angular.module('mainapp').controller('consultaClientesCtrl', ConsultaClientesCtrl);