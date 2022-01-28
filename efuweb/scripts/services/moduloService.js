function ModuloService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.getModulos = function () {
		return  $http.get(apiUrl+'api/Modulos/', config);
	};

	response.getModulo = function (id) {
		return  $http.get(apiUrl+'api/Modulos/'+id, config);
	};

	//TODOS
	response.getModulosTodos = function (porigen, pprograma, psearch) {
		// return  $http.get(apiUrl+'api/Modulos?origen='+porigen+'&programa='+pprograma+'&codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
		return  $http.get(apiUrl+'api/Modulos/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteModulo = function (model) {
		return  $http.delete(apiUrl+'api/Modulos/'+model.id, config);
	};
	
	response.putModulo = function (model) {
		return  $http.put(apiUrl+'api/Modulos/'+model.id, model, config);
	};

	//SLC
	response.getModulosSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ModulosSLC/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteModuloSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/ModulosSLC/'+verb+'/'+model.id, config);
	};

	response.putModuloSLC = function (model) {
		return  $http.put(apiUrl+'api/ModulosSLC/'+model.id, model, config);
	};

	response.setModuloSLC = function (model) {
		return  $http.post(apiUrl+'api/ModulosSLC/', model, config);
	};

	response.getModuloSLC = function (id) {
		return  $http.get(apiUrl+'api/ModulosSLC/'+id, config);
	};


	return response;
}