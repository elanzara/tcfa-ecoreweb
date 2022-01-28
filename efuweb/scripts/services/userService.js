function UserService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.setLogin = function (model) {
		return  $http.post(apiUrl+'users/authenticate', model);
	};

	response.getMenu = function () {
		return  $http.get(apiUrl+'api/PanelMenu/', config);
	};

	response.setProgramasRecientes = function (id) {
		var model = { "idAccPrograma": id }
		return  $http.post(apiUrl+'api/ProgramasRecientes/', model, config);
	};

	//ABM
	response.getUsers = function () {
		return  $http.get(apiUrl+'api/Usuarios/', config);
	};

	response.getUser = function (id) {
		return  $http.get(apiUrl+'api/Usuarios/'+id, config);
	};

	response.getADUser = function () {
		return  $http.get(apiUrl+'api/ADUsuarios/', config);
	};

	//TODOS
	response.getUsersTodos = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/Usuarios/Origen/'+porigen+'/Programa/'+pprograma+'?nombres='+psearch.nombres+'&apellido='+psearch.apellido+'&adCuenta='+psearch.adCuenta+'&idAccPerfil='+psearch.idAccPerfil, config);
	};

	response.deleteUsers = function (model) {
		return  $http.delete(apiUrl+'api/Usuarios/'+model.id, config);
	};
	
	response.putUsers = function (model) {
		return  $http.put(apiUrl+'api/Usuarios/'+model.id, model, config);
	};

	//SLC
	response.getUsersSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/UsuariosSLC/Origen/'+porigen+'/Programa/'+pprograma+'?nombres='+psearch.nombres+'&apellido='+psearch.apellido+'&adCuenta='+psearch.adCuenta+'&idAccPerfil='+psearch.idAccPerfil, config);
	};

	response.deleteUserSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/UsuariosSLC/'+verb+'/'+model.id, config);
	};

	response.putUserSLC = function (model) {
		return  $http.put(apiUrl+'api/UsuariosSLC/'+model.id, model, config);
	};

	response.setUserSLC = function (model) {
		return  $http.post(apiUrl+'api/UsuariosSLC/', model, config);
	};

	response.getUserSLC = function (id) {
		return  $http.get(apiUrl+'api/UsuariosSLC/'+id, config);
	};


	return response;
}