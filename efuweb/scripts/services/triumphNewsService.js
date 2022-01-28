function TriumphNewsService($http, $location, $cookies) {

    var triumphNewsResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    triumphNewsResponse.getArchivoProcesado = function(file) {
        return $http.get(apiUrl + 'api/AllianzCommission/ProcesadoCommission/' + file, config);
    };

    triumphNewsResponse.getFechaMaxima = function(file) {
        return $http.get(apiUrl + 'api/TrfNovedades/fechamax', config);
    };

    triumphNewsResponse.postTrfNovedad = function(dateFrom, dateTo) {
        return $http.get(apiUrl + 'api/TrfNovedades?desde=' + dateFrom + '&hasta=' + dateTo, config);
    };

    return triumphNewsResponse;
}