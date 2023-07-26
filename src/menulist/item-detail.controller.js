
(function () {
'use strict';

angular.module('MenuApp', ['MenuDataService'])
.controller('MenuDetailController', MenuDetailController);

MenuDetailController.$inject = ['MenuDataService', '$scope' , 'categoryShortName' ];
function MenuDetailController(MenuDataService, $scope, categoryShortName) {
    var menu_detail = this;
    menu_detail.getItemsForCategory = function(categoryShortName) {
      obj = MenuDataService.getItemsForCategory(categoryShortName)
     // obj has keys category.name and obj.menu_items is a list 
     // each item in obj.menu_items has item.name and item.description and item.price_large
      return obj
    }
    
 
};

})();
            