angular.module('PoundedYam.controllers', [])

    .controller('homeController', ['$scope', 'pydataservice', '$rootScope', function($scope, pydataservice, $rootScope) {

        // reset to no initial selected meal
        $rootScope.selectedIndex = -1;

        pydataservice.getMeals()
            .success(function (data) {
                if(!$scope.meals){
                    $scope.meals = data.meals;
                }
                var rdn = Math.floor(Math.random() * $scope.meals.length);
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
        }, 3000);

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

    .controller('listController', ['$scope', 'pydataservice', '$rootScope', 'anchorSmoothScroll', function($scope, pydataservice, $rootScope, anchorSmoothScroll) {

        pydataservice.getMeals()
            .success(function (data) {
                $scope.meals = data.meals;
            })
            .error(function (error) {
                $scope.status = 'Unable to load meals data: ' + error.message;
            });

        // preset with selected meal
        $scope.selectedIndex = $rootScope.selectedIndex;

        $scope.itemClicked = function(index, event) {

            var $thisLi = angular.element(event.target).parent('li'),
                curLiState = $thisLi.hasClass('show-buttons'),
                $allLi = $thisLi.parent().find('li');

            $allLi.removeClass('show-buttons');
            if(curLiState){
                $thisLi.removeClass('show-buttons');
            } else {
                $thisLi.addClass('show-buttons');

                var idOfElement = 'meal-id-'+index;
                anchorSmoothScroll.ngScrollTo(idOfElement);
            }

            // set new selected meal
            $rootScope.selectedIndex = index;

            $scope.shareThisMeal = function(){
                alert('Gonna share this meal now')
            };

            $scope.cookThisMeal = function(id){
                alert('Gonna cook this meal now: ' + id)
            };

            $scope.buyThisMeal = function(id){
                alert('Gonna buy this meal now: ' + id)
            };

        };
    }])


    .controller('detailController', ['$scope', 'pydataservice', '$rootScope', '$routeParams', function($scope, pydataservice, $rootScope, $routeParams) {

        $scope.id = $routeParams.id;

        pydataservice.getAMeal($scope.id)
            .success(function (data) {
                $scope.meal = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }])


    .controller('shopsController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
        $scope.id = $routeParams.id;





    }])


    .controller('navigationController', ['$scope', '$rootScope', '$location', '$element', function($scope,  $rootScope, $location, $element) {

        $scope.$watch(function() {
            return $rootScope.cssPage;
        }, function() {
            $scope.cssPage = $rootScope.cssPage;
            $element.removeAttr('class').addClass($scope.cssPage);
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

