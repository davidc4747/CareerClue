/*
* @Author: David
* @Date:   2016-04-08 13:53:41
* @Last Modified by:   David
* @Last Modified time: 2016-04-12 08:57:43
*/

angular.module('CareerClue.Reset', [])
    .controller('ResetCtrl', ['$scope', 'Repository', '$routeParams', function($scope, Repository, $routeParams)
    {
        // init vars
        $scope.sent = false;
        $scope.error = false;

        $scope.resetPassword = function()
        {
            // reset vars
            $scope.sent = false;
            $scope.error = false;

            if($scope.password != $scope.repass)
            {
                $scope.error = true;
                return;
            }

            Repository.resetPassword($routeParams.token, $scope.password, $scope.repass, function(data)
            {
                console.log(data);
                $scope.sent = true;
            });
        };

    }]);