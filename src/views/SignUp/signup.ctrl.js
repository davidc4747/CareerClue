/*
* @Author: David
* @Date:   2016-02-03 11:26:46
* @Last Modified by:   David
* @Last Modified time: 2016-04-13 17:07:49
*/

angular.module('CareerClue.SignUp', ['Repository'])
    .controller('SignUpCtrl', ['$scope', 'Repository', '$location', function($scope, Repository, $location)
    {

        $scope.user = { name: '', email: '', password: '', repass: '' };
        $scope.errors = [];

        $scope.signUp = function()
        {
            $scope.errors = [];

            // Required field errors
            if($scope.user.name == '')
                $scope.errors.push({mess: 'Username is a required field'});
            if($scope.user.email == '')
                $scope.errors.push({mess: 'Email is a required field'});
            if($scope.user.password == '')
                $scope.errors.push({mess: 'Password is a required field'});
            if($scope.user.repass == '')
                $scope.errors.push({mess: 'Confirm password is a required field'});

            // Password error
            if($scope.user.password !== $scope.user.repass)
                $scope.errors.push({mess: 'Passwords do not match'});

            if($scope.user.password.length < 3)
                $scope.errors.push({mess: 'Password need to be longer than 3 characters'});



            if($scope.errors.length == 0)
            {
                //If all fields are filled in, attempt to signUp the user
                Repository.signUp($scope.user, function(isValid)
                {
                    // if the user info was valid
                    if(isValid == true)
                        $location.path('/MultiJob');
                    else
                        $scope.errors.push({ mess: 'Invalid Information'});
                });
            }
        };



    }]);