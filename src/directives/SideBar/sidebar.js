/*
* @Author: David
* @Date:   2016-02-04 08:58:14
* @Last Modified by:   David
* @Last Modified time: 2016-02-04 09:25:58
*/

angular.module('CareerClue.Directive', [])
    .directive('sideBar', function()
    {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/SideBar/sidebar.html',
            link: function(scope, element, attrs)
            {
            },
        };
    });
