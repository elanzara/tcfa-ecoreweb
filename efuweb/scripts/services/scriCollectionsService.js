function ScriCollectionsService($http, $location, $cookies) {

    var scriCollectionsResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    scriCollectionsResponse.getFechaMaxima = function(file) {
        return $http.get(apiUrl + 'api/ScriMovimientosCobranzas/fechamax', config);
    };

    scriCollectionsResponse.PostScriCobranzas = function(taxId, dateFrom, dateTo) {
        return $http.get(apiUrl + 'api/ScriMovimientosCobranzas?StartDate=' + dateFrom + '&EndDate=' + dateTo + '&taxId=' + taxId, config);
    };

    scriCollectionsResponse.getTax = function(file) {
        return $http.get(apiUrl + 'api/ScriMovimientosCobranzas/taxcobranzas', config);
    };

    // scriCollectionsResponse.getCodigoProductor = function(file) {
    //     return $http.get(apiUrl + 'api/ScriMovimientosCobranzas/codigoproductor', config);
    // };

    return scriCollectionsResponse;
}