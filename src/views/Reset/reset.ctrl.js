/*
* @Author: David
* @Date:   2016-04-08 13:53:41
* @Last Modified by:   David
* @Last Modified time: 2016-04-08 14:19:54
*/

angular.module('CareerClue.Reset', [])
    .controller('ResetCtrl', ['$scope', 'Repository', '$routeParams', function($scope, Repository, $routeParams)
    {
        $scope.sent = false;
        $scope.resetPassword = function()
        {
            Repository.resetPassword($routeParams.token, $scope.password, $scope.repass, function()
            {
                $scope.sent = true;
            });
        };

    }]);