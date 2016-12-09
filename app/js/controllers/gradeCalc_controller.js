angular.module('myApp')
.controller('GradeCalcController', ['$scope','$http','$state', function($scope, $http, $state){

  class Assignment{
    constructor(name, score, ptsPossible){
      this.name = name;
      this.score = score;
      this.ptsPossible = ptsPossible;
    }
  }


  class Category {
    constructor(title, weight) {
      this.title = title;
      this.weight = weight;
      this.assignments = []
    }

    addAssignment(name, score, ptsPossible){
      this.assignments.push(new Assignment(name, score, ptsPossible));
    }

    removeLastAssignment(){
      this.assignments = this.assignments.splice(0, this.assignments.length - 1);
    }
  }



  $scope.class = "";
  $scope.categories = [new Category("Homework", .75)];

  $scope.categories.push(new Category("Homework", .75));

  $scope.categories.push(new Category("Homework", .75));

  $scope.categories[0].addAssignment("Assignment", 50, 100);
  $scope.categories[0].addAssignment("Assignment", 60, 100);
  $scope.categories[0].addAssignment("Assignment", 70, 100);

 


}]);
