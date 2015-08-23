angular.module('PoundedYam.services', [])

    .factory('pydataservice', ['$http', function($http) {

        var pyDataAPI = {},
            baseUrl = "data/";

        pyDataAPI.getMeals = function() {
            return $http.get( baseUrl + "meals.json");
        };

        pyDataAPI.getDeals = function() {
            return $http.get( baseUrl + "deals.json");
        };

        pyDataAPI.getAMeal = function(id) {
            return $http.get( baseUrl + "meal_"+ id +".json");
        };

        return pyDataAPI;
    }])

    .factory('navigatorService', ['$window', '$location', function (window, $location){

        //console.log(win)
        //console.log($location)

        var pydNavigator = {};
        pydNavigator.goToLocation = function(destination){
            if(window.location != destination){
                window.location = destination
            }
        };
        return pydNavigator;
    }])

    .service('anchorSmoothScroll', function(){

        this.ngScrollTo = function(idOfElement) {

            var startY = currentYPosition();
            var stopY = elmYPosition(idOfElement);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 22) speed = 22;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for ( var i=startY; i<stopY; i+=step ) {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for ( var i=startY; i>stopY; i-=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(idOfElement) {
                var elm = document.getElementById(idOfElement);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop - 70;
                } return y;
            }
        };
    });