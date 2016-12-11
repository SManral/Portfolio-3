angular.module('myApp')
.controller('HomepageController', ['$scope','$http','$state', 'socket', function($scope, $http, $state, socket){
    //socket.on
    $scope.join = function() {
      socket.emit('add_user', 'test');
    }

    socket.on('init', function(data){

      console.log(data.name + " WORKING");
    });




    // socket.on('response', function(data){
    //   console.log(data.user);
    //   $scope.$apply(function () {});
    // })

}]);
