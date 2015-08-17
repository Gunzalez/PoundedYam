angular.module('PoundedYam.controllers', [])

    .controller('homeController', function($scope, pydataservice, $rootScope) {

        // reset to no initial selected meal
        $rootScope.selectedIndex = -1;

        var rdn = Math.floor(Math.random() * 5);
        $scope.meal = pydataservice.getAMeal(rdn);

        $scope.goToDetail = function(){
            window.location = '#/cook/' + $scope.meal.id
        };

        $scope.ads = [
            { title: 'Shop 1', link: 'http://www.shop1.com', banner: 'ad/shop1.png' },
            { title: 'Shop 2', link: 'http://www.shop2.com', banner: 'ad/shop2.png' }
        ]
    })

    .controller('listController', function($scope, pydataservice, $rootScope) {

        $scope.meals = pydataservice.getMeals();

        // preset with selected meal
        $scope.selectedIndex = $rootScope.selectedIndex;

        $scope.itemClicked = function(index, event) {

            var $thisLi = angular.element(event.target).parent('li'),
                state = $thisLi.hasClass('show-buttons'),
                $allLi = $thisLi.parent().find('li');

            $allLi.removeClass('show-buttons');
            if(state){
                $thisLi.removeClass('show-buttons');
            } else {
                $thisLi.addClass('show-buttons');
            }

            // set new selected meal
            $rootScope.selectedIndex = index;

        };

    })

    .controller('detailController', function($scope, $routeParams) {
        $scope.id = $routeParams.id;

    })

    .controller('shopsController', function($scope, $routeParams) {
        $scope.id = $routeParams.id;

    })

    .controller('navigationController', function($scope) {
        $scope.navigate = function(destination){
            window.location = '#/' + destination
        }
    });

