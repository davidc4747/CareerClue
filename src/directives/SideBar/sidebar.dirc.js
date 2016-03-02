/*
* @Author: David
* @Date:   2016-02-04 08:58:14
* @Last Modified by:   David
* @Last Modified time: 2016-02-26 14:49:48
*/

angular.module('CareerClue.SideBar', ['Repository'])
    .directive('sideBar', [ 'Repository', '$location', function(Repository, $location)
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
                scope.path = $location.path();
                scope.navItems = [
                    { Id: -2, href: '/Dash', text: 'Dashboard'},
                    { Id: -1, href: '/MultiJob/all', text: 'View All'},
                ];



                // Get the Status types from DB
                Repository.getjobStatusCount(function(types)
                {
                    for (var i = 0; i < types.length; i++)
                    {
                        scope.navItems.push({
                            Id: types[i].JobStatus_Id,
                            href: '/MultiJob/' + types[i].JobStatus_Name,
                            text: types[i].JobStatus_Name,
                            count: types[i].JobStatus_Count
                        });
                    }
                });



                // Get User Information form DB
                Repository.userInfo(function(data)
                {
                    if(data.length > 0)
                        scope.userInfo = data[0];
                });
            },
        };
    }]);
