angular.module('PoundedYam.controllers', [])

    .controller('homeController', function($scope) {
        $scope.hero = {
            src: "hero.jpg",
            alt: "Pounded Yam"
        };
        $scope.ads = [
            { name: 'Shop 1', link: 'http://www.shop1.com', banner: '/img/ad/shop1.png' },
            { name: 'Shop 2', link: 'http://www.shop2.com', banner: '/img/ad/shop2.png' }
        ]
    })

    .controller('listController', function($scope) {
        $scope.meals = [
            {
                id: "1",
                name: "Pounded Yam"
            },
            {
                id: "2",
                name: "Beans"
            },
            {
                id: "3",
                name: "Plantain"
            },
            {
                id: "4",
                name: "Pepper Soup"
            },
            {
                id: "5",
                name: "Okra Soup"
            }
        ];
    });