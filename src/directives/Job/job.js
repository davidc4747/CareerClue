/*
* @Author: David
* @Date:   2016-02-26 13:39:01
* @Last Modified by:   David
* @Last Modified time: 2016-02-26 13:51:58
*/

angular.module('CareerClue.Job', ['Repository'])
    .directive('job', function()
    {



        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/Job/job.html',
            link: function(scope, Element, attrs)
            {
                scope.isExpanded = false;

                scope.toggleExpand = function()
                {
                    scope.isExpanded = !scope.isExpanded;
                };
            }
        }
    })