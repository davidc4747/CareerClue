/*
* @Author: David
* @Date:   2016-02-26 13:39:01
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 14:47:39
*/

angular.module('CareerClue.Job', ['Repository'])
    .directive('job', ['Repository', function(Repository)
    {



        return {
            restrict: 'E',
            replace: true,
            scope: {
                jobData: '='
            },
            templateUrl: 'directives/Job/job.html',
            link: function(scope, Element, attrs)
            {

                // init vars
                scope.mode = 'job--view';
                scope.ngClass = [];
                scope.template = '';

                scope.isExpanded = false;
                scope.jobData.delete = false;



                // Get the Status types from DB
                scope.statusTypes = [];
                Repository.getStatusTypes(function(types)
                {
                    scope.statusTypes = types;
                });



                // Calc TimePassed
                scope.$watch('jobData.DateApplied', function()
                {
                    // init vars
                    var now = new Date();
                    var applyDate = scope.jobData.DateApplied || now;
                    var daysAgo = now.getDate() - applyDate.getDate();

                    if(daysAgo >= 365) // if more than a Year
                    {
                        // Calc how many years have passed
                        scope.jobData.TimePassed = Math.floor(daysAgo / 365);
                        scope.jobData.TimePassedLabel = ' Years ago';
                    }
                    else if(daysAgo >= 30) // if more than a Month
                    {
                        // Calc how many months have passed
                        scope.jobData.TimePassed = Math.floor(daysAgo / 30);
                        scope.jobData.TimePassedLabel = ' Months ago';
                    }
                    else if(daysAgo > 0) // if not today
                    {
                        scope.jobData.TimePassed = daysAgo;
                        scope.jobData.TimePassedLabel = ' Days ago';
                    }
                    else // it's has to be today
                    {
                        scope.jobData.TimePassed = 'Today';
                        scope.jobData.TimePassedLabel = '';
                    }

                });





                /*====================================*\
                    #Functions
                \*====================================*/

                scope.switchMode = function(className)
                {
                    // job--view, job--view-expand, job--edit
                    switch(className)
                    {
                        case 'job--view':
                            scope.mode = 'job--view';
                            scope.ngClass = ['job--view'];
                            scope.template = 'directives/Job/partials/view.html';
                            break;
                        case 'job--view-expand':
                            scope.mode = 'job--view-expand';
                            scope.ngClass = ['job--view-expand'];
                            scope.template = 'directives/Job/partials/view.html';
                            break;
                        case 'job--edit':
                            scope.mode = 'job--edit';
                            scope.ngClass = ['job--edit'];
                            scope.template = 'directives/Job/partials/edit.html';
                            break;
                    }


                };

                scope.toggleExpand = function()
                {
                    if(scope.mode == 'job--edit')
                        return;

                    scope.switchMode((scope.mode == 'job--view') ? 'job--view-expand' : 'job--view');
                };

                scope.numArray = function(num)
                {
                    var nums = [];
                    for (var i = 0; i < num; i++)
                        nums.push(num);

                    return nums;
                };



                /*====================================*\
                    #Edit Function
                \*====================================*/

                scope.save = function()
                {
                    // Save job to DB
                    Repository.saveJob(scope.jobData, function(jobId)
                    {
                        if(jobId != null)
                        {
                            scope.jobData.JobInfo_Id = jobId;
                            scope.switchMode('job--view-expand');
                        }
                    });
                };

                scope.cancel = function()
                {
                    if(scope.jobData.JobInfo_Id > 0)
                        scope.switchMode('job--view-expand');
                    else
                        scope.$emit('removeJob', { Id: scope.jobData.JobInfo_Id });// remove from ng-repeat
                };

                scope.delete = function()
                {
                    var deleteYN = confirm("Are you sure you want to delete '" + scope.jobData.CompanyName + "'? \n your data can't be recoverd");

                    if (deleteYN)
                    {
                        // Remove from DB
                        Repository.deleteJob(scope.jobData);

                        // remove from ng-repeat
                        scope.$emit('removeJob', { Id: scope.jobData.JobInfo_Id });
                    }

                };






                /******** Set Initial mode **********/
                if(scope.jobData.JobInfo_Id > 0)
                    scope.switchMode('job--view');
                else
                    scope.switchMode('job--edit');

            }
        }
    }]);