angular.module('myApp')
.controller('GradeCalcController', ['$scope','$http','$state', function($scope, $http, $state){

  $scope.class = "";
  $scope.categories = [];

  function Category(title, weight){
    this.title = title;
    this.weight = weight;
  }

}]);
