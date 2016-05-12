/*
* @Author: David
* @Date:   2016-04-07 08:40:56
* @Last Modified by:   David
* @Last Modified time: 2016-04-07 11:07:17
*/

angular.module('CareerClue.Forgot', [])
    .controller('ForgotCtrl', [ '$scope', 'Repository', function($scope, Repository)
    {

        $scope.sent = false;

        $scope.sendEmail = function()
        {
            Repository.sendEmail($scope.email, function()
            {
                $scope.sent = true;
            });
        };

    }]);