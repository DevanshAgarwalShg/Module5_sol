(function () {
    'use strict';

    angular.module('MenuApp', ['ui.router'])
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/',
            template: '<h2 class="text-center">Welcome to our Restaurant</h2>'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categories.template.html',
            controller: 'CategoriesController as catCtrl',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'src/templates/items.template.html',
            controller: 'ItemsController as itemsCtrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }
})();
