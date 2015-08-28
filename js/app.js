var poundedYam = angular.module('PoundedYam', [
    'PoundedYam.controllers',
    'PoundedYam.services',
    'ngRoute',
    'ngTouch',
    'angular-carousel'
]);


// Routing
poundedYam.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeController'
        })
        .when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'listController'
        })
        .when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'aboutController'
        })
        .when('/how', {
            templateUrl: 'partials/how.html',
            controller: 'howController'
        })
        .when('/cook/:id', {
            templateUrl: 'partials/detail.html',
            controller: 'detailController'
        })
        .when('/shop/:id', {
            templateUrl: 'partials/shops.html',
            controller: 'shopsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);



// Directives
poundedYam.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')'
        });
    };
});

poundedYam.directive('getHeight', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var offSet = attrs.getHeight,
                height = window.innerHeight - offSet;
            element.css({
                'height': height + 'px'
            });
        }
    };
});

poundedYam.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});




poundedYam.filter('convertState', function ($sce) {
    return function (state) {
        //if (state == 1) {
        //    return $sce.trustAsHtml("<strong>" + state + "</strong> special state");
        //}
        //else {
        //    return $sce.trustAsHtml("<strong>"+state + "</strong> normal state");
        //}
        return $sce.trustAsHtml(state);
    }
});




