/*
* @Author: David
* @Date:   2016-01-18 22:48:57
* @Last Modified by:   David
* @Last Modified time: 2016-01-18 23:30:16
*/


var jobTracker = angular.module('jobTracker', ['ngRoute', 'Repository']);

jobTracker.config(['$routeProvider', function($routeProvider)
{

    /*====================================*\
        #Main Screens
    \*====================================*/

    $routeProvider
    .when('/Dash',
    {
        templateUrl: 'views/Dash/dash.html',
        controller: 'DashCtrl'
    })



    /*====================================*\
        #Job Views
    \*====================================*/

    .when('/MultiJob',
    {
        templateUrl: 'views/MultiJob/multijob.html',
        controller: 'MultiJobCtrl'
    })
    .when('/SingleJob',
    {
        templateUrl: 'views/SingleJob/singlejob.html',
        controller: 'SingleJobCtrl'
    })
    .when('/AddJob',
    {
        templateUrl: 'views/AddJob/addjob.html',
        controller: 'AddJobCtrl'
    })



    /*====================================*\
        #Login Forms
    \*====================================*/

    .when('/Login',
    {
        templateUrl: 'views/Login/login.html',
        controller: 'LoginCtrl'
    })
    .when('/SignUp',
    {
        templateUrl: 'views/SignUp/signup.html',
        controller: 'RegisterCtrl'
    })
    .when('/ForgotPassword',
    {
        templateUrl: 'views/ForgotPass/forgotPass.html',
        controller: 'ForgotPassCtrl'
    })
    .when('/ForgotUsername',
    {
        templateUrl: 'views/ForgotUsername/forgotUsername.html',
        controller: 'ForgotUserCtrl'
    })




    //fall back
    .otherwise({
        redirectTo: '/Dash'
    });


}]);