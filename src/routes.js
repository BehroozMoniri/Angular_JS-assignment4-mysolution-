
(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
      // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/');
      // Set up UI states
    $stateProvider
    .state('itemDetail', {
      url: '/home',
      templateUrl: 'src/menulist/templates/mainMenu.html',
      controller: 'MenuListController as menu',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
  
      .state('itemDetail', {
        url: '/item-detail/{itemShortName}',
        templateUrl: 'src/menulist/templates/items-detail.html',
        controller: 'MenuDetailController as menuDetail',
        resolve: {
          item: ['$stateParams', 'MenuDataService',
                function ($stateParams, MenuDataService) {
                    console.log("$stateParams",$stateParams)
                  return MenuDataService.getItemsForCategory($stateParams.category)
                    .then(function (Response) {
                      return Response ;
                    });
                }]
        }
      });
  }

})();
