function HomeService ($http, $location, $cookies) {

	var homeResponse = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	homeResponse.getPrograms = function (type) {
		return  $http.get(apiUrl+'api/PanelCartasProgramas/'+type, config);
	};

	homeResponse.deleteProgramasRecientes = function (id) {
		return  $http.delete(apiUrl+'api/ProgramasFavoritos/'+id, config);
	};

	homeResponse.getCartasProgramas = function () {
		return  $http.get(apiUrl+'api/PanelCartasProgramas/programasusuario/', config);
	};

	homeResponse.setProgramasFavoritos = function (id) {
		var model = { "idAccPrograma": id };
		return  $http.post(apiUrl+'api/ProgramasFavoritos/', model, config);
	};

	homeResponse.setProgramasRecientes = function (id) {
		var model = { "idAccPrograma": id }
		return  $http.post(apiUrl+'api/ProgramasRecientes/', model, config);
	};

	return homeResponse;
}