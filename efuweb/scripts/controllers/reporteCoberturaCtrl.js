angular.module('mainapp').factory('ReporteCoberturaService', ReporteCoberturaService);

function ReporteCoberturaCtrl($scope, $window, $cookies, $location, $stateParams, $state, ReporteCoberturaService, $filter) {

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

    ReporteCoberturaService.getCompania().then(function(response) {
        if (response.status == 200) {
            $scope.companiaList = response.data;
        } else {
            $scope.companiaList = "";
        }
    });

    $scope.btnBuscar = function() {
        if (angular.isUndefined($scope.companiaSelected.id)) { compania = 0; } else { compania = $scope.companiaSelected.id; }
        if (angular.isUndefined($scope.estadoSelected)) { estado = 0; } else { estado = $scope.estadoSelected; }
        ReporteCoberturaService.getReporte(compania, estado).then(function(response) {
            if (response.status == 200) {
                $scope.detalleCollection = response.data;
            } else {
                $scope.detalleCollection = "";
            }
        });

    };

    $scope.submit = function() {

        $scope.dateFrom = $('#dateFrom input').val();
        $scope.pDateFrom = $scope.convertirFecha($scope.dateFrom);
        $scope.dateTo = $('#dateTo input').val();
        $scope.pDateTo = $scope.convertirFecha($scope.dateTo);

        if ($scope.taxSelected != "") {
            $scope.taxId = $scope.taxSelected.taxId;
        }

        if ($scope.codProdSelected != "") {
            $scope.ProducerCode = $scope.codProdSelected.codigoProductor;
        }

        ScriMovementsService.PostScriMovimientos($scope.taxId, $scope.pDateFrom, $scope.pDateTo, $scope.ProducerCode)
            .then(function(response) {
                if (response.status == 200) {
                    swal({
                        title: "Procesado",
                        text: "Se procesaron los movimientos de San Cristobal Seguros desde " + $scope.dateFrom + " Hasta " + $scope.dateTo,
                        icon: "success",
                        buttons: true,
                        // dangerMode: true,
                    }).then((result) => {
                        if (result) {
                            ScriMovementsService.getFechaMaxima()
                                .then(function(response) {
                                    if (response.status == 200) {
                                        if (Object.keys(response.data).length > 0) {
                                            $scope.dateFrom = new Date();
                                            $scope.dateFromBBDD = new Date(response.data[0].startDate);
                                            $scope.dateFrom.setDate($scope.dateFrom.getDate() - 90);
                                            if ($scope.dateFromBBDD > $scope.dateFrom) {
                                                $scope.dateFromBBDD.setDate($scope.dateFromBBDD.getDate() + 1);
                                                if ($scope.dateFromBBDD > $scope.dateTo) { $scope.dateFromBBDD = $scope.dateTo; }
                                                $scope.dateFrom = $scope.dateFromBBDD;
                                                $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                                            } else {
                                                $scope.dateFrom = new Date();
                                                $scope.dateFrom.setDate($scope.dateFrom.getDate() - 90);
                                                $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                                            }
                                        } else {
                                            $scope.dateFrom = new Date();
                                            $scope.dateFrom.setDate($scope.dateFrom.getDate() - 90);
                                            $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                                        }
                                    }
                                });
                            // .catch(function(error) {
                            //     if (error.status == 400) { $scope.$emit('error404'); } else {
                            //         swal({
                            //             title: "ERROR",
                            //             text: error.data,
                            //             icon: "error",
                            //             // buttons: true,
                            //             dangerMode: true,
                            //         });
                            //     }
                            // });
                        }
                    })
                } else if (response.status == 204) {
                    swal({
                        title: "Atencion",
                        text: "No hay movimientos de San Cristobal Seguros en el periodo:  desde " + $scope.dateFrom + " Hasta " + $scope.dateTo,
                        icon: "warning",
                        buttons: true,
                        // dangerMode: true,
                    }).then((result) => {
                        if (result) {
                            //$scope.upload($scope.file);
                            a = 1;
                        }
                    })

                } else if (response.status == 205) {
                    swal({
                        title: "Atencion",
                        text: "Ocurrió un error al procesar movimientos de San Cristobal Seguros en el periodo:  desde " + $scope.dateFrom + " Hasta " + $scope.dateTo,
                        icon: "warning",
                        buttons: true,
                        // dangerMode: true,
                    }).then((result) => {
                        if (result) {
                            //$scope.upload($scope.file);
                            a = 1;
                        }
                    })
                }
            })
            .catch(function(error) {
                if (error.status == 400) { $scope.$emit('error404'); } else {
                    swal({
                        title: "ERROR",
                        text: error.data,
                        icon: "error",
                        // buttons: true,
                        dangerMode: true,
                    });
                }
            });



    };


}

angular.module('mainapp').controller('reporteCoberturaCtrl', ReporteCoberturaCtrl);