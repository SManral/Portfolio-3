angular.module('myApp')
.controller('GradeCalcController', ['$scope','$http','$state', function($scope, $http, $state){

  class Assignment{
    constructor(name, percent){
      this.name = name;
      this.percent = percent;
      //this.ptsPossible = ptsPossible;
    }
  }


  class Category {
    constructor(title, weight) {
      this.title = title;
      this.weight = weight;
      this.assignments = []
    }



    addAssignment(name, percent){
      this.assignments.push(new Assignment(name, percent));
    }

    removeLastAssignment(){
      this.assignments = this.assignments.splice(0, this.assignments.length - 1);
    }
  }

  class Grade{
    constructor(letter, num){
      this.letter = letter;
      this.num = num;
    }
  }



  $scope.class = "";

  $scope.grades= [new Grade('A', 90)];

  $scope.grades.push(new Grade('B', 80));
  $scope.grades.push(new Grade('C', 70));
  $scope.grades.push(new Grade('D', 60));
  $scope.grades.push(new Grade('F', 50));

  $scope.categories =  [new Category("Test", 0)];
  $scope.categories.push(new Category("Quizzes", 0));
  $scope.categories.push(new Category("Homework", 0));

  $scope.finalWeight;

  // $scope.categories[0].addAssignment("Assignment", 50);
  // $scope.categories[0].addAssignment("Assignment", 60);
  // $scope.categories[0].addAssignment("Assignment", 70);

  function showOutcomes(){
    for(var i = 0; i < $scope.categories.length; i++){

    }
  }


  $scope.addCategory = function(){
    $scope.categories.push(new Category("", ""));
  }

  $scope.removeCategory = function(){
    $scope.categories = $scope.categories.splice(0, $scope.categories.length - 1);
  }

}]);
