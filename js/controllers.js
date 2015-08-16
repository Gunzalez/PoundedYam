angular.module('PoundedYam.controllers', [])

    .controller('homeController', function($scope) {
        $scope.hero = {
            src: "meals/rice-and-beans-recipe.png",
            alt: "Beans and Fish"
        };
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

    .controller('listController', function($scope) {

        $scope.changeMode = function(){
            console.log(this)
        };

        $scope.selectedIndex = 0; // Whatever the default selected index is, use -1 for no selection

        $scope.itemClicked = function ($index) {
            $scope.selectedIndex = $index;
        };

        $scope.meals = [
            {
                id: "12",
                name: "Pounded Yam and Egusi stew",
                thumb: "meals/pounded-yam-and-egusi.png"
            },
            {
                id: "22",
                name: "Beans and Fish",
                thumb: "meals/rice-and-beans-recipe.png"
            },
            {
                id: "3",
                name: "Jollof rice and plantain",
                thumb: "meals/jollof-rice-and-plantian.png"
            },
            {
                id: "4",
                name: "Goat pepper Soup",
                thumb: "meals/goat-pepper-soup.png"
            },
            {
                id: "55",
                name: "Eba and Okra Soup",
                thumb: "meals/eba-okra-stew.png"
            }
        ];
    });

