angular.module('myApp')
.controller('LoginController', ['$scope','$http','$state', function($scope, $http, $state){
	$scope.callback = '';
	$scope.user = {
		'username': '',
		'password':''
	};
	$scope.login = 'Login Page';
	
	$scope.login = function(form) {
		if(!form.$invalid) {
			$http.post('api/user/login', $scope.user)
			.success(function(callback){
				if(callback.res == 'error') {
					$scope.callback = callback.data;
				}
				else if(callback.res == 'success') {
					$scope.callback = '';
					callback.data.type = "user";
					localStorage.setItem('User-Data', JSON.stringify(callback.data));
					$state.go('users_home');
				}
				console.log(callback);
			}).error(function(err){
				$scope.callback = err.data;
				console.log(err);
			})
		}
	}
	
}]);