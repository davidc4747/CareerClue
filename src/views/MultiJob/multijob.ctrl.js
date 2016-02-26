/*
* @Author: David
* @Date:   2016-02-04 09:03:26
* @Last Modified by:   David
* @Last Modified time: 2016-02-26 12:51:08
*/

angular.module('CareerClue.MultiJob', ['Repository'])
    .controller('MultiJobCtrl', ['$scope', 'Repository', '$routeParams', 'Session' , function($scope, Repository, $routeParams, Session)
    {
        var statusType = $routeParams.statusType;

        $scope.isExpanded = false;

        $scope.toggleExpand = function()
        {
            $scope.isExpanded = !$scope.isExpanded;
        };

    }]);