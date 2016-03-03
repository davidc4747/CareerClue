/*
* @Author: David
* @Date:   2016-02-04 09:03:26
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 15:16:46
*/

angular.module('CareerClue.MultiJob', ['Repository'])
    .controller('MultiJobCtrl', ['$scope', 'Repository', '$routeParams', 'Session' , function($scope, Repository, $routeParams, Session)
    {
        // Ask DB for jobs based on status
        $scope.statusFilter = $routeParams.statusType;
        $scope.search = $routeParams.companyName;
        $scope.jobs = [];



        // Get all of the user's jobs from DB
        Repository.getUserJobs(function(jobs)
        {
            $scope.jobs = jobs;
        });



        // Listen for job directives that want to be removed
        $scope.$on('removeJob', function(event, args)
        {
            for (var i = $scope.jobs.length - 1; i >= 0; i--)
            {
                // if the directive is flagged for removal
                if($scope.jobs[i].JobInfo_Id === args.Id)
                    $scope.jobs.splice(i, 1);
            }

        });




        // Create a blank job directive
        $scope.createJob = function()
        {
            //
            $scope.search = '';
            var defaultJob = { JobInfo_Id: -1, CompanyName:'', JobStatus_Name: $scope.statusFilter };

            // Add to array if not exists
            if($scope.jobs.length == 0 || $scope.jobs[0].JobInfo_Id >  0)
                $scope.jobs.unshift(defaultJob);
        };


    }]);