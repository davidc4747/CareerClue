/*
* @Author: David
* @Date:   2016-02-23 11:41:59
* @Last Modified by:   David
* @Last Modified time: 2016-02-26 14:49:11
*/

angular.module('CareerClue.EditJob', ['Repository'])
    .controller('EditJobCtrl', ['$scope', 'Repository', function($scope, Repository)
    {
        $scope.today = function()
        {
            return new Date().toISOString().slice(0, 10);
        };
    }]);