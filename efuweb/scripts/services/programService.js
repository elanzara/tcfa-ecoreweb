function ProgramService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.getPrograms = function () {
		return  $http.get(apiUrl+'api/Programas/', config);
	};

	response.getProgram = function (id) {
		return  $http.get(apiUrl+'api/Programas/'+id, config);
	};

	//TODOS
	response.getProgramsTodos = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/Programas/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deletePrograms = function (model) {
		return  $http.delete(apiUrl+'api/Programas/'+model.id, config);
	};
	
	response.putPrograms = function (model) {
		return  $http.put(apiUrl+'api/Programas/'+model.id, model, config);
	};

	//SLC
	response.getProgramsSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ProgramasSLC/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteProgramSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/ProgramasSLC/'+verb+'/'+model.id, config);
	};

	response.putProgramSLC = function (model) {
		return  $http.put(apiUrl+'api/ProgramasSLC/'+model.id, model, config);
	};

	response.setProgramSLC = function (model) {
		return  $http.post(apiUrl+'api/ProgramasSLC/', model, config);
	};

	response.getProgramSLC = function (id) {
		return  $http.get(apiUrl+'api/ProgramasSLC/'+id, config);
	};


	return response;
}  