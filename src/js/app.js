/*
* @Author: David
* @Date:   2016-01-18 22:48:57
* @Last Modified by:   David
* @Last Modified time: 2016-03-03 13:49:18
*/


angular.module('CareerClue', ['ngRoute',
                                'ngAnimate',

                                'CareerClue.SideBar',
                                'CareerClue.Job',

                                'CareerClue.Dash',
                                'CareerClue.SignIn',
                                'CareerClue.SignUp',

                                'CareerClue.MultiJob',
                            ]);

angular.module('CareerClue')
    .config(['$routeProvider', function($routeProvider)
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

        .when('/MultiJob/:statusType?/:companyName?',
        {
            templateUrl: 'views/MultiJob/multijob.html',
            controller: 'MultiJobCtrl'
        })
        .when('/SingleJob',
        {
            templateUrl: 'views/SingleJob/singlejob.html',
            controller: 'SingleJobCtrl'
        })
        .when('/EditJob/:jobId',
        {
            templateUrl: 'views/EditJob/editjob.html',
            controller: 'EditJobCtrl'
        })



        /*====================================*\
            #SignIn Forms
        \*====================================*/

        .when('/SignIn',
        {
            templateUrl: 'views/SignIn/signin.html',
            controller: 'SignInCtrl'
        })
        .when('/SignUp',
        {
            templateUrl: 'views/SignUp/signup.html',
            controller: 'SignUpCtrl'
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
            redirectTo: '/SignIn'
        });


    }]);