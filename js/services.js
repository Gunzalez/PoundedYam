angular.module('PoundedYam.services', []).
    factory('pydataservice', ['$http', function($http) {

        var pyDataAPI = {},
            baseUrl = "data/";

        pyDataAPI.getMeals = function() {
            return $http.get( baseUrl + "meals.json");
        };

        pyDataAPI.getAMeal = function(id) {
            return $http.get( baseUrl + "meal_"+ id +".json");
        };

        return pyDataAPI;
}]);