(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/questions";
        var service = {};

        service.GetUserId = GetUserId;
        service.GetAll = GetAll;
        service.Create = Create;
        service.Delete = Delete;
        
        return service;

        function GetUserId() {
            // get userId token from server
            return $.get('/app/userId');
        }

        function GetAll(userId) {
            return $http.get(apiURL + '/list/' + userId).then(handleSuccess, handleError);
        }

        function Create(newQuestion) {
            return $http.post(apiURL, newQuestion).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
        
    }

})();
