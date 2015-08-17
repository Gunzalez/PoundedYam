angular.module('PoundedYam.services', []).
    factory('pydataservice', ['$http', function($http) {

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
            return $http.get("data/meals.json");
        };

        pyDataAPI.getAMeal = function(mealId) {
            //return $http.get("data/meal_"+ mealId +".json");

            return this.data[mealId]
        };

        return pyDataAPI;
}]);