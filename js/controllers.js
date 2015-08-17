angular.module('PoundedYam.controllers', [])

    .controller('homeController', function($scope, poundedYamDataService) {

        var rdn = Math.floor(Math.random() * 5);
        $scope.meal = poundedYamDataService.getAMeal(rdn);
        $scope.ads = [
            { title: 'Shop 1', link: 'http://www.shop1.com', banner: 'ad/shop1.png' },
            { title: 'Shop 2', link: 'http://www.shop2.com', banner: 'ad/shop2.png' }
        ]
    })

    .controller('detailController', function($scope, $routeParams) {
        $scope.id = $routeParams.mealId;


    })

    .controller('navigationController', function($scope) {
        $scope.navigate = function(destination){
            window.location = '#/' + destination
        }


    })

    .controller('shopsController', function($scope, $routeParams) {
        $scope.id = $routeParams.mealId;

    })

    .controller('listController', function($scope, poundedYamDataService) {

        $scope.itemClicked = function ($index) {

            var $el = angular.element(this);
            console.log($el);
            console.log(this);

            if($el.hasClass('show-button')){
                $el.removeClass('show-button');
            } else {
                $el.addClass('show-button');
            }
        };

        $scope.meals = poundedYamDataService.getMeals();
    });

