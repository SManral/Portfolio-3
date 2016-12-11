angular.module('myApp')
.controller('SignupController', ['$scope','$http','$state', function($scope, $http, $state){
	$scope.err =false;
	$scope.user = {
		'firstName': '',
		'lastName':'',
		'username':'',
		'password':'',
		'email':'',
		'phone':''
	};


	$scope.signup = function(user){debugger;
		console.log(user);
		$http.post('api/user/signup', $scope.user)
		.success(function(callback){
			console.log(callback);
			alert("Hurray! You have been sucessfully signed up!");
			$state.go('login');
		}).error(function(err){
			alert("Oops! Failed to sign up, Try again!");
			console.log(err)
		})
	}

}]);
