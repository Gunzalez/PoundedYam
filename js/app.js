var poundedYam = angular.module('PoundedYam', [
    'PoundedYam.controllers',
    'PoundedYam.services',
    'ngRoute',
    'ngTouch',
    'ngCookies',
    'ngSanitize'
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



// Global scope variables
poundedYam.run(function($rootScope, $location, $cookies, $anchorScroll, $window) {


    // hack to scroll to top when navigating to new URLS but not back/forward
    var wrap = function(method) {
        var orig = $window.window.history[method];
        $window.window.history[method] = function() {
            var retVal = orig.apply(this, Array.prototype.slice.call(arguments));
            $anchorScroll();
            return retVal;
            console.log('Working')
        };
    };
    wrap('pushState');
    wrap('replaceState');

    //Cookie business
    //if($cookies.get('PoundedYamSelectedMealIndex')) {
    //    $rootScope.selectedIndex = $cookies.get('PoundedYamSelectedMealIndex');
    //} else {
    //    $rootScope.selectedIndex = -1;
    //}

    // Orientation watch and menu pop out
    //document.addEventListener("click", function(e) {
    //    $rootScope.$broadcast("documentClicked", e.target);
    //});

    //document.addEventListener("click", function(e) {
    //    if (e.keyCode === 27)
    //        console.log('Root scope change')
    //});


    // initial selected meal set to none
    $rootScope.selectedIndex = -1;
    $rootScope.navCssClass = '';
    $rootScope.detailMealPath = '';

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        var nextTemplate = next.templateUrl;

        switch(nextTemplate){
            case 'partials/home.html':
                $rootScope.navCssClass = 'home';
                break;
            case 'partials/list.html':
                $rootScope.navCssClass = 'list';
                break;
            case 'partials/detail.html':
                $rootScope.navCssClass = 'detail';
                $rootScope.detailMealPath = $location.path();
                break;
            case 'partials/shops.html':
                $rootScope.navCssClass = 'shops';
                break;
            default :
                // do nothing
        }
    });

});


