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
    constructor(title, weight, num) {
      this.title = title;
      this.weight = weight;
      //which category so we can properly track the value for each assignment
      this.num = num;
      this.assignments = []
    }

    getPercent(){
      //if no assignments
      if(this.assignments.length <= 0){
        return 0;
      }

      var catPer = 0;
      var numAssignments = this.assignments.length
      for(var i = 0; i < numAssignments; i++){
        catPer += parseInt(this.assignments[i].percent) / 100;
      }
      catPer /= numAssignments;
      catPer *= this.weight;
      //console.log(catPer);
      return catPer;

      //Example if the weight is 50 and the assignment percentages are 50, 60, 70
      //we will 50 * 0.60 = 30 or the amount of points the student earned in this category
    }

    addAssignment(name, percent){
      this.assignments.push(new Assignment(name, percent));
      var lastAssignment = this.assignments.length - 1;

      $scope.$watch('categories['+this.num+'].assignments['+lastAssignment+'].percent',
        function(){
          console.log("updating assignment");
          //update Assignments
          calcGrades();
        }
      );

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



  //$scope.class = "";

  //Grades
  $scope.grades= [new Grade('A', 90)];
  $scope.grades.push(new Grade('B', 80));
  $scope.grades.push(new Grade('C', 70));
  $scope.grades.push(new Grade('D', 60));
  $scope.grades.push(new Grade('F', 50));

  //categories
  $scope.categories =  [new Category("Test", 0, 0)];
  $scope.categories.push(new Category("Quizzes", 0, 1));
  $scope.categories.push(new Category("Homework", 0, 2));
  setUpCategories();


  //final and statistics vals
  $scope.finalPtsPossible = 0;
  $scope.finalWeight = 0;
  $scope.totalWeight = 0;

  $scope.currentGrade = 0;
  $scope.currentGradeWithoutFinal = 0;
  $scope.pointsNeededForA = 0;
  $scope.pointsNeededForB = 0;
  $scope.pointsNeededForC = 0;
  $scope.pointsNeededForD = 0;


  $scope.$watch('finalWeight',
  function (newVal, oldVal) {
    // console.log("finalWeight changed");
    // console.log(oldVal);
    // console.log(newVal);
    $scope.totalWeight = weightsCorrect();
  });


  // $scope.categories[0].addAssignment("Assignment", 50);
  // $scope.categories[0].addAssignment("Assignment", 60);
  // $scope.categories[0].addAssignment("Assignment", 70);

  function calcGrades(){
    var curGrade = 0;
    for(var i = 0; i < $scope.categories.length; i++){
        curGrade += ($scope.categories[i].getPercent());
    }

    $scope.currentGrade = curGrade;
    $scope.currentGradeWithoutFinal = (curGrade / (100 - $scope.finalWeight)) * 100;

    // console.log(curGrade);
    // console.log((curGrade / (100 - $scope.finalWeight)) * 100);

    //points or percent
    var percentForA = (90 - $scope.currentGradeWithoutFinal) / finalWeight
    $scope.pointsNeededForA = Math.ciel(percentForA * $scope.finalPtsPossible);
    console.log("per for A " + percentForA + " points for A ");

  }



  $scope.addCategory = function(){
    var last = $scope.categories.length - 1
    $scope.categories.push(new Category("", "", last));
    $scope.$watch('categories['+last+'].weight',
      function(){
        console.log("NEW cat changed");
        $scope.totalWeight = weightsCorrect();
      }
    );

    $scope.$watch('categories['+last+'].assignments',
      function(){
        console.log("new Assignment added");
        $scope.totalWeight = weightsCorrect();
      }
    );
  }

  $scope.removeCategory = function(){
    $scope.categories = $scope.categories.splice(0, $scope.categories.length - 1);
  }

  function setUpCategories(){
    for(var i = 0; i < $scope.categories.length; i++){
      $scope.$watch('categories['+i+'].weight',
        function(){
          console.log("NEW cat changed");
          $scope.totalWeight = weightsCorrect();
        }
      );
    }
  }

  //utility functions
  function weightsCorrect(){
    var weights = parseInt($scope.finalWeight);
    for(var i = 0; i < $scope.categories.length; i++){
      if($scope.categories[i].weight.length > 0 ){
        weights += parseInt($scope.categories[i].weight);
      }
    }

    //console.log(weights);
    calcGrades()
    return weights;

  }

}]);
