angular.module('myApp')
.controller('FlashcardsController', ['$scope','$http','$state', function($scope, $http, $state){
$scope.getAll = function () {

$scope.data = {  "Name": "New",
"Item": [
{ "Question": "What is mongo ?", "Answer": "it is something" },
{ "Question": "what is mean stack?", "Answer": "it is also something" },
]};

$scope.$watch('$scope.data', function () {
            $scope.loadFlashCard($scope.data);
            $scope.loadSideBar($scope.data);
        });
}
$scope.getAll();
$scope.loadFlashCard = function (data) {
        $scope.flashCard = data.title;
        $scope.questions = data.Item;
        $scope.totalItems = $scope.questions.length;
        $scope.itemsPerPage = 1;
        $scope.currentPage = 1;
        $scope.mode = 'flashcard';
        $scope.$watch('currentPage + itemsPerPage', function () 
        {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
        end = begin + $scope.itemsPerPage;
        $scope.filteredQuestions = $scope.questions.slice(begin, end);
        });
    }
$scope.loadSideBar = function (data) {
        $scope.sideBarquestions = data.Item;
        $scope.sideBartotalItems = $scope.questions.length;
        $scope.sideBaritemsPerPage = 4;
        $scope.sideBarcurrentPage = 1;
        $scope.$watch('sideBarcurrentPage + sideBaritemsPerPage', function () {
            var begin = (($scope.sideBarcurrentPage - 1) * $scope.sideBaritemsPerPage),
              end = begin + $scope.sideBaritemsPerPage;
            $scope.sideBarfilteredQuestions = $scope.sideBarquestions.slice(begin, end);
            $scope.begin = begin;
            $scope.end = end;
        });
 	}
//for next set of sidebar
    $scope.goToSideBar = function () {
        $scope.sideBarfilteredQuestions = $scope.sideBarquestions.slice($scope.begin + 1, $scope.end + 1);
        $scope.begin = $scope.begin + 1;
        $scope.end = $scope.end + 1;
    }
    //for back set of sidebar
    $scope.goBackSideBar = function () {
        $scope.sideBarfilteredQuestions = $scope.sideBarquestions.slice($scope.begin - 1, $scope.end - 1);
        $scope.begin = $scope.begin - 1;
        $scope.end = $scope.end - 1;
    }
//for the next flashcard
    $scope.goTo = function (index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'flashcard';
        }
        //if the next flashcard not in sidebar
        if (index > $scope.end && index != 1) {
            $scope.goToSideBar();
        }

        if (index <= $scope.begin && index != 1) {
            $scope.goBackSideBar();
        }
    }

}]);
