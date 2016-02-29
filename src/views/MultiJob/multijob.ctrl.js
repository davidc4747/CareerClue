/*
* @Author: David
* @Date:   2016-02-04 09:03:26
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 14:54:06
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


        $scope.$on('removeJob', function(event, args)
        {
            console.log('remove tiggered --');
            for (var i = $scope.jobs.length - 1; i >= 0; i--)
            {
                // if the directive is flagged for removal
                if($scope.jobs[i].JobInfo_Id == args.Id)
                {
                    console.log('     remove found -- ' + i);
                    console.log($scope.jobs);
                    $scope.jobs.splice(i, 1);
                }
            }

        });



        $scope.createJob = function()
        {
            if($scope.jobs.length == 0 || $scope.jobs[0].JobInfo_Id >  0)
                $scope.jobs.unshift({JobInfo_Id: -1});
        };


    }]);