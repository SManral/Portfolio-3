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


	$scope.signup = function(user){
		console.log(user);
		$http.post('api/user/signup', user)
		.success(function(callback){
			console.log(callback);
			$state.go('login');
		}).error(function(err){

			console.log(err)
		})
	}

}]);
