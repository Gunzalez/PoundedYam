var poundedYam = angular.module('PoundedYam', [
    'PoundedYam.controllers',
    'ngRoute'
]);

poundedYam.config(['$routeProvider',
    function($routeProvider) {$routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeController'
        })
        .when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'listController'
        })
        .when('/cook/:recipeId', {
            templateUrl: 'partials/detail.html',
            controller: 'detailController'
        })
        .when('/shop/:recipeId', {
            templateUrl: 'partials/shops.html',
            controller: 'shopsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);