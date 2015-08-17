var poundedYam = angular.module('PoundedYam', [
    'PoundedYam.controllers',
    'PoundedYam.services',
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
        .when('/cook/:mealId', {
            templateUrl: 'partials/detail.html',
            controller: 'detailController'
        })
        .when('/shop/:mealId', {
            templateUrl: 'partials/shops.html',
            controller: 'shopsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

poundedYam.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background': 'url(' + url +') center center no-repeat',
            'background-size' : 'cover'
        });
    };
});


poundedYam.run(function($rootScope) {
    document.addEventListener("click", function(e) {
        if (e.keyCode === 27)
            console.log('Root scope change')
    });

    //document.addEventListener("click", function(e) {
    //    $rootScope.$broadcast("documentClicked", e.target);
    //});
});