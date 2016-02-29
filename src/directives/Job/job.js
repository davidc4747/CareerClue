/*
* @Author: David
* @Date:   2016-02-26 13:39:01
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 10:17:24
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

                // Get the Status types from DB
                scope.statusTypes = [];
                Repository.getStatusTypes(function(types)
                {
                    scope.statusTypes = types;
                });

                // Calc TimePassed
                scope.jobData.TimePassed = 4;// TODO:

                // Set Rating color
                switch(scope.jobData.Job_Rating)
                {
                    default:
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        scope.ratingClass = 'job__rating--low';
                        break;
                    case 4:
                    case 5:
                    case 6:
                        scope.ratingClass = 'job__rating--mid';
                        break;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        scope.ratingClass = 'job__rating--high';
                        break;
                };





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
                    scope.switchMode('job--view-expand');
                };






                /******** Set Initial mode **********/
                if(scope.jobData.JobInfo_Id > 0)
                    scope.switchMode('job--view');
                else
                    scope.switchMode('job--edit');

            }
        }
    }]);