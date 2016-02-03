/*
* @Author: David
* @Date:   2016-02-03 11:26:46
* @Last Modified by:   David
* @Last Modified time: 2016-02-03 11:38:01
*/

angular.module('jobTrack.SignUp', ['Repository'])
    .controller('SignUpCtrl', ['$scope', 'Repository', function($scope, Repository)
    {
        $scope.user = { name: '', email: '', password: '', repass: '' };
        $scope.errors = [];

        $scope.SignUp = function()
        {
            Repository.signUp($scope.user, function(errors)
            {
                $scope.errors = errors;
            });
        };

    }]);