/*
* @Author: David
* @Date:   2016-01-29 13:04:37
* @Last Modified by:   David
* @Last Modified time: 2016-03-10 15:19:25
*/

angular.module('CareerClue.SignIn', ['Repository'])
    .controller('SignInCtrl', ['$scope', '$location', '$rootScope', 'Repository', function($scope, $location, $rootScope, Repository)
    {

        $scope.user = { name: '', password: '', remember: false };
        $scope.errors = [];

        // Prevent access to certain screens if not logged in
        $rootScope.$on('$routeChangeStart', function (event, next)
        {
            if ($location.path() != '/SignIn')
            {
                Repository.getLoginStatus(function(isLoggedIn)
                {
                    var loginRequired = typeof next.loginRequired !== 'undefined' ? next.loginRequired : true;

                    if (loginRequired == true && isLoggedIn == false)
                    {
                        $location.path('/SignIn');
                    }
                });
            }
        });



        Repository.getLoginStatus(function(isLoggedIn)
        {
            if(isLoggedIn == true)
                $location.path('/MultiJob');
        });


        $scope.signIn = function()
        {
            $scope.errors = [];

            //Display errors for required fields
            if($scope.user.name == '')
                $scope.errors.push({ mess: 'Username is required'});

            if($scope.user.password == '')
                $scope.errors.push({ mess: 'Password is required'});



            //if Required fields are filled, attemp to signIn to the DB
            Repository.signIn($scope.user, function (errors)
            {
                //Display errors to user
                $scope.errors = $scope.errors.concat(errors);

                //If no errors, Go to CareerClue.MultiJob
                if(errors.length == 0)
                {
                    $location.path('/MultiJob');
                }

            });


        };



    }]);