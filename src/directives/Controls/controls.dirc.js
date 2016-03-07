/*
* @Author: David
* @Date:   2016-03-07 08:03:31
* @Last Modified by:   David
* @Last Modified time: 2016-03-07 09:23:58
*/

angular.module('CareerClue.Controls', [])
    .directive('controls', [ '$document', function($document){
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




                $document.on('click', function()
                {
                        console.log('?');
                    scope.$apply(function()
                    {
                        scope.showMenu = false;
                        scope.showSettings = false;
                    });
                });
            }
        };
    }]);