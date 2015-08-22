angular.module('PoundedYam.controllers', [])

    .controller('homeController', ['$scope', 'pydataservice', '$rootScope', function($scope, pydataservice, $rootScope) {

        // reset to no initial selected meal
        $rootScope.selectedIndex = -1;

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

        $scope.goToDetail = function(){
            window.location = '#/cook/' + $scope.meal.id;
        };

        $scope.goToListPage = function(){
            window.location = '#/list/';
        };

        $scope.displayMeal = 0;
        pydataservice.getDeals()
            .success(function (data) {
                if(!$scope.deals){
                    $scope.deals = data.deals;
                }

                $scope.bannerCount = $scope.deals.length;
                $scope.changeBanner = function(){
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

        $scope.swiped = function(direction){
            console.log('Swiped ' + direction)
        }
    }])



    .controller('listController', ['$scope', 'pydataservice', '$rootScope', 'anchorSmoothScroll', '$cookies', function($scope, pydataservice, $rootScope, anchorSmoothScroll, $cookies) {

        // preset with selected meal
        $scope.selectedIndex = $rootScope.selectedIndex;

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

            // scroll to clicked item
            var idOfElement = 'meal-id-'+index;
            anchorSmoothScroll.ngScrollTo(idOfElement);

            // set new selected meal
            $rootScope.selectedIndex = index;

            // turn all other off, and this one on or off
            var curState = $scope.meals[index].state;
            for (var i = 0; i < $scope.meals.length; i++) {
                $scope.meals[i]['state'] = false;
            }
            $scope.meals[index].state = !curState;
        };


        $scope.shareThisMeal = function(){
            alert('Gonna share this meal now')
        };

        $scope.cookThisMeal = function(id){
            window.location = '#/cook/'+ id
        };

        $scope.buyThisMeal = function(id){
            window.location = '#/shop/'+ id
        };

        $scope.swiped = function(){
            history.back();
        }
    }])




    .controller('detailController', ['$scope', 'pydataservice', '$routeParams', function($scope, pydataservice, $routeParams) {

        $scope.id = $routeParams.id;

        pydataservice.getAMeal($scope.id)
            .success(function (data) {
                $scope.meal = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        $scope.swiped = function(){
            history.back();
        };

        $scope.isReady = false;
        $scope.setToReady = function(){
            $scope.isReady = true;
        };

        $scope.descriptionToShow = 'about';
        $scope.swapDesc = function(newDescription){
            $scope.descriptionToShow = newDescription;
        }
    }])




    .controller('shopsController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
        $scope.id = $routeParams.id;





        $scope.swiped = function(){
            history.back();
        }
    }])




    .controller('navigationController', ['$scope', '$rootScope', '$location', function($scope,  $rootScope, $location) {

        $scope.$watch(function() {
            return $rootScope.navCssClass;
        }, function() {
            $scope.navCssClass = $rootScope.navCssClass;
        });

        $scope.navigate = function(destination){
            if(window.location != destination){
               window.location = destination
            }
        };

        $scope.goBack = function(){
            window.history.back();
        }
    }]);

