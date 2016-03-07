/*
* @Author: David
* @Date:   2016-02-04 09:03:26
* @Last Modified by:   David
* @Last Modified time: 2016-03-07 07:19:06
*/

angular.module('CareerClue.MultiJob', ['Repository'])
    .directive('search', [ '$routeParams', function($routeParams)
    {
        // Runs during compile
        return {
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            template: '<form class="frm frm--search row" ng-submit="">'+
                            '<i class="add-job col-xs-1 fa fa-plus fa-2x" ng-click="createJob()"></i>'+
                            '<div class="field col-xs-11">'+
                                '<input class="txt txt--search" type="search" ng-model="search">'+
                                '<label class="lbl lbl--search" for="">Search</label>'+
                                '<i class="fa"'+
                                    'ng-click="clearSearch()"'+
                                    'ng-class="[(!search || search == \'\') ? \'fa-search\' : \'fa-times\']"></i>'+
                            '</div>'+
                        '</form>',
            replace: true,
            link: function(scope, elm, attrs)
            {
                scope.clearSearch = function()
                {
                    scope.search = '';
                    $routeParams.companyName = '';
                };
            }
        };
    }])
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

        $scope.$on('editJobs', function(event, args)
        {
            // Get all of the user's jobs from DB
            for (var i = $scope.jobs.length - 1; i >= 0; i--)
            {
                if($scope.jobs[i].JobInfo_Id == args.Id)
                {
                    console.log(args);
                    $scope.jobs[i] = args.job;
                }
            }

        });




        // Create a blank job directive
        $scope.createJob = function()
        {
            $scope.search = '';
            var defaultJob = { JobInfo_Id: -1, CompanyName:'', JobStatus_Name: $scope.statusFilter };

            // Add to array if not exists
            if($scope.jobs.length == 0 || $scope.jobs[0].JobInfo_Id >  0)
                $scope.jobs.unshift(defaultJob);
        };


    }]);