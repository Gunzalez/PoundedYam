angular.module('poundedYamControllers', [])

    .controller('HomeController', ['$scope', 'navigatorService', 'pydataservice', function($scope, navigatorService, pydataservice) {

        $scope.$emit('controllerLoaded', {
            controller: 'featured'
        });

        $scope.featured = [];

        pydataservice.getMeals()
            .success(function (data) {
                if(!$scope.meals){
                    $scope.meals = data.meals;
                }
                //$scope.mealCount = $scope.meals.length;
                //var rdn = Math.floor(Math.random() * $scope.mealCount);
                //$scope.meal = $scope.meals[rdn];

                // TODO shuffle array before display
                for (var i = 0; i < $scope.meals.length; i++) {
                    if($scope.meals[i].featured){
                        $scope.featured.push($scope.meals[i])
                    }
                }

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
                        $scope.easterEgg = true;
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
        }, 7000);

        $scope.bannerBtnClicked = function(){
            if(timer){
                clearTimeout(timer);
            }
            $scope.changeBanner();
        };

        //$scope.easterEgg = false;
        //var egg = setTimeout(function(){
        //    $scope.easterEgg = true;
        //    clearTimeout(egg);
        //}, 30000);
    }])



    .controller('ListController', ['$scope', 'anchorSmoothScroll', 'navigatorService', 'pydataservice',  function($scope, anchorSmoothScroll, navigatorService, pydataservice) {

        $scope.$emit('controllerLoaded', {
            controller: 'list'
        });

        $scope.hasLocalStorage = false;
        if(localStorage){
            $scope.hasLocalStorage  = true;

            var favourites = localStorage.getItem("favourites");
            if(favourites){
                var favArr = favourites.split(",");
            }
        }

        // preset with selected meal
        $scope.selectedIndex = -1;

        pydataservice.getMeals()
            .success(function (data) {
                $scope.meals = data.meals;
                for (var i = 0; i < $scope.meals.length; i++) {
                    $scope.meals[i].state = false;

                    if(favourites){
                        var arrayPos = favArr.indexOf($scope.meals[i].id);
                        if(arrayPos == -1){
                            $scope.meals[i].favourite = false
                        } else {
                            $scope.meals[i].favourite = true
                        }
                    }
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

        $scope.favouriteClicked = function($event, $index, id){

            if(localStorage){
                var favourites = localStorage.getItem("favourites");
                if(favourites){
                    var favArr = favourites.split(","),
                        arrayPos = favArr.indexOf(id);

                    if(arrayPos == -1){
                        favArr.push(id);
                        localStorage.setItem("favourites", favArr.join(','));
                        $scope.meals[$index].favourite = true
                    } else {
                        favArr.splice(arrayPos, 1);
                        localStorage.setItem("favourites", favArr.join(','));
                        $scope.meals[$index].favourite = false
                    }
                } else {
                    localStorage.setItem("favourites", id);
                    $scope.meals[$index].favourite = true
                }
            }
            $event.stopPropagation();
        }
    }])



    .controller('DetailController', ['$scope', '$routeParams', 'pydataservice', function($scope, $routeParams, pydataservice) {

        $scope.$emit('controllerLoaded', {
            controller: 'detail'
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

        $scope.isReady = false;
        $scope.setToReady = function(){
            $scope.isReady = true;
        };

        $scope.descriptionToShow = 'about';
        $scope.swapDesc = function(newDescription){
            $scope.descriptionToShow = newDescription;
        }
    }])



    .controller('ShopsController', ['$scope', '$routeParams', 'pydataservice', function($scope, $routeParams, pydataservice) {

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




    .controller('HowController', ['$scope', function($scope) {

        $scope.$emit('controllerLoaded', {
            controller: 'how'
        });
    }])



    .controller('AboutController', ['$scope', function($scope) {

        $scope.$emit('controllerLoaded', {
            controller: 'about'
        });
    }])



    .controller('MasterController', ['$scope', 'navigatorService', '$window', function($scope,  navigatorService, $window) {

        $scope.$on('controllerLoaded', function(event, args){
            $scope.curPage = args.controller;
            window.scroll(0,0);
        });

        $scope.navigate = function(destination){
            navigatorService.goToLocation(destination);
        };

        $scope.swiped = function(direction){
            if(direction == 'right'){
                //window.history.back();
            } else {
                //window.history.forward();
            }
        };

    }]);

