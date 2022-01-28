function ScriMovementsService($http, $location, $cookies) {

    var scriMovementsResponse = {};

    var config = {
        headers: { 'Authorization': $cookies.getObject('token') }
    };

    scriMovementsResponse.getFechaMaxima = function(file) {
        return $http.get(apiUrl + 'api/ScriMovimientos/fechamax', config);
    };

    scriMovementsResponse.PostScriMovimientos = function(taxId, dateFrom, dateTo, ProducerCode) {
        return $http.get(apiUrl + 'api/ScriMovimientos?StartDate=' + dateFrom + '&EndDate=' + dateTo + '&taxId=' + taxId + '&ProducerCode=' + ProducerCode, config);
    };

    scriMovementsResponse.getTax = function(file) {
        return $http.get(apiUrl + 'api/ScriMovimientos/tax', config);
    };

    scriMovementsResponse.getCodigoProductor = function(file) {
        return $http.get(apiUrl + 'api/ScriMovimientos/codigoproductor', config);
    };

    return scriMovementsResponse;
}