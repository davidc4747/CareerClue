/*
* @Author: David
* @Date:   2016-01-29 13:04:37
* @Last Modified by:   David
* @Last Modified time: 2016-02-03 13:35:52
*/

angular.module('jobTrack.SignIn', ['Repository'])
    .controller('SignInCtrl', ['$scope', '$location', 'Repository', function($scope, $location, Repository)
    {
        $scope.user = { name: '', password: '', remember: false };
        $scope.errors = [];

        $scope.signIn = function()
        {
            //Call Repo.signIn
            Repository.signIn($scope.user, function (errors)
            {
                //Display errors to user
                $scope.errors = errors;

                //If no errors, Go to CareerClue.MultiJob
                if(errors.length == 0)
                {
                    $scope.errors = [];
                    $location.path('/MultiJob');
                }
                console.log(errors);
            });
        };

    }]);