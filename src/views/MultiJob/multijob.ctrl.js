/*
* @Author: David
* @Date:   2016-02-04 09:03:26
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 07:51:13
*/

angular.module('CareerClue.MultiJob', ['Repository'])
    .controller('MultiJobCtrl', ['$scope', 'Repository', '$routeParams', 'Session' , function($scope, Repo, $routeParams, Session)
    {
        // Ask DB for jobs based on status
        var statusType = $routeParams.statusType;
        $scope.jobs = [];

        // Repo.getJobs('status', callback);
        Repo.getUserJobs(function(jobs)
        {
            $scope.jobs = jobs;
        });



        $scope.createJob = function()
        {
            if($scope.jobs.length == 0 || $scope.jobs[0].JobInfo_Id >  0)
                $scope.jobs.unshift({JobInfo_Id: -1});
        };


    }]);