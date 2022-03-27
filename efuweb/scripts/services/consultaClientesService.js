function ConsultaClientesService($http, $location, $cookies) {

    var consultaClientesResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    // reporteCoberturaResponse.getCompania = function(file) {
    //     return $http.get(apiUrl + 'api/AbmCobertura/compania/', config);
    // };

    // reporteCoberturaResponse.getReporte = function(CompaniaID, Estado) {
    //     return $http.get(apiUrl + 'api/AbmCobertura/reportecobertura/?CompaniaID=' + CompaniaID + '&Estado=' + Estado, config);
    // };


    // altaCoberturaResponse.PostScriMovimientos = function(taxId, dateFrom, dateTo, ProducerCode) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos?StartDate=' + dateFrom + '&EndDate=' + dateTo + '&taxId=' + taxId + '&ProducerCode=' + ProducerCode, config);
    // };

    // scriMovementsResponse.getTax = function(file) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos/tax', config);
    // };

    // scriMovementsResponse.getCodigoProductor = function(file) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos/codigoproductor', config);
    // };

    return consultaClientesResponse;
}