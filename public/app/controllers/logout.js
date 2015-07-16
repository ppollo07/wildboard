'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:LoginIndexCtrl
 * @description
 * # LoginIndexCtrl
 * Controller of the dashboardApp
 */

angular.module("dashboardApp")
  .controller('LogoutCtrl', function ($rootScope, $location, $scope, $auth, $state, $q, Authentication) {
    var ctrl = this;
    this.logout = function(){
      Authentication.logout().then(function(){
        $location.path('/login');
      });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
