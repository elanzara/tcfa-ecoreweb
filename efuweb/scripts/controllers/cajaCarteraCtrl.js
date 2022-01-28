angular.module('mainapp').factory('CajaCarteraService', CajaCarteraService);

function CajaCarteraCtrl($scope, $window, $cookies, $location, $stateParams, $state, CajaCarteraService, Upload) {

    if (angular.isUndefined($cookies.getObject('name')) ||
        angular.isUndefined($cookies.getObject('uid')) ||
        angular.isUndefined($cookies.getObject('token'))
    ) {
        $scope.$emit('logout');
    }

    var vCard = {
        title: ''
    }
    var selectedIdx = '';
    $scope.resultType = $stateParams.param;
    $scope.cardCollection = [];
    $scope.acctionsCollection = '';
    $scope.loading = false;
    $scope.cardEdit = '';
    $scope.searchModel = {
        codigo: '',
        descripcion: '',
    };
    $scope.archivo = '';

    // upload later on form submit or something similar
    $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
            /*Debo ver si el archivo ya se proceso previamente*/
            CajaCarteraService.getArchivoProcesado($scope.file.name)
                .then(function(response) {
                    if (response.data == "200") {
                        swal({
                            title: "Atencion",
                            text: "El archivo " + $scope.file.name + " ya fue procesado. Desea reprocesarlo?",
                            icon: "warning",
                            buttons: true,
                            // dangerMode: true,
                        }).then((result) => {
                            if (result) {
                                $scope.upload($scope.file);
                            }
                        })
                    } else if (response.data == "201") {
                        $scope.upload($scope.file);
                    } else {
                        swal({
                            title: "ERROR",
                            text: "Ocurrió un error al validar el archivo: ".response.data,
                            icon: "error",
                            // buttons: true,
                            dangerMode: true,
                        });
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

        }
    };


    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    // upload on file select or drop
    //url: apiUrl + 'api/AllianzCommission',
    //data: { file: file, 'username': $scope.username }
    $scope.upload = function(file) {
        $scope.loading = true;
        Upload.upload({
            url: apiUrl + 'api/CajaCartera',
            data: { file: file, 'username': $scope.username }
        }).then(function(resp) {
            $scope.loading = false;
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            swal({
                title: "Procesado correctamente",
                text: "Procesado correctamente el archivo " + resp.config.data.file.name,
                icon: "success",
                // buttons: true,
                //dangerMode: true,
            });
        }, function(resp) {
            $scope.loading = false;
            console.log('Error status: ' + resp.status);
            swal({
                title: "ERROR",
                text: 'Error status: ' + resp.status,
                icon: "error",
                // buttons: true,
                dangerMode: true,
            });
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    // for multiple files:
    $scope.uploadFiles = function(files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                alert("Entra al upload");
                //Upload.upload({..., data: { file: files[i] }, ... })...;
            }
            // or send them all together for HTML5 browsers:
            alert("Entra al upload por html5");
            //Upload.upload({..., data: { file: files }, ... })...;
        }
    }

}

angular.module('mainapp').controller('cajaCarteraCtrl', CajaCarteraCtrl);