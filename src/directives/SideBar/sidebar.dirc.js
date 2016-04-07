/*
* @Author: David
* @Date:   2016-02-04 08:58:14
* @Last Modified by:   David
* @Last Modified time: 2016-03-31 11:23:32
*/

angular.module('CareerClue.SideBar', ['Repository'])
    .factory('nav', [ 'Repository', '$routeParams', '$filter', function(Repository, $routeParams, $filter)
    {
        navItems = [
            { Id: -1, href: '/MultiJob', text: 'View All'},
        ];

        // Get all of the user's jobs from DB
        Repository.getUserJobs(function(jobs)
        {
            jobs = jobs;

            // Get the Status types from DB
            Repository.getjobStatusCount(function(types)
            {
                for (var i = 0; i < types.length; i++)
                {
                    navItems.push({
                        Id: types[i].JobStatus_Id,

                        isExpanded: false,
                        statusName: types[i].JobStatus_Name,

                        href: '/MultiJob/' + types[i].JobStatus_Name,
                        text: types[i].JobStatus_Name,

                        count: types[i].JobStatus_Count,
                        jobs: $filter('filter')(jobs, { JobStatus_Name: types[i].JobStatus_Name })
                    });
                }
            });

        });




        return {
            items: navItems
        };


    }])
    .directive('sideBar', [ 'Repository', 'nav', '$routeParams', function(Repository, nav, $routeParams)
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
                scope.navItems = nav.items;

                // Get User Information form DB
                Repository.userInfo(function(user)
                {
                    scope.userInfo = user;
                });

            },
        };
    }])
    .directive('navGroup', [ 'nav', '$routeParams', 'Repository', function(nav, $routeParams, Repository)
    {
        return {
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            replace: true,
            templateUrl: 'directives/SideBar/partials/navGroup.html',
            link: function(scope, ele, attrs)
            {

                scope.isActive = scope.item.statusName == $routeParams.statusType;

                scope.toggleExpand = function()
                {
                    // update nav.item when user updates this item
                    scope.item.isExpanded = !scope.item.isExpanded;
                };

                scope.changeStatus = function(jobData, statusId, statusName)
                {
                    // if jobData isn't a newJob && status isn't the current status
                    if(jobData.JobInfo_Id > 0 && jobData.JobStatus_Id != statusId)
                    {
                        // Change the Job's status
                        jobData.JobStatus_Id = statusId;
                        jobData.JobStatus_Name = statusName;


                        // Save Changes to DataBase
                        Repository.saveJob(jobData, function()
                        {
                            // Update nav object
                            for (var i = nav.items.length - 1; i >= 0; i--)
                            {
                                if(nav.items[i].jobs)
                                {
                                    // Find the out dated jobData and remove it
                                    for (var j = nav.items[i].jobs.length - 1; j >= 0; j--)
                                    {
                                        if(nav.items[i].jobs[j].JobInfo_Id == jobData.JobInfo_Id)
                                        {
                                            nav.items[i].jobs.splice(j, 1);
                                            nav.items[i].count = parseInt(nav.items[i].count) - 1;
                                        }
                                    }

                                    // Add the updated Job to it's proper position
                                    if(nav.items[i].statusName == jobData.JobStatus_Name)
                                    {
                                        nav.items[i].jobs.push(jobData);
                                        nav.items[i].count = parseInt(nav.items[i].count) + 1;
                                    }
                                }

                            }


                            // Tell MultiJob to update it's job list
                            scope.$emit('editJobs', { Id: jobData.JobInfo_Id, job: jobData });
                        });
                    }
                };



            }
        };
    }]);
