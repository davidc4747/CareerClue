/*
* @Author: David
* @Date:   2016-01-29 13:04:37
* @Last Modified by:   David
* @Last Modified time: 2016-04-14 08:35:14
*/

angular.module('CareerClue.SignIn', ['Repository'])
    .controller('SignInCtrl', ['$scope', '$location', '$rootScope', 'Repository', function($scope, $location, $rootScope, Repository)
    {

        $scope.user = { name: '', password: '', remember: false };
        $scope.loading = false;
        $scope.errors = [];

        // Prevent access to certain screens if not logged in
        $rootScope.$on('$routeChangeStart', function (event, next)
        {
            if ($location.path() != '/SignIn')
            {
                Repository.getSignInStatus(function(isLoggedIn)
                {
                    var loginRequired = typeof next.loginRequired !== 'undefined' ? next.loginRequired : true;

                    if (loginRequired == true && isLoggedIn == false)
                    {
                        $location.path('/SignIn');
                    }
                });
            }
        });


        // If The user is already logged, forward to main screen
        Repository.getSignInStatus(function(isLoggedIn)
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

            if($scope.user.password.length < 3)
                $scope.errors.push({mess: 'Password need to be longer than 3 characters'});


            if($scope.errors.length == 0)
            {
                $scope.loading = true;

                //if Required fields are filled, attemp to signIn to the DB
                Repository.signIn($scope.user, function (isValid)
                {
                    // if the user info was valid
                    if(isValid == true)
                        $location.path('/MultiJob');
                    else
                        $scope.errors.push({ mess: 'Invalid username or password'});

                    $scope.loading = false;
                });
            }

        };



    }]);