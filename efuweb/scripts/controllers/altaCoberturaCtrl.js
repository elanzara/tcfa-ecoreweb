angular.module('mainapp').factory('AltaCoberturaService', AltaCoberturaService);

function AltaCoberturaCtrl($scope, $window, $cookies, $location, $stateParams, $state, AltaCoberturaService, $filter) {

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
    $scope.validado = '';
    $scope.procesar = true;

    AltaCoberturaService.getCompania().then(function(response) {
        if (response.status == 200) {
            $scope.companiaList = response.data;
        } else {
            $scope.companiaList = "";
        }
    });

    AltaCoberturaService.getFamilia().then(function(response) {
        if (response.status == 200) {
            $scope.familiaList = response.data;
        } else {
            $scope.familiaList = "";
        }
    });

    $scope.btnAgregar = function() {
        if ($scope.txtDetalle != "") {
            $scope.detalleCollection.push($scope.txtDetalle);
            $scope.txtDetalle = '';
            $scope.procesar = false;
        }
    };

    $scope.btnDelete = function(idx) {
        selectedIdx = idx;
        $('#deleteModal').modal('show');
    }

    $scope.btnConfirmDelete = function() {
        $scope.detalleCollection.splice(selectedIdx, 1);
        $('#deleteModal').modal('hide');
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


    function validate() {
        var rta = true;
        if ($scope.companiaSelected == null || $scope.companiaSelected == '') {
            rta = false;
        } else {
            if ($scope.companiaSelected.id == '' || angular.isUndefined($scope.companiaSelected)) { rta = false; }
        }
        if ($scope.CoberturaId == '' || angular.isUndefined($scope.CoberturaId)) { rta = false; }

        if ($scope.familiaSelected == null || $scope.familiaSelected == '') {
            rta = false;
        } else {
            if ($scope.familiaSelected.familiaid == '' || angular.isUndefined($scope.familiaSelected)) { rta = false; }
        }
        if ($scope.activoSelected == '' || angular.isUndefined($scope.activoSelected)) { rta = false; }
        if ($scope.aceptaSelected == '' || angular.isUndefined($scope.aceptaSelected)) { rta = false; }
        if ($scope.telesales == '' || angular.isUndefined($scope.telesales)) { rta = false; }
        if ($scope.detalleCollection[0] == '' || angular.isUndefined($scope.detalleCollection[0])) { rta = false; }
        return rta;
    }

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

    function validaCobertura() {

        var resp = '';
        AltaCoberturaService.getValidCobertura($scope.companiaSelected.id, $scope.CoberturaId).then(function(response) {
            if (response.status == 201) {
                resp = 'Registro duplicado en ws_broker_cia_cobertura_detalle';
            }
        });
        return resp;
    }

    function validaFamilia() {
        var resp = '';
        AltaCoberturaService.getValidFamilia($scope.companiaSelected.id, $scope.CoberturaId).then(function(response) {
            if (response.status == 201) {
                resp = 'Registro duplicado en ws_broker_cia_familia';
            }
        });
        return resp;
    }

    function validaSomDetalleCobertura() {
        var resp = '';
        AltaCoberturaService.getValidSomDetalleCobertura($scope.companiaSelected.id, $scope.CoberturaId).then(function(response) {
            if (response.status == 201) {
                resp = 'Registro duplicado en som_detallecoberturas';
            }
        });
        return resp;
    }

    async function gvalidaCobertura() {
        var resp = await validaCobertura();
        return resp;
    }

    $scope.submit = function() {
        var alc = '';
        var resp = '';
        if (validate()) {
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

                AltaCoberturaService.getAltaCobertura($scope.companiaSelected.id, $scope.CoberturaId, $scope.familiaSelected.familiaid, $scope.activoSelected, $scope.aceptaSelected, $scope.telesales, alc).then(function(response) {
                    if (response.status == 200) {
                        swal({
                            title: "Cobertura",
                            text: 'Se guardaron los registros correctamente',
                            icon: "success",
                            // buttons: true,
                            dangerMode: true,
                        });
                        $scope.companiaSelected.id = 0;
                        $scope.CoberturaId = '';
                        $scope.familiaSelected.familiaid = 0;
                        $scope.activoSelected = '';
                        $scope.aceptaSelected = '';
                        $scope.telesales = '';
                        alc = '';
                        $scope.detalleCollection = [];

                    } else if (response.status == 260) {
                        swal({
                            title: "Registro duplicado",
                            text: 'Registro duplicado en ws_broker_cia_cobertura_detalle',
                            icon: "error",
                            // buttons: true,
                            dangerMode: true,
                        });
                    } else if (response.status == 261) {
                        swal({
                            title: "Registro duplicado",
                            text: 'Registro duplicado en ws_broker_cia_familia',
                            icon: "error",
                            // buttons: true,
                            dangerMode: true,
                        });
                    } else if (response.status == 262) {
                        swal({
                            title: "Registro duplicado",
                            text: 'Registro duplicado en ws_broker_cia_familia',
                            icon: "error",
                            // buttons: true,
                            dangerMode: true,
                        });
                    } else {
                        swal({
                            title: "Cobertura",
                            text: 'Se generó un error al querer guardar los registros de cobertura',
                            icon: "error",
                            // buttons: true,
                            dangerMode: true,
                        });

                    }
                });

            }
        } else {
            swal({
                title: "Datos Mandatorios",
                text: 'Falta cargar información necesaria para realizar el alta',
                icon: "error",
                // buttons: true,
                dangerMode: true,
            });
        }
    };
}

angular.module('mainapp').controller('altaCoberturaCtrl', AltaCoberturaCtrl);