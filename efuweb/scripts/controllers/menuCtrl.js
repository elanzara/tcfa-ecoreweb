angular.module('mainapp').factory('UserService', UserService);

function MenuCtrl($scope, $window, $cookies, $location, $rootScope, $state, UserService) {

    UserService.getMenu()
        .then(function(response) {
            if (response.status == 200) {
                $scope.menuitems = response.data.modulos;
            }
        })
        .catch(function(error) {
            if (response.status == 400) { $scope.$emit('error404'); } else {
                swal({
                    title: "ERROR",
                    text: error.data,
                    icon: "error",
                    // buttons: true,
                    dangerMode: true,
                });
            }
        });

    $scope.btnMenuAction = function(pprogram, pparam, id) {

        UserService.setProgramasRecientes(id);
        if (pprogram == 'grp001') {
            $state.go('app.configuration.groups', { param: pparam });
        } else if (pprogram == 'prf001') {
            $state.go('app.configuration.profiles', { param: pparam });
        } else if (pprogram == 'mdl001') {
            $state.go('app.configuration.modules', { param: pparam });
        } else if (pprogram == 'pgr001') {
            $state.go('app.configuration.programs', { param: pparam });
        } else if (pprogram == 'usr001') {
            $state.go('app.configuration.users', { param: pparam });
        } else if (pprogram == 'sga001') {
            $state.go('app.insurance.allianzPortfolio', { param: pparam });
        } else if (pprogram == 'sga002') {
            $state.go('app.insurance.allianzCommission', { param: pparam });
        } else if (pprogram == 'sga003') {
            $state.go('app.insurance.triumphNews', { param: pparam });
        } else if (pprogram == 'sga004') {
            $state.go('app.insurance.cajaCartera', { param: pparam });
        } else if (pprogram == 'sga005') {
            $state.go('app.insurance.mapfreNews', { param: pparam });
        } else if (pprogram == 'sga006') {
            $state.go('app.insurance.sanCristobalMov', { param: pparam });
        } else if (pprogram == 'sga007') {
            $state.go('app.insurance.cajaNews', { param: pparam });
        } else if (pprogram == 'sga008') {
            $state.go('app.insurance.sancor', { param: pparam });
        } else if (pprogram == 'abm001') {
            $state.go('app.abm.changeState', { param: pparam });
        } else if (pprogram == 'sga009') {
            $state.go('app.insurance.sanCristobalCob', { param: pparam });
        } else if (pprogram == 'gxp001') {
            $state.go('app.configuration.grupoperfil', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'abm002') {
            $state.go('app.abm.altaCobertura', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'abm003') {
            $state.go('app.abm.edicionCobertura', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'abm004') {
            $state.go('app.abm.reporteCobertura', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'cli001') {
            $state.go('app.clients.consultaClientes', { param: pparam, prespective: 'both' });
        }

    };

}

angular.module('mainapp').controller('menuCtrl', MenuCtrl);