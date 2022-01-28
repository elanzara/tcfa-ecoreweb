
function MainCtrl ($scope, $window, $cookies, $location, $state, $translate) {
	
	$scope.userProfile = {
		userName: '',
		userId: '',
		userToken: '',
		userRole: '',
		customer: '',
		customer_code: '',
	}

	$scope.cartItems = [];

	if(!angular.isUndefined($cookies.getObject('name')) && 
		!angular.isUndefined($cookies.getObject('uid')) && 
		!angular.isUndefined($cookies.getObject('token'))  
		){
		
		$translate.use('sp'); 
		$scope.userProfile.userName = $cookies.getObject('name');
		$scope.userProfile.userId = $cookies.getObject('uid');
		$scope.userProfile.userToken = $cookies.getObject('token');
		$scope.userProfile.username = $cookies.getObject('username');
	}
	
	// TOOLBAR
 	$scope.btnLogOut = function (){ $scope.$emit('logout'); ß}

 	$scope.$on('logout', function (){
 		$cookies.remove('name',{path: '/'});
 		$cookies.remove('uid',{path: '/'});
 		$cookies.remove('token',{path: '/'});
 		$cookies.remove('username',{path: '/'});
 		$cookies.remove('sucursal',{path: '/'});

 		$window.location.href = LOGIN;
 	});
 	// TOOLBAR

 	$scope.$on('error404', function (){ $window.location.href = ERRORPAGE; });


 	$scope.btnBack = function (){ $window.history.back();}


}

angular.module('mainapp').controller('mainCtrl', MainCtrl);

