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

  $scope.percentNeededForA = 0;
  $scope.percentNeededForB = 0;
  $scope.percentNeededForC = 0;

  for (var i = 0; i < $scope.grades.length; i++){
    $scope.$watch('grades['+i+'].num',
      function(){
        //console.log(newVal + " hello");
        $scope.totalWeight = weightsCorrect();
      }
    );
  }

  $scope.$watch('finalWeight',
  function (newVal, oldVal) {
    // console.log("finalWeight changed");
    // console.log(oldVal);
    // console.log(newVal);
    $scope.totalWeight = weightsCorrect();
  });

  $scope.$watch('finalPtsPossible',
  function () {
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

    curGrade = parseInt(curGrade);
    $scope.currentGrade = curGrade;
    $scope.currentGradeWithoutFinal = (curGrade / (100 - ($scope.finalWeight))) * 100;
    console.log("current grade:" + curGrade + " grade without final " + $scope.currentGradeWithoutFinal);

    // console.log(curGrade);
    // console.log((curGrade / (100 - $scope.finalWeight)) * 100);

    //points or percent
    var temp =  ($scope.grades[0].num - $scope.currentGrade);
    var percentForA = ($scope.grades[0].num - $scope.currentGrade) / $scope.finalWeight;
    $scope.percentNeededForA = percentForA * 100;
    $scope.pointsNeededForA = Math.ceil(percentForA * $scope.finalPtsPossible);
    console.log("temp: "+temp+" percent for A " + percentForA * 100 + " points for A " + $scope.pointsNeededForA);

    var percentForB = ($scope.grades[1].num - $scope.currentGrade) / $scope.finalWeight;
    $scope.percentNeededForB = percentForB * 100;
    $scope.pointsNeededForB = Math.ceil(percentForA * $scope.finalPtsPossible);
    console.log("temp: "+temp+" percent for B " + percentForB * 100 + " points for B " + $scope.pointsNeededForB);

    var percentForC = ($scope.grades[2].num - $scope.currentGrade) / $scope.finalWeight;
    $scope.percentNeededForC = percentForC * 100;
    $scope.pointsNeededForC = Math.ceil(percentForC * $scope.finalPtsPossible);
    console.log("temp: "+temp+" percent for C " + percentForC * 100 + " points for C " + $scope.pointsNeededForC);

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
