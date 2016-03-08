/*
* @Author: David
* @Date:   2016-01-18 22:48:57
* @Last Modified by:   David
* @Last Modified time: 2016-03-08 08:07:18
*/


angular.module('CareerClue', ['ngRoute',
                                'ngAnimate',

                                'CareerClue.DragDrop',
                                'CareerClue.Controls',
                                'CareerClue.SideBar',
                                'CareerClue.Job',

                                'CareerClue.SignIn',
                                'CareerClue.SignUp',

                                'CareerClue.Dash',
                                'CareerClue.Profile',
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
        .when('/MultiJob/:statusType?/:companyName?',
        {
            templateUrl: 'views/MultiJob/multijob.html',
            controller: 'MultiJobCtrl'
        })
        .when('/Profile',
        {
            templateUrl: 'views/Profile/profile.html',
            controller: 'ProfileCtrl'
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