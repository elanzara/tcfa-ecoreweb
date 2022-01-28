function MapfreNewsService($http, $location, $cookies) {

    var mapfreNewsResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    mapfreNewsResponse.getArchivoProcesado = function(file) {
        return $http.get(apiUrl + 'api/AllianzCommission/ProcesadoCommission/' + file, config);
    };

    mapfreNewsResponse.getFechaMaxima = function(file) {
        return $http.get(apiUrl + 'api/MapNovedades/fechamax', config);
    };

    mapfreNewsResponse.postMapNovedad = function(dateFrom, dateTo) {
        return $http.get(apiUrl + 'api/MapNovedades?desde=' + dateFrom + '&hasta=' + dateTo, config);
    };

    return mapfreNewsResponse;
}