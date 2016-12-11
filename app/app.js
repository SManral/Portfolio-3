angular.module('myApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    console.log('work!!');
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
        .state('homepage', {
            url: "/homepage",
            templateUrl: 'app/partials/homepage.html',
            controller: 'HomepageController'
        })
         .state('gradeCalculator', {
            url: "/gradeCalculator",
            templateUrl: 'app/partials/gradeCalculator.html',
            controller: 'GradeCalcController'
        })
          .state('uploadFiles', {
            url: "/uploadFiles",
            templateUrl: 'app/partials/uploadFiles.html',
            controller: 'UploadFilesController'
        })


    $urlRouterProvider.otherwise('/login');
});
