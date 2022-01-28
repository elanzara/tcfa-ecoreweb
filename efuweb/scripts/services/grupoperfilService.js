function GroupPerfilService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.getGruposxPerfil = function () {
		return  $http.get(apiUrl+'api/GruposXPerfil/', config);
	};

	//TODOS
	response.getGruposTodos = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/GruposXPerfil/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getGruposTodosPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/GruposXPerfil/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteGrupo = function (model) {
		return  $http.delete(apiUrl+'api/GruposXPerfil/'+model.id, config);
	};
	
	response.putGrupo = function (model) {
		return  $http.put(apiUrl+'api/GruposXPerfil/'+model.id, model, config);
	};
	
	response.getGrupoxPerfilxId = function (pid) {
		return  $http.get(apiUrl+'api/GruposXPerfil/'+pid, config);
	};
	
	response.getGrupoxPerfilxIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/Perfiles/'+pid, config);
		// return  $http.get(apiUrl+'api/GruposXPerfil/'+pid+'/perspectiva/'+pprespectiva, config);
	};

	//SLC
	response.getGruposSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/GruposXPerfilSLC/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getGruposSLCPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/GruposXPerfilSLC/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteGrupoSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/GruposXPerfilSLC/'+verb+'/'+model.id, config);
	};

	response.putGrupoSLC = function (model) {
		return  $http.put(apiUrl+'api/GruposXPerfilSLC/'+model.id, model, config);
	};

	response.setGruposXPerfilSLC = function (model) {
		return  $http.post(apiUrl+'api/GruposXPerfilSLC/', model, config);
	};

	response.getGruposXPerfilSLCxId = function (pid) {
		return  $http.get(apiUrl+'api/GruposXPerfilSLC/'+pid, config);
	};
	
	response.getGruposXPerfilSLCxIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/GruposXPerfilSLC/'+pid+'/perspectiva/'+pprespectiva, config);
	};


	return response;
}