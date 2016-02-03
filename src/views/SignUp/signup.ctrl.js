/*
* @Author: David
* @Date:   2016-02-03 11:26:46
* @Last Modified by:   David
* @Last Modified time: 2016-02-03 13:35:45
*/

angular.module('jobTrack.SignUp', ['Repository'])
    .controller('SignUpCtrl', ['$scope', 'Repository', '$location', function($scope, Repository, $location)
    {
        $scope.user = { name: '', email: '', password: '', repass: '' };
        $scope.errors = [];

        $scope.signUp = function()
        {
            Repository.signUp($scope.user, function(errors)
            {
                //Display errors to user
                $scope.errors = errors;

                //If no errors, Go to CareerClue.MultiJob
                if(errors.length == 0)
                {
                    $scope.errors = [];
                    $location.path('/MultiJob');
                }

            });
        };

    }]);