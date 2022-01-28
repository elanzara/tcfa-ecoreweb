function AltaCoberturaService($http, $location, $cookies) {

    var altaCoberturaResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    altaCoberturaResponse.getCompania = function(file) {
        return $http.get(apiUrl + 'api/AbmCobertura/compania/', config);
    };

    altaCoberturaResponse.getFamilia = function(file) {
        return $http.get(apiUrl + 'api/AbmCobertura/familia/', config);
    };

    // altaCoberturaResponse.getValidCobertura = function(CompaniaID, CoberturaID) {
    //     return $http.get(apiUrl + 'api/AbmCobertura/ciacobertura/?CompaniaID=' + CompaniaID + '&CoberturaID=' + CoberturaID, config);
    // };

    altaCoberturaResponse.getValidFamilia = function(CompaniaID, CoberturaID) {
        return $http.get(apiUrl + 'api/AbmCobertura/ciafamilia/?CompaniaID=' + CompaniaID + '&CoberturaID=' + CoberturaID, config);
    };

    altaCoberturaResponse.getValidSomDetalleCobertura = function(CompaniaID, CoberturaID) {
        return $http.get(apiUrl + 'api/AbmCobertura/somdetallecobertura/?CompaniaID=' + CompaniaID + '&CoberturaID=' + CoberturaID, config);
    };

    altaCoberturaResponse.getAltaCobertura = function(CompaniaID, CoberturaID, familiaId, activo, acepta, telesales, detalle) {
        return $http.get(apiUrl + 'api/AbmCobertura/altacobertura/?CompaniaID=' + CompaniaID + '&CoberturaID=' + CoberturaID + '&familiaId=' + familiaId + '&activo=' + activo + '&acepta=' + acepta + '&telesales=' + telesales + '&detalle=' + detalle, config);
    };

    // altaCoberturaResponse.PostScriMovimientos = function(taxId, dateFrom, dateTo, ProducerCode) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos?StartDate=' + dateFrom + '&EndDate=' + dateTo + '&taxId=' + taxId + '&ProducerCode=' + ProducerCode, config);
    // };

    // scriMovementsResponse.getTax = function(file) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos/tax', config);
    // };

    // scriMovementsResponse.getCodigoProductor = function(file) {
    //     return $http.get(apiUrl + 'api/ScriMovimientos/codigoproductor', config);
    // };

    return altaCoberturaResponse;
}