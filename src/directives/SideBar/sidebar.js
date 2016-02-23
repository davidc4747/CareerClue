/*
* @Author: David
* @Date:   2016-02-04 08:58:14
* @Last Modified by:   David
* @Last Modified time: 2016-02-23 11:11:10
*/

angular.module('CareerClue.Directive', [])
    .directive('sideBar', [ 'Repository', '$location', function(Repository, $location)
    {

        // init the nav items for ng-repeat
        var navItems = [
            { href: '/Dash', text: 'Dashboard'},
            { href: '/MultiJob/applied', text: 'Applied'},
            { href: '/MultiJob/interviewing', text: 'Interviewing'},
            { href: '/MultiJob/offered', text: 'Offered'},
            { href: '/MultiJob/archived', text: 'Archive'},
            { href: '/AddJob', text: 'Add Job'},
        ];

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/SideBar/sidebar.html',
            link: function(scope, element, attrs)
            {
                scope.date = new Date();
                scope.navItems = navItems
                scope.path = $location.path();


                Repository.userInfo(function(data)
                {
                    if(data.length > 0)
                        scope.userInfo = data[0];
                });
            },
        };
    }]);
