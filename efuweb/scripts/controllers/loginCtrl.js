

angular.module('loginapp').factory('UserService', UserService);

function LoginCtrl ($scope, $window, $location, $cookies, UserService){

	angular.element(document).ready(function () {
  		// javascript / jQuery here

		  /*if(!angular.isUndefined($cookies.getObject('name')) && 
        !angular.isUndefined($cookies.getObject('uid')) && 
        !angular.isUndefined($cookies.getObject('token'))  
        ){ $window.location.href = '../brazoweb/';  }*/
  });


  	$scope.loading = false;
  	$scope.loginhModel = {
  		username: 'usuario1',
  		password: 'password',
  	}

  	$scope.btnLogin = function (){
      $scope.loading = true;
      if(formValidate()){
        UserService.setLogin($scope.loginhModel)
          .then(function(response){
            if(response.status == 200){
              // Guarda la informacion para poder hacer las consultas luego. 
              $cookies.putObject('uid', response.data.id, {'path': '/'});
              $cookies.putObject('token', 'Bearer '+response.data.token, {'path': '/'});
              $cookies.putObject('name', response.data.nombres+' '+response.data.apellido, {'path': '/'});
              $cookies.putObject('username', response.data.username, {'path': '/'});
              $cookies.putObject('sucursal', response.data.sucursal, {'path': '/'});

              $window.location.href = './efuweb/'; 
            }
          })
          .catch(function (error) { 
            swal({
              title: "ERROR",
              text: error.data,
              icon: "error",
              // buttons: true,
              dangerMode: true,
            })
            $scope.loading = false;
          });
      }else{
         // swal("Good job!", "You clicked the button!", "error");
         swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "error",
          // buttons: true,
          dangerMode: true,
        })
        $scope.loading = false;
      }
  	}


    function formValidate (){
      var rta = true;
      if($scope.loginhModel.username == '' || angular.isUndefined($scope.loginhModel.username)){ rta = false;}
      if($scope.loginhModel.password == '' || angular.isUndefined($scope.loginhModel.password)){ rta = false;}
      return rta;
    }
}

angular.module('loginapp').controller('loginCtrl', LoginCtrl);

