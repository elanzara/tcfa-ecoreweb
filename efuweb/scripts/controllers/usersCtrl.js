angular.module('mainapp').factory('UserService', UserService);
angular.module('mainapp').factory('ProfileService', ProfileService);

function UsersCtrl ($scope, $window, $cookies, $location, $stateParams, $state, UserService, ProfileService) {
	
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
  $scope.profilesCollection  = '';
  $scope.adusersCollection  = '';
  $scope.resultType = $stateParams.param;
 	$scope.cardCollection = [];
  $scope.acctionsCollection = '';
  $scope.cardEdit = '';
  $scope.searchModel = {
    nombres: '',
    apellido: '',
    adCuenta: '',
    idAccPerfil: '',
  };

  ProfileService.getPerfiles()
    .then(function(response){
      if(response.status == 200){ $scope.profilesCollection = response.data; }
    });

  UserService.getADUser()
    .then(function(response){
      if(response.status == 200){ $scope.adusersCollection = response.data; }
    });

  $scope.btnSearch = function(){
    if($scope.resultType == 'all'){
      UserService.getUsersTodos('T', 'usr001', $scope.searchModel)
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
      UserService.getUsersSLC( pcountType, 'usr001', $scope.searchModel)
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
          UserService.deleteUsers($scope.cardCollection[idx])
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
          UserService.deleteUserSLC($scope.cardCollection[idx], 'eliminar')
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
          UserService.deleteUserSLC($scope.cardCollection[idx], 'autorizar')
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
          UserService.deleteUserSLC($scope.cardCollection[idx], 'desautorizar')
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
          UserService.deleteUserSLC($scope.cardCollection[idx], 'autorizar')
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
          UserService.deleteUserSLC($scope.cardCollection[idx], 'desautorizar')
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
          UserService.deleteUserSLC($scope.cardCollection[idx], 'desautorizar')
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
    $scope.searchModel = {
      nombres: '',
      apellido: '',
      adCuenta: '',
      idAccPerfil: '',
      bloqueado: '0',
      maxCantidadConexiones: 1,
      sucursal: '',
      profileSelected: '',
    };
    $('#searchModal').modal('show'); 
  }

  $scope.btnConfirmSearch = function (){ 
    if(!angular.isUndefined($scope.searchModel.profileSelected.id)){
      $scope.searchModel.idAccPerfil = $scope.searchModel.profileSelected.id;
    }
    $scope.btnSearch()
    $('#searchModal').modal('hide');
  }

  /*$scope.btnEditModal = function (idx, action){ 
    $scope.cardEdit = angular.copy($scope.cardCollection[idx]);
    $scope.actionSelected = action;
    $('#editModal').modal('show'); 
  }*/

  $scope.btnEditModal = function (idx, action){ 
    if($scope.resultType == 'all'){
      UserService.getUser($scope.cardCollection[idx].id)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.cardEdit = response.data;
            $scope.cardEdit.profileSelected = {id: $scope.cardEdit.idAccPerfil};
            $scope.cardEdit.bloqueado = $scope.cardEdit.bloqueado.toString();
            $scope.cardEdit.maxCantidadConexiones = parseInt($scope.cardEdit.maxCantidadConexiones);
            $scope.actionSelected = action;
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
        UserService.getUserSLC($scope.cardCollection[idx].id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.cardEdit.profileSelected = {id: $scope.cardEdit.idAccPerfil};
              $scope.cardEdit.bloqueado = $scope.cardEdit.bloqueado.toString();
              $scope.cardEdit.maxCantidadConexiones = parseInt($scope.cardEdit.maxCantidadConexiones);
              $scope.actionSelected = action;
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
    $scope.cardEdit.idAccPerfil = $scope.cardEdit.profileSelected.id;
    if(action == 2){
      UserService.putUsers($scope.cardEdit)
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
      UserService.putUserSLC($scope.cardEdit)
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

  $scope.btnAddCardModal = function (){ 
    $scope.newModel = {
      aduserSelected: '',
      profileSelected: '',
      maxCantidadConexiones: 1,
      bloqueado: '0',
      sucursal: '',
    }
    $('#newModal').modal('show'); 
  } 

  $scope.btnConfirmNew = function (){ 
    if(validateNewForm()){
      $scope.newModel.adCuenta = $scope.newModel.aduserSelected.adCuenta;
      $scope.newModel.securityIdentifier = $scope.newModel.aduserSelected.securityIdentifier;
      $scope.newModel.apellido = $scope.newModel.aduserSelected.apellido;
      $scope.newModel.nombres = $scope.newModel.aduserSelected.nombres;
      $scope.newModel.idAccPerfil = $scope.newModel.profileSelected.id;
      UserService.setUserSLC($scope.newModel)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $window.location.reload();
            $('#newModal').modal('hide');
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

  $scope.btnFilterActions = function (pparam){
    $state.go('app.configuration.users', {
        param: pparam
    });
  }

  $scope.btnSearch();

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

    if($scope.newModel.aduserSelected.adCuenta == '' || angular.isUndefined($scope.newModel.aduserSelected.adCuenta) || $scope.newModel.aduserSelected.adCuenta == null) { rta = false;}
    if($scope.newModel.profileSelected.id == '' || angular.isUndefined($scope.newModel.profileSelected.id) || $scope.newModel.profileSelected.id == null) { rta = false;}
    if($scope.newModel.maxCantidadConexiones == '' || angular.isUndefined($scope.newModel.maxCantidadConexiones) || $scope.newModel.maxCantidadConexiones == null) { rta = false;}
    if($scope.newModel.sucursal == '' || angular.isUndefined($scope.newModel.sucursal) || $scope.newModel.sucursal == null) { rta = false;}
    if($scope.newModel.bloqueado == '' || angular.isUndefined($scope.newModel.bloqueado) || $scope.newModel.bloqueado == null) { rta = false;}

    return rta;
  }

}

angular.module('mainapp').controller('usersCtrl', UsersCtrl);

