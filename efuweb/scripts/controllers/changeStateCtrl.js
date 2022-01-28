angular.module('mainapp').factory('ChangeStateService', ChangeStateService);

function ChangeStateCtrl($scope, $window, $cookies, $location, $stateParams, $state, ChangeStateService, Upload) {

    if (angular.isUndefined($cookies.getObject('name')) ||
        angular.isUndefined($cookies.getObject('uid')) ||
        angular.isUndefined($cookies.getObject('token'))
    ) {
        $scope.$emit('logout');
    }

    var vCard = {
        title: ''
    };
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

    $scope.stateCollection = [];
    var selectedIdx = '';
    $scope.estadoSelected = '';
    $scope.model = {
        id: 0,
        estado: ''
    };


    ChangeStateService.GetComprado().then(function(response) {
        if (response.status == 200) {
            $scope.stateCollection = response.data;
        } else if (response.code == 205) {
            $scope.stateCollection = '';
        } else if (response.code == 403) {
            $scope.$emit('logout');
        }
    });

    $scope.btnCambio = function(index) {
        if ($scope.stateCollection[index].id > 0) {
            selectedIdx = index;
            $('#deleteModal').modal('show');
        }
    };

    $scope.btnConfirm = function() {
        if ($scope.stateCollection[selectedIdx].id > 0) {
            $scope.model.id = $scope.stateCollection[selectedIdx].id;
            $scope.model.estado = $scope.estadoSelected;
            ChangeStateService.change($scope.model.id, $scope.model.estado).then(function(response) {
                if (response.status == 200) {
                    swal({
                        title: "Procesado correctamente",
                        text: "Procesado correctamente el cambio de estado ",
                        icon: "success",
                        // buttons: true,
                        //dangerMode: true,
                    });
                    ChangeStateService.GetComprado().then(function(response) {
                        if (response.status == 200) {
                            $scope.stateCollection = response.data;
                        } else if (response.code == 205) {
                            $scope.stateCollection = '';
                        } else if (response.code == 403) {
                            $scope.$emit('logout');
                        }
                    });
                    $('#deleteModal').modal('hide');
                } else if (response.code == 205) {
                    $scope.stateCollection = '';
                } else if (response.code == 403) {
                    $scope.$emit('logout');
                }
            });
        }
    };


    // // upload later on form submit or something similar
    // $scope.submit = function() {
    //     if ($scope.form.file.$valid && $scope.file) {
    //         $scope.upload($scope.file);
    //     }
    // };


    // var config = {
    //     headers: { 'Authorization': $cookies.getObject('token') }
    // };

    // // upload on file select or drop
    // $scope.upload = function(file) {
    //     $scope.loading = true;
    //     Upload.upload({
    //         url: apiUrl + 'api/Sancor',
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

angular.module('mainapp').controller('changeStateCtrl', ChangeStateCtrl);