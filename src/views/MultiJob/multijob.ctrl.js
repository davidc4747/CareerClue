/*
* @Author: David
* @Date:   2016-02-04 09:03:26
* @Last Modified by:   David
* @Last Modified time: 2016-02-27 09:04:38
*/

angular.module('CareerClue.MultiJob', ['Repository'])
    .controller('MultiJobCtrl', ['$scope', 'Repository', '$routeParams', 'Session' , function($scope, Repository, $routeParams, Session)
    {
        // Ask DB for jobs based on status
        var statusType = $routeParams.statusType;
        $scope.jobs = [];

        // Repo.getJobs('status', callback);



        $scope.createJob = function()
        {
            $scope.jobs.unshift({id: -1});
        };


    }]);