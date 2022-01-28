angular.module('mainapp').factory('ScriCollectionsService', ScriCollectionsService);

function ScriCollectionsCtrl($scope, $window, $cookies, $location, $stateParams, $state, ScriCollectionsService, $filter) {

    if (angular.isUndefined($cookies.getObject('name')) ||
        angular.isUndefined($cookies.getObject('uid')) ||
        angular.isUndefined($cookies.getObject('token'))
    ) {
        $scope.$emit('logout');
    }
    $scope.resultType = $stateParams.param;
    /*Formato default datepicker*/
    $.fn.datepicker.defaults.format = "dd/mm/yyyy";
    $scope.dateFrom = "";
    $scope.dateTo = new Date();
    $scope.dateTo.setDate($scope.dateTo.getDate() - 1);
    $scope.dateTo = $filter('date')($scope.dateTo, 'dd/MM/yyyy');
    $scope.CurrentDate = new Date();
    $scope.taxSelected = "";
    $scope.codProdSelected = "";
    // $scope.taxs = "";
    // $scope.codProdList = "";
    // $scope.taxSelected = "";
    // $scope.codProdSelected = "";

    ScriCollectionsService.getFechaMaxima()
        .then(function(response) {
            if (response.status == 200) {
                //if (response.data[0].vigenciaDesde != "") {
                if (Object.keys(response.data).length > 0) {
                    $scope.dateFrom = new Date();
                    $scope.dateFromBBDD = new Date(response.data[0].ext_ApplicationDate);
                    // $scope.dateFrom.setDate($scope.dateFrom.getDate() - 90);
                    // if ($scope.dateFromBBDD > $scope.dateFrom) {
                    $scope.dateFromBBDD.setDate($scope.dateFromBBDD.getDate() + 1);
                    // if ($scope.dateFromBBDD > $scope.dateTo) { $scope.dateFromBBDD = $scope.dateTo; }
                    $scope.dateFrom = $scope.dateFromBBDD;
                    $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                    // } else {
                    //     $scope.dateFrom = new Date();
                    //     $scope.dateFrom.setDate($scope.dateFrom.getDate() - 90);
                    //     $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                    // }
                } else {
                    $scope.dateFrom = new Date();
                    //var theBigDay = new Date(2020, 0, 1);
                    //theBigDay.setDate(1);
                    //$scope.dateFrom.setDate(theBigDay);
                    $scope.dateFrom = new Date(2020, 0, 1);
                    $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                }
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

    /*$scope.taxs = [];*/
    ScriCollectionsService.getTax().then(function(response) {
        if (response.status == 200) {
            $scope.taxs = response.data;
        }
    });

    // ScriMovementsService.getCodigoProductor().then(function(response) {
    //     if (response.status == 200) {
    //         $scope.codProdList = response.data;
    //     }
    // });

    $scope.convertirFecha = function(fecha) {
        var yyyy = fecha.substring(6, 10);
        var MM = fecha.substring(3, 5);
        var dd = fecha.substring(0, 2);

        return yyyy + '-' + MM + '-' + dd;
    }

    $scope.submit = function() {

            $scope.dateFrom = $('#dateFrom input').val();
            $scope.pDateFrom = $scope.convertirFecha($scope.dateFrom);
            $scope.dateTo = $('#dateTo input').val();
            $scope.pDateTo = $scope.convertirFecha($scope.dateTo);

            if ($scope.taxSelected != "") {
                $scope.taxId = $scope.taxSelected.taxId;
            }

            // if ($scope.codProdSelected != "") {
            //     $scope.ProducerCode = $scope.codProdSelected.codigoProductor;
            // }

            ScriCollectionsService.PostScriCobranzas($scope.taxId, $scope.pDateFrom, $scope.pDateTo)
                .then(function(response) {
                    if (response.status == 200) {
                        swal({
                            title: "Procesado",
                            text: "Se procesaron las cobranzas de San Cristobal Seguros desde " + $scope.dateFrom + " Hasta " + $scope.dateTo,
                            icon: "success",
                            buttons: true,
                            // dangerMode: true,
                        }).then((result) => {
                            if (result) {
                                ScriCollectionsService.getFechaMaxima()
                                    .then(function(response) {
                                        if (response.status == 200) {
                                            if (Object.keys(response.data).length > 0) {
                                                $scope.dateFrom = new Date();
                                                $scope.dateFromBBDD = new Date(response.data[0].ext_ApplicationDate);
                                                // $scope.dateFrom.setDate($scope.dateFrom.getDate() - 90);
                                                // if ($scope.dateFromBBDD > $scope.dateFrom) {
                                                $scope.dateFromBBDD.setDate($scope.dateFromBBDD.getDate() + 1);
                                                // if ($scope.dateFromBBDD > $scope.dateTo) { $scope.dateFromBBDD = $scope.dateTo; }
                                                $scope.dateFrom = $scope.dateFromBBDD;
                                                $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                                                // } else {
                                                //     $scope.dateFrom = new Date();
                                                //     $scope.dateFrom.setDate($scope.dateFrom.getDate() - 90);
                                                //     $scope.dateFrom = $filter('date')($scope.dateFrom, 'dd/MM/yyyy');
                                                // }
                                            } else {
                                                $scope.dateFrom = new Date();
                                                var theBigDay = new Date(2021, 6, 1, 12);
                                                theBigDay.setDate(0);
                                                $scope.dateFrom.setDate(theBigDay);
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
                            text: "No hay cobranzas de San Cristobal Seguros en el periodo:  desde " + $scope.dateFrom + " Hasta " + $scope.dateTo,
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
                            text: "La cantidad de dias de el período solicitado no puede ser mayor a 31 dias.",
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



            // swal({
            //     title: "Atencion",
            //     text: "Fecha desde " + $scope.dateFrom + " Fecha Hasta " + $scope.dateTo,
            //     icon: "warning",
            //     buttons: true,
            //     // dangerMode: true,
            // }).then((result) => {
            //     if (result) {
            //         //$scope.upload($scope.file);
            //     }
            // })
        }
        // var vCard = {
        //     title: ''
        // }
        // var selectedIdx = '';
        // $scope.resultType = $stateParams.param;
        // $scope.cardCollection = [];
        // $scope.acctionsCollection = '';
        // $scope.loading = false;
        // $scope.cardEdit = '';
        // $scope.searchModel = {
        //     codigo: '',
        //     descripcion: '',
        // };
        // $scope.archivo = '';

    // // upload later on form submit or something similar
    // $scope.submit = function() {
    //     if ($scope.form.file.$valid && $scope.file) {
    //         /*Debo ver si el archivo ya se proceso previamente*/
    //         AllianzCommissionService.getArchivoProcesado($scope.file.name)
    //             .then(function(response) {
    //                 if (response.data == "200") {
    //                     swal({
    //                         title: "Atencion",
    //                         text: "El archivo " + $scope.file.name + " ya fue procesado. Desea reprocesarlo?",
    //                         icon: "warning",
    //                         buttons: true,
    //                         // dangerMode: true,
    //                     }).then((result) => {
    //                         if (result) {
    //                             $scope.upload($scope.file);
    //                         }
    //                     })
    //                 } else if (response.data == "201") {
    //                     $scope.upload($scope.file);
    //                 } else {
    //                     swal({
    //                         title: "ERROR",
    //                         text: "Ocurrió un error al validar el archivo: ".response.data,
    //                         icon: "error",
    //                         // buttons: true,
    //                         dangerMode: true,
    //                     });
    //                 }

    //             })
    //             .catch(function(error) {
    //                 if (error.status == 400) { $scope.$emit('error404'); } else {
    //                     swal({
    //                         title: "ERROR",
    //                         text: error.data,
    //                         icon: "error",
    //                         // buttons: true,
    //                         dangerMode: true,
    //                     });
    //                 }
    //             });

    //     }
    // };


    // var config = {
    //     headers: { 'Authorization': $cookies.getObject('token') }
    // };

    // // upload on file select or drop
    // $scope.upload = function(file) {
    //     $scope.loading = true;
    //     Upload.upload({
    //         url: apiUrl + 'api/AllianzCommission',
    //         data: { file: file, 'username': $scope.username }
    //     }).then(function(resp) {
    //         $scope.loading = false;
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //         swal({
    //             title: "Procesado correctamente",
    //             text: "Procesado correctamente el archivo " + resp.config.data.file.name,
    //             icon: "success",
    //             // buttons: true,
    //             //dangerMode: true,
    //         });
    //     }, function(resp) {
    //         $scope.loading = false;
    //         console.log('Error status: ' + resp.status);
    //         swal({
    //             title: "ERROR",
    //             text: 'Error status: ' + resp.status,
    //             icon: "error",
    //             // buttons: true,
    //             dangerMode: true,
    //         });
    //     }, function(evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };
    // // for multiple files:
    // $scope.uploadFiles = function(files) {
    //     if (files && files.length) {
    //         for (var i = 0; i < files.length; i++) {
    //             alert("Entra al upload");
    //             //Upload.upload({..., data: { file: files[i] }, ... })...;
    //         }
    //         // or send them all together for HTML5 browsers:
    //         alert("Entra al upload por html5");
    //         //Upload.upload({..., data: { file: files }, ... })...;
    //     }
    // }


}

angular.module('mainapp').controller('scriCollectionsCtrl', ScriCollectionsCtrl);