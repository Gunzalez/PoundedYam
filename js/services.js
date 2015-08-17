angular.module('PoundedYam.services', []).
    factory('pydataservice', function($http) {

        var pyDataAPI = {
            data : [
                {
                    id: "12",
                    title: "Pounded Yam and Egusi stew",
                    thumb: "meals/pounded-yam-and-egusi.png"
                },
                {
                    id: "22",
                    title: "Beans and Fish",
                    thumb: "meals/rice-and-beans-recipe.png"
                },
                {
                    id: "3",
                    title: "Jollof rice and plantain",
                    thumb: "meals/jollof-rice-and-plantian.png"
                },
                {
                    id: "4",
                    title: "Goat pepper Soup",
                    thumb: "meals/goat-pepper-soup.png"
                },
                {
                    id: "55",
                    title: "Eba and Okra Soup",
                    thumb: "meals/eba-okra-stew.png"
                }
            ]
        };

        pyDataAPI.getMeals = function() {

            //return $http({
            //    method: 'JSONP',
            //    url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
            //});

            return this.data;
        };

        pyDataAPI.getAMeal = function(mealId) {

            var meals = this.data;
            return meals[mealId];
        };

        return pyDataAPI;
    });