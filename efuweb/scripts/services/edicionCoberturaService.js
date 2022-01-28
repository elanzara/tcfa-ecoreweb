function EdicionCoberturaService($http, $location, $cookies) {

    var edicionCoberturaResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    edicionCoberturaResponse.getCompania = function(file) {
        return $http.get(apiUrl + 'api/AbmCobertura/compania/', config);
    };

    edicionCoberturaResponse.getCobertura = function(CompaniaID, CoberturaID) {
        return $http.get(apiUrl + 'api/AbmCobertura/ciacobertura/?CompaniaID=' + CompaniaID + '&CoberturaID=' + CoberturaID, config);
    };

    edicionCoberturaResponse.getUpdateCobertura = function(CompaniaID, CoberturaID, Detalle) {
        return $http.get(apiUrl + 'api/AbmCobertura/updatecobertura/?CompaniaID=' + CompaniaID + '&CoberturaID=' + CoberturaID + '&Detalle=' + Detalle, config);
    };


    // altaCoberturaResponse.PostScriMovimientos = function(taxId, dateFrom, dateTo, ProducerCode) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos?StartDate=' + dateFrom + '&EndDate=' + dateTo + '&taxId=' + taxId + '&ProducerCode=' + ProducerCode, config);
    // };

    // scriMovementsResponse.getTax = function(file) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos/tax', config);
    // };111

    // scriMovementsResponse.getCodigoProductor = function(file) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos/codigoproductor', config);
    // };

    return edicionCoberturaResponse;
}