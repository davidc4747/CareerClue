/*
* @Author: David
* @Date:   2016-03-07 08:03:31
* @Last Modified by:   David
* @Last Modified time: 2016-03-09 10:42:02
*/

angular.module('CareerClue.Controls', ['Repository'])
    .directive('controls', [ '$document', '$location' , 'Repository', function($document, $location, Repository){
        // Runs during compile
        return {
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'directives/Controls/controls.html',
            replace: true,
            link: function(scope, elm, attrs)
            {
                scope.showMenu = false;
                scope.showSettings = false;

                scope.toggleMenu = function()
                {
                    scope.showMenu = !scope.showMenu;
                };

                scope.toggleSettings = function()
                {
                    scope.showSettings = !scope.showSettings;
                };



                scope.signOut = function()
                {
                    Repository.signOut(function()
                    {
                        $location.path('/SignIn');
                    });

                };



                $document.on('click', function()
                {
                    scope.$apply(function()
                    {
                        scope.showMenu = false;
                        scope.showSettings = false;
                    });
                });
            }
        };
    }]);