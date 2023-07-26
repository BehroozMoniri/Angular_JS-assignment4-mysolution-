(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('MenuList', {
      templateUrl: 'src/menulist/templates/items-detail.html',
      bindings: {
        items: '<'
      }
    });
    
    })();
    
    