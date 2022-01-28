angular.module('mainapp').factory('ModuloService', ModuloService);

function ModulesCtrl ($scope, $window, $cookies, $location, $stateParams, $state, $filter, ModuloService) {
	
  if(angular.isUndefined($cookies.getObject('name')) || 
    angular.isUndefined($cookies.getObject('uid')) || 
    angular.isUndefined($cookies.getObject('token') ) 
    ){
    $scope.$emit('logout');
  }

  var vCard = {
  	title: ''
  }
  var selectedIdx = '';
  var modulesArr = '';
  $scope.resultType = $stateParams.param;
 	$scope.cardCollection = [];
  $scope.loading = false;
  $scope.modulesCollection = [];
  $scope.acctionsCollection = '';
  $scope.cardEdit = '';
  $scope.searchModel = {
    codigo: '00',
    descripcion: '',
  };


  ModuloService.getModulos()
    .then(function(response){
      // if(response.status == 200){ $scope.modulesCollection = response.data; }
      if(response.status == 200){ modulesArr = response.data; }
    });

  $scope.btnSearchGroups = function(){
    if($scope.resultType == 'all'){
      ModuloService.getModulosTodos('T', 'mdl001', $scope.searchModel)
        .then(function(response){
          if(response.status == 200){
            $scope.cardCollection = response.data.datos;
            $scope.acctionsCollection = setActions (response.data.acciones);
          }
        })
      .catch(function (error) { 
        if(error.status == 400){ $scope.$emit('error404'); }
        else{
            swal({
              title: "ERROR",
              text: error.data,
              icon: "error",
              // buttons: true,
              dangerMode: true,
            });
        } 
      });
    }else{
      var pcountType = "A";
      if($stateParams.param == 'pend'){ pcountType = "P"; }
      ModuloService.getModulosSLC( pcountType, 'mdl001', $scope.searchModel)
        .then(function(response){
          if(response.status == 200){
            $scope.cardCollection = response.data.datos;
            $scope.acctionsCollection = setActions (response.data.acciones);
          }
        })
      .catch(function (error) { 
        if(error.status == 400){ $scope.$emit('error404'); }
        else{
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
  }
  
// _____________________

  $scope.btnRemoveCard = function(idx, action){ 
  	swal({
      title: "Ud. esta seguro?",
      text: "Una vez eliminada no se podra recuperar la informacion!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) { // DELETE
        if(action == 3){
          ModuloService.deleteModulo($scope.cardCollection[idx])
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) { 
              if(error.status == 400){ $scope.$emit('error404'); }
              else{
                  swal({
                    title: "ERROR",
                    text: error.data,
                    icon: "error",
                    // buttons: true,
                    dangerMode: true,
                  });
              } 
            });
        }else if(action == 5){
          ModuloService.deleteModuloSLC($scope.cardCollection[idx], 'eliminar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) { 
              if(error.status == 400){ $scope.$emit('error404'); }
              else{
                  swal({
                    title: "ERROR",
                    text: error.data,
                    icon: "error",
                    // buttons: true,
                    dangerMode: true,
                  });
              } 
            });
        }else if(action == 6){
          ModuloService.deleteModuloSLC($scope.cardCollection[idx], 'autorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) { 
              if(error.status == 400){ $scope.$emit('error404'); }
              else{
                  swal({
                    title: "ERROR",
                    text: error.data,
                    icon: "error",
                    // buttons: true,
                    dangerMode: true,
                  });
              } 
            });
        }else if(action == 7){
          ModuloService.deleteModuloSLC($scope.cardCollection[idx], 'desautorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) { 
              if(error.status == 400){ $scope.$emit('error404'); }
              else{
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
      } /*else { 
        swal("Your imaginary file is safe!");
      }*/
    });
  }

  $scope.btnAuthCard = function(idx, action){ 
    swal({
      title: "¿Esta seguro de autorizar esta modificación?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) { // DELETE
        if(action == 6){
          ModuloService.deleteModuloSLC($scope.cardCollection[idx], 'autorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) { 
              if(error.status == 400){ $scope.$emit('error404'); }
              else{
                  swal({
                    title: "ERROR",
                    text: error.data,
                    icon: "error",
                    // buttons: true,
                    dangerMode: true,
                  });
              } 
            });
        }else if(action == 7){
          ModuloService.deleteModuloSLC($scope.cardCollection[idx], 'desautorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) { 
              if(error.status == 400){ $scope.$emit('error404'); }
              else{
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
      } /*else { 
        swal("Your imaginary file is safe!");
      }*/
    });
  }

  $scope.btnDesAuthCard = function(idx, action){ 
    swal({
      title: "¿Esta seguro de desautorizar esta modificación?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) { // DELETE
        if(action == 7){
          ModuloService.deleteModuloSLC($scope.cardCollection[idx], 'desautorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) { 
              if(error.status == 400){ $scope.$emit('error404'); }
              else{
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
      } /*else { 
        swal("Your imaginary file is safe!");
      }*/
    });
  }

  $scope.btnSearchModal = function (){ 
    $scope.loading = false;
    $('#searchModal').modal('show'); 
  }

  $scope.btnConfirmSearch = function (){ 
    $scope.loading = true;
    $scope.btnSearchGroups();
    $('#searchModal').modal('hide');
    $scope.loading = false;
    $scope.searchModel = {
      codigo: '00',
      descripcion: '',
    };
  }


  /*$scope.btnEditModal = function (idx, action){ 
    $scope.cardEdit = angular.copy($scope.cardCollection[idx]); 
    $scope.moduleSelected = '';
    $scope.actionSelected = action;
    $scope.modulesCollection  = $filter('filter')(modulesArr, function(value){
      return value.id != $scope.cardEdit.id;
    });
    if($scope.cardEdit.idAccModulo != null){
      $scope.moduleSelected = {id: $scope.cardEdit.idAccModulo, descripcion: ''};
    }
    $('#editModal').modal('show'); 
  }*/
  $scope.btnEditModal = function (idx, action){ 
    if($scope.resultType == 'all'){
      ModuloService.getModulo($scope.cardCollection[idx].id)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.cardEdit = response.data;
            $scope.moduleSelected = '';
            $scope.actionSelected = action;
            $scope.modulesCollection  = $filter('filter')(modulesArr, function(value){
              return value.id != $scope.cardEdit.id;
            });
            if($scope.cardEdit.idAccModulo != null){
              $scope.moduleSelected = {id: $scope.cardEdit.idAccModulo, descripcion: ''};
            }
            $('#editModal').modal('show'); 
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
              // dangerMode: true,
            })
          }
        })
        .catch(function (error) { 
          if(error.status == 400){ $scope.$emit('error404'); }
          else{
              swal({
                title: "ERROR",
                text: error.data,
                icon: "error",
                // buttons: true,
                dangerMode: true,
              });
          } 
        });
      }else{
        ModuloService.getModuloSLC($scope.cardCollection[idx].id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.moduleSelected = '';
              $scope.actionSelected = action;
              $scope.modulesCollection  = $filter('filter')(modulesArr, function(value){
                return value.id != $scope.cardEdit.idOrigen;
              });
              if($scope.cardEdit.idAccModulo != null){
                $scope.moduleSelected = {id: $scope.cardEdit.idAccModulo, descripcion: ''};
              }
              $('#editModal').modal('show'); 
            }else{
              swal({
                title: "Atencion",
                text: response.statusText,
                icon: "warning",
                buttons: true,
                // dangerMode: true,
              })
            }
          })
          .catch(function (error) { 
            if(error.status == 400){ $scope.$emit('error404'); }
            else{
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
  }

  $scope.btnConfirmEdit = function (action){ 
    // $scope.cardEdit.idAccModuloNavigation = $scope.moduleSelected;
    $scope.cardEdit.idAccModulo = $scope.moduleSelected.id;
    if(action == 2){
      ModuloService.putModulo($scope.cardEdit)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $window.location.reload();
            $('#editModal').modal('hide'); 
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
              // dangerMode: true,
            })
          }
        })
        .catch(function (error) { 
          if(error.status == 400){ $scope.$emit('error404'); }
          else{
              swal({
                title: "ERROR",
                text: error.data,
                icon: "error",
                // buttons: true,
                dangerMode: true,
              });
          } 
        });
    }else if(action == 4){
      ModuloService.putModuloSLC($scope.cardEdit)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $window.location.reload();
            $('#editModal').modal('hide'); 
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
              // dangerMode: true,
            })
          }
        })
        .catch(function (error) { 
          if(error.status == 400){ $scope.$emit('error404'); }
          else{
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
  }


  $scope.btnFilterActions = function (pparam){
    $state.go('app.configuration.modules', {
        param: pparam
    });
  }

  $scope.btnAddCardModal = function (){ 
    $scope.newModel = {
      descripcion: '',
      codigo: '',
      idAccModuloNavigation: '',
    }
    $scope.modulesCollection  = modulesArr;
    $scope.loading = false;
    $('#newModal').modal('show'); 
  } 

  $scope.btnConfirmNew = function (){ 
    if(validateNewForm()){
      $scope.loading = true;
      ModuloService.setModuloSLC($scope.newModel)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $window.location.reload();
            $('#newModal').modal('hide');
            $scope.loading = false;
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
            })
          }
        })
        .catch(function (error) { 
          if(error.status == 400){ $scope.$emit('error404'); }
          else{
              swal({
                title: "ERROR",
                text: error.data,
                icon: "error",
                dangerMode: true,
              });
          } 
        });
    }else{
      swal({
        title: "ERROR",
        text: 'Debe completar todos los campos!',
        icon: "error",
        dangerMode: true,
      });
    }
  } 

  $scope.btnSearchGroups();

  function setActions (collection){
    var actionArr = {
      alta : false,
      modificacion : false,
      baja : false,
      consulta : false,
      aprobacion : false,
      desaprobacion : false,
      autorizacion : false,
      desautorizacion : false,
      selected: ''
    };

    angular.forEach(collection, function(value, key){
      if(value.id == 1){ actionArr.alta = true; }
      if(value.id == 2){ actionArr.modificacion = true; }
      if(value.id == 3){ actionArr.baja = true; }
      if(value.id == 4){ actionArr.modificacion_pend = true; }
      if(value.id == 5){ actionArr.baja_pend = true; }
      if(value.id == 6){ actionArr.autorizacion = true; }
      if(value.id == 7){ actionArr.desautorizacion = true; }
      if(value.id == 8){ actionArr.consulta = true; }
    })

    return actionArr;
  }

  function validateNewForm (){
    var rta = true;

    if($scope.newModel.codigo == '' || angular.isUndefined($scope.newModel.codigo) || $scope.newModel.codigo == null) { rta = false;}
    if($scope.newModel.descripcion == '' || angular.isUndefined($scope.newModel.descripcion) || $scope.newModel.descripcion == null) { rta = false;}

    return rta;
  }

}

angular.module('mainapp').controller('modulesCtrl', ModulesCtrl);

