function ChangeStateService($http, $location, $cookies) {

    var changeStateResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    changeStateResponse.GetComprado = function() {
        return $http.get(apiUrl + 'api/ApicoreCompraSeguro', config);
    };
    changeStateResponse.change = function(id, estado) {
        return $http.get(apiUrl + 'api/ApicoreCompraSeguro/' + id + "/Estado/" + estado, config);
    };
    /*
    	groupsResponse.getGrupoxId = function (id) {
    		return  $http.get(apiUrl+'api/Grupos/'+id, config);
    	};

    	//TODOS
    	groupsResponse.getGruposTodos = function (porigen, pprograma, psearch) {
    		return  $http.get(apiUrl+'api/Grupos/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
    	};

    	groupsResponse.deleteGrupo = function (model) {
    		return  $http.delete(apiUrl+'api/Grupos/'+model.id, config);
    	};
    	
    	groupsResponse.putGrupo = function (model) {
    		return  $http.put(apiUrl+'api/Grupos/'+model.id, model, config);
    	};

    	//SLC
    	groupsResponse.getGruposSLC = function (porigen, pprograma, psearch) {
    		return  $http.get(apiUrl+'api/GruposSLC/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
    	};

    	groupsResponse.deleteGrupoSLC = function (model, verb) {
    		return  $http.delete(apiUrl+'api/GruposSLC/'+verb+'/'+model.id, config);
    	};

    	groupsResponse.putGrupoSLC = function (model) {
    		return  $http.put(apiUrl+'api/GruposSLC/'+model.id, model, config);
    	};

    	groupsResponse.setGrupoSLC = function (model) {
    		return  $http.post(apiUrl+'api/GruposSLC/', model, config);
    	};

    	groupsResponse.getGrupoSLCxId = function (id) {
    		return  $http.get(apiUrl+'api/GruposSLC/'+id, config);
    	};
    */

    return changeStateResponse;
}