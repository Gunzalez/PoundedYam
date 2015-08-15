angular.module('PoundedYam.controllers', [])

    .controller('homeController', function($scope) {
        $scope.hero = {
            src: "hero.jpg",
            alt: "Pounded Yam"
        };
        $scope.ads = [
            { title: 'Shop 1', link: 'http://www.shop1.com', banner: '/img/ad/shop1.png' },
            { title: 'Shop 2', link: 'http://www.shop2.com', banner: '/img/ad/shop2.png' }
        ]
    })

    .controller('detailController', function($scope, $routeParams) {
        $scope.id = $routeParams.recipeId;


    })

    .controller('shopsController', function($scope, $routeParams) {
        $scope.id = $routeParams.recipeId;

    })

    .controller('listController', function($scope) {
        $scope.recipes = [
            {
                id: "12",
                name: "Pounded Yam",
                thumb: "/img/meals/meal-pounded-yam.png"
            },
            {
                id: "22",
                name: "Beans",
                thumb: "/img/meals/meal-beans.png"
            },
            {
                id: "3",
                name: "Plantain",
                thumb: "/img/meals/meal-plantain.png"
            },
            {
                id: "4",
                name: "Pepper Soup",
                thumb: "/img/meals/meal-pepper-soup.png"
            },
            {
                id: "55",
                name: "Okra Soup",
                thumb: "/img/meals/meal-okra-soup.png"
            }
        ];
    });

