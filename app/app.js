angular.module('myApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: 'app/partials/login.html',
            controller: 'LoginController'
        })
        .state('signup', {
            url: "/signup",
            templateUrl: 'app/partials/signup.html',
            controller: 'SignupController'
        })
        
    $urlRouterProvider.otherwise('/login');
});
 