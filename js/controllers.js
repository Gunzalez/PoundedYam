angular.module('PoundedYam.controllers', [])

    .controller('homeController', ['$scope', 'navigatorService', 'pydataservice', function($scope, navigatorService, pydataservice) {

        $scope.$emit('controllerLoaded', {
            controller: 'featured'
        });

        pydataservice.getMeals()
            .success(function (data) {
                if(!$scope.meals){
                    $scope.meals = data.meals;
                }
                $scope.mealCount = $scope.meals.length;
                var rdn = Math.floor(Math.random() * $scope.mealCount);
                $scope.meal = $scope.meals[rdn];
            })
            .error(function (error) {
                $scope.status = 'Unable to load meals data: ' + error.message;
            });

        $scope.displayMeal = 0;
        $scope.blueBanner = false;
        pydataservice.getDeals()
            .success(function (data) {
                if(!$scope.deals){
                    $scope.deals = data.deals;
                }

                $scope.bannerCount = $scope.deals.length;
                $scope.changeBanner = function(){
                    $scope.blueBanner = !$scope.blueBanner;
                    $scope.displayMeal = $scope.displayMeal + 1;
                    if($scope.displayMeal >= $scope.bannerCount){
                        $scope.displayMeal = 0;
                    }
                };
            })
            .error(function (error) {
                $scope.status = 'Unable to load deals data: ' + error.message;
            });

        var timer = setInterval(function(){
            $scope.changeBanner();
            $scope.$apply();
        }, 6000);

        $scope.bannerBtnClicked = function(){
            if(timer){
                clearTimeout(timer);
            }
            $scope.changeBanner();
        };
    }])



    .controller('listController', ['$scope', 'anchorSmoothScroll', 'navigatorService', 'pydataservice',  function($scope, anchorSmoothScroll, navigatorService, pydataservice) {

        $scope.$emit('controllerLoaded', {
            controller: 'list'
        });

        // preset with selected meal
        $scope.selectedIndex = -1;

        pydataservice.getMeals()
            .success(function (data) {
                $scope.meals = data.meals;
                for (var i = 0; i < $scope.meals.length; i++) {
                    $scope.meals[i]['state'] = false;
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to load meals data: ' + error.message;
            });

        $scope.showButtons = function(index){

            // set new selected meal
            $scope.selectedIndex = index;

            // turn all others off, and this one on or off
            var curState = $scope.meals[index].state;
            for (var i = 0; i < $scope.meals.length; i++) {
                if($scope.selectedIndex == i){
                    $scope.meals[index].state = !curState;
                    if($scope.meals[index].state){
                        // scroll to clicked item
                        var idOfElement = 'meal-id-'+index;
                        anchorSmoothScroll.ngScrollTo(idOfElement);
                    }
                } else {
                    $scope.meals[i]['state'] = false;
                }
            }
        };

        $scope.shareThisMeal = function(){
            alert('Gonna share this meal now')
        };
    }])



    .controller('detailController', ['$scope', '$routeParams', 'pydataservice', function($scope, $routeParams, pydataservice) {

        window.scroll(0,0);

        $scope.$emit('controllerLoaded', {
            controller: 'detail'
        });

        $scope.id = $routeParams.id;

        $scope.meal = {};
        pydataservice.getAMeal($scope.id)
            .success(function (data) {
                $scope.meal = data;
                $scope.scrollHeight = (window.innerHeight - 184); // Yes, I know this is dirty
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        $scope.isReady = false;
        $scope.setToReady = function(){
            $scope.isReady = true;
        };

        $scope.descriptionToShow = 'about';
        $scope.swapDesc = function(newDescription){
            $scope.descriptionToShow = newDescription;
            $scope.scrollHeight = window.innerHeight - 184;
        }
    }])



    .controller('shopsController', ['$scope', '$routeParams', 'pydataservice', function($scope, $routeParams, pydataservice) {

        $scope.$emit('controllerLoaded', {
            controller: 'shops'
        });

        $scope.id = $routeParams.id;

        $scope.meal = {};
        pydataservice.getAMeal($scope.id)
            .success(function (data) {
                $scope.meal = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }])




    .controller('howController', ['$scope', function($scope) {

        $scope.$emit('controllerLoaded', {
            controller: 'how'
        });
    }])



    .controller('aboutController', ['$scope', function($scope) {

        $scope.$emit('controllerLoaded', {
            controller: 'about'
        });
    }])



    .controller('MasterController', ['$scope', 'navigatorService', function($scope,  navigatorService) {

        $scope.$on('controllerLoaded', function(event, args){
            $scope.curPage = args.controller
        });

        $scope.navigate = function(destination){
            navigatorService.goToLocation(destination);
        };

        $scope.swiped = function(direction){
            if(direction == 'right'){
                window.history.back();
            } else {
                window.history.forward();
            }
        };
    }]);

