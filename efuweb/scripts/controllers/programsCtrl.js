angular.module('mainapp').factory('ProgramService', ProgramService);

function ProgramsCtrl ($scope, $window, $cookies, $location, $stateParams, $state, ProgramService) {
	
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
  $scope.resultType = $stateParams.param;
 	$scope.cardCollection = [];
  $scope.acctionsCollection = '';
  $scope.cardEdit = '';
  $scope.searchModel = {
    codigo: '',
    descripcion: '',
  };


  $scope.btnSearch = function(){
    if($scope.resultType == 'all'){
      ProgramService.getProgramsTodos('T', 'pgr001', $scope.searchModel)
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
      ProgramService.getProgramsSLC( pcountType, 'pgr001', $scope.searchModel)
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
          ProgramService.deleteProgram($scope.cardCollection[idx])
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
          ProgramService.deleteProgramSLC($scope.cardCollection[idx], 'eliminar')
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
          ProgramService.deleteProgramSLC($scope.cardCollection[idx], 'autorizar')
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
          ProgramService.deleteProgramSLC($scope.cardCollection[idx], 'desautorizar')
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
          ProgramService.deleteProgramSLC($scope.cardCollection[idx], 'autorizar')
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
          ProgramService.deleteProgramSLC($scope.cardCollection[idx], 'desautorizar')
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
          ProgramService.deleteProgramSLC($scope.cardCollection[idx], 'desautorizar')
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

  $scope.btnSearchModal = function (){ $('#searchModal').modal('show'); }
  $scope.btnConfirmSearch = function (){ 
    $scope.btnSearch()
    $('#searchModal').modal('hide');
    $scope.searchModel = {
      codigo: '',
      descripcion: '',
    };
  }

  $/*scope.btnEditModal = function (idx, action){ 
    $scope.cardEdit = angular.copy($scope.cardCollection[idx]);
    $scope.actionSelected = action;
    $('#editModal').modal('show'); 
  }*/

  $scope.btnEditModal = function (idx, action){ 
    if($scope.resultType == 'all'){
      ProgramService.getProgram($scope.cardCollection[idx].id)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.cardEdit = response.data;
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
        ModuloService.getProgramSLC($scope.cardCollection[idx].id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              // $scope.moduleSelected = '';
              $scope.actionSelected = action;
              /*$scope.modulesCollection  = $filter('filter')(modulesArr, function(value){
                return value.id != $scope.cardEdit.idOrigen;
              });
              if($scope.cardEdit.idAccModulo != null){
                $scope.moduleSelected = {id: $scope.cardEdit.idAccModulo, descripcion: ''};
              }*/
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
    if(action == 2){
      ProgramService.putPrograms($scope.cardEdit)
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
      ProgramService.putProgramSLC($scope.cardEdit)
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
      descripcion: '',
      codigo: '',
    }
    $('#newModal').modal('show'); 
  } 

  $scope.btnConfirmNew = function (){ 
    if(validateNewForm()){
      ProgramService.setProgramSLC($scope.newModel)
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
    $state.go('app.configuration.programs', {
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

    if($scope.newModel.codigo == '' || angular.isUndefined($scope.newModel.codigo) || $scope.newModel.codigo == null) { rta = false;}
    if($scope.newModel.descripcion == '' || angular.isUndefined($scope.newModel.descripcion) || $scope.newModel.descripcion == null) { rta = false;}

    return rta;
  }

}

angular.module('mainapp').controller('programsCtrl', ProgramsCtrl);

