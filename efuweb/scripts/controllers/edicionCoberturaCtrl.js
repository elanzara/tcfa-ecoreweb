angular.module('mainapp').factory('EdicionCoberturaService', EdicionCoberturaService);

function EdicionCoberturaCtrl($scope, $window, $cookies, $location, $stateParams, $state, EdicionCoberturaService, $filter) {

    if (angular.isUndefined($cookies.getObject('name')) ||
        angular.isUndefined($cookies.getObject('uid')) ||
        angular.isUndefined($cookies.getObject('token'))
    ) {
        $scope.$emit('logout');
    }
    $scope.resultType = $stateParams.param;
    $scope.familiaSelected = "";
    $scope.companiaSelected = "";
    $scope.familiaList = "";
    $scope.companiaList = "";
    $scope.detalle = {
        id: 0,
        descripcion: ''
    };
    $scope.detalleCollection = [];
    $scope.procesar = true;

    EdicionCoberturaService.getCompania().then(function(response) {
        if (response.status == 200) {
            $scope.companiaList = response.data;
        } else {
            $scope.companiaList = "";
        }
    });

    $scope.btnDelete = function(idx) {
        selectedIdx = idx;
        $('#deleteModal').modal('show');
    }

    $scope.btnConfirmDelete = function() {
        $scope.detalleCollection.splice(selectedIdx, 1);
        $('#deleteModal').modal('hide');
    };

    $scope.btnBuscar = function() {
        EdicionCoberturaService.getCobertura($scope.companiaSelected.id, $scope.CoberturaId).then(function(response) {
            if (response.status == 200) {
                var array = response.data[0].detalle.split(';');
                $scope.detalleCollection = array;
                $scope.procesar = false;
            } else {
                $scope.detalleCollection = "";
            }
        });
    };

    $scope.btnEditar = function(idx) {
        selectedEditIdx = idx;
        $scope.txtDetalleEdit = $scope.detalleCollection[selectedEditIdx];
        $('#editModal').modal('show');
    };

    $scope.btnConfirmEdit = function() {
        $scope.detalleCollection[selectedEditIdx] = $scope.txtDetalleEdit;
        $('#editModal').modal('hide');
    };

    function concatenarAlcance() {
        var resp = '';
        var alcance = '';
        if ($scope.detalleCollection.length > 0) {
            angular.forEach($scope.detalleCollection, function(value) {
                if (alcance == '') {
                    alcance = value;
                } else {
                    alcance = alcance + ';' + value;
                }
            });
            resp = alcance;
        } else {
            resp = 'ERR2';
        }
        return resp;
    }

    $scope.submit = function() {
        var alc = '';
        alc = concatenarAlcance();

        if (alc.length > 2000) {
            swal({
                title: "Error Concatenar",
                text: 'La cantidad de caracteres del Alcance es superior a 2000 caracteres (' + alc.length + ')',
                icon: "error",
                // buttons: true,
                dangerMode: true,
            });

        } else if (alc == 'ERR1') {
            swal({
                title: "Error Concatenar",
                text: 'Falta cargar Alcance',
                icon: "error",
                // buttons: true,
                dangerMode: true,
            });
        } else {
            EdicionCoberturaService.getUpdateCobertura($scope.companiaSelected.id, $scope.CoberturaId, alc).then(function(response) {
                if (response.status == 200) {
                    swal({
                        title: "Cobertura",
                        text: 'Modificación realizada correctamente.',
                        icon: "success",
                        // buttons: true,
                        dangerMode: true,
                    });
                    $scope.companiaSelected.id = 0;
                    $scope.CoberturaId = '';
                    alc = '';
                    $scope.detalleCollection = [];
                } else {
                    $scope.detalleCollection = "";
                }
            });
        }



    };


}

angular.module('mainapp').controller('edicionCoberturaCtrl', EdicionCoberturaCtrl);