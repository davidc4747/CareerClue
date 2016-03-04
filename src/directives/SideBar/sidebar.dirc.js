/*
* @Author: David
* @Date:   2016-02-04 08:58:14
* @Last Modified by:   David
* @Last Modified time: 2016-03-04 12:58:17
*/

angular.module('CareerClue.SideBar', ['Repository'])
    .directive('sideBar', [ 'Repository', '$routeParams', function(Repository, $routeParams)
    {

        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: 'directives/SideBar/sidebar.html',
            link: function(scope, element, attrs)
            {
                // init vars
                scope.date = new Date();
                scope.jobs = [];
                scope.navItems = [];



                // Get User Information form DB
                Repository.userInfo(function(data)
                {
                    if(data.length > 0)
                        scope.userInfo = data[0];
                });





                var getStatusItems = function()
                {
                    scope.jobs = [];
                    scope.navItems = [
                        { Id: -2, href: '/Dash', text: 'Dashboard'},
                        { Id: -1, href: '/MultiJob', text: 'View All'},
                    ];

                    // Get all of the user's jobs from DB
                    Repository.getUserJobs(function(jobs)
                    {
                        scope.jobs = jobs;
                    });

                    // Get the Status types from DB
                    Repository.getjobStatusCount(function(types)
                    {
                        for (var i = 0; i < types.length; i++)
                        {
                            scope.navItems.push({
                                Id: types[i].JobStatus_Id,

                                isExpanded: false,
                                selected: types[i].JobStatus_Name == $routeParams.statusType,
                                statusName: types[i].JobStatus_Name,

                                href: '/MultiJob/' + types[i].JobStatus_Name,
                                text: types[i].JobStatus_Name,

                                count: types[i].JobStatus_Count,
                            });
                        }
                    });
                };
                getStatusItems();





                scope.toggleExpand = function(navItem)
                {
                    navItem.isExpanded = !navItem.isExpanded;
                };


                scope.changeStatus = function(jobData, statusId, statusName)
                {
                    // if it's not a blank object
                    if(jobData.JobInfo_Id > 0 && jobData.JobStatus_Id != statusId)
                    {
                        // Change Status
                        jobData.JobStatus_Id = statusId;
                        jobData.JobStatus_Name = statusName;

                        // Save Change to DataBase
                        Repository.saveJob(jobData, function()
                        {
                            // Wait for DB Changes to be made

                            // Update SideBar after
                            getStatusItems();
                            // Remove from MultiJob list
                            scope.$emit('editJobs', {Id: jobData.JobInfo_Id, job: jobData});
                        });
                    }
                };


            },
        };
    }]);
