/*
* @Author: David
* @Date:   2016-01-18 22:48:57
* @Last Modified by:   David
* @Last Modified time: 2016-04-13 10:57:32
*/


angular.module('CareerClue', ['ngRoute',
                                'ngAnimate',

                                'CareerClue.DragDrop',
                                'CareerClue.Controls',
                                'CareerClue.SideBar',
                                'CareerClue.Job',

                                'CareerClue.SignIn',
                                'CareerClue.SignUp',

                                'CareerClue.Forgot',
                                'CareerClue.Reset',

                                'CareerClue.Dash',
                                'CareerClue.Settings',
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
            controller: 'DashCtrl',
            loginRequired: true
        })
        .when('/MultiJob/:statusType?/:companyName?',
        {
            templateUrl: 'views/MultiJob/multijob.html',
            controller: 'MultiJobCtrl',
            loginRequired: true
        })
        .when('/Settings',
        {
            templateUrl: 'views/Settings/settings.html',
            controller: 'SettingsCtrl',
            loginRequired: true
        })



        /*====================================*\
            #Pre-SignIn Forms
        \*====================================*/

        .when('/SignIn',
        {
            templateUrl: 'views/SignIn/signin.html',
            controller: 'SignInCtrl',
            loginRequired: false
        })
        .when('/SignUp',
        {
            templateUrl: 'views/SignUp/signup.html',
            controller: 'SignUpCtrl',
            loginRequired: false
        })


        .when('/ForgotPassword',
        {
            templateUrl: 'views/Forgot/forgotPass.html',
            controller: 'ForgotCtrl',
            loginRequired: false
        })
        .when('/ForgotUsername',
        {
            templateUrl: 'views/Forgot/forgotUsername.html',
            controller: 'ForgotCtrl',
            loginRequired: false
        })
        .when('/Reset/:token',
        {
            templateUrl: 'views/Reset/reset.html',
            controller: 'ResetCtrl',
            loginRequired: false
        })




        //fall back
        .otherwise({
            redirectTo: '/SignIn'
        });


    }]);