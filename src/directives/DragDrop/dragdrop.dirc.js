/*
* @Author: David
* @Date:   2016-03-04 07:56:02
* @Last Modified by:   David
* @Last Modified time: 2016-03-04 11:27:23
*/

angular.module('CareerClue.DragDrop', [])
    .value('transfer', {})
    .directive('ccDrag', [ 'transfer', function(transfer)
    {
        // Runs during compile
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function(scope, elm, attrs)
            {
                scope.ccDrag = {};
                elm.attr('draggable', true);

                // Set onEvents to '' to prevent an html error
                scope.ccDrag.ondrag = attrs.ondrag;
                elm.attr('ondrag', '');

                scope.ccDrag.ondragstart = attrs.ondragstart;
                elm.attr('ondragstart', '');

                scope.ccDrag.ondragend = attrs.ondragend;
                elm.attr('ondragend', '');


                // Execute the attr values as angular scope functions
                elm.bind('drag', function()
                {
                    scope.$eval(scope.ccDrag.ondrag);
                    scope.$apply();
                });

                elm.bind('dragstart', function()
                {
                    transfer.data = scope.$eval(attrs.ccDragData);
                    scope.$eval(scope.ccDrag.ondragstart);
                    scope.$apply();
                });

                elm.bind('dragend', function()
                {
                    scope.$eval(scope.ccDrag.ondragend);
                    transfer.data = null;
                    scope.$apply();
                });
            }

        };
    }])
    .directive('ccDrop', ['transfer', function(transfer)
    {
        // Runs during compile
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            replace: true,
            link: function(scope, elm, attrs)
            {
                scope.ccDrop = {};

                // Set onEvents to '' to prevent an html error
                scope.ccDrop.ondrop = attrs.ondrop;
                elm.attr('ondrop', '');

                scope.ccDrop.ondragenter = attrs.ondragenter;
                elm.attr('ondragenter', '');

                scope.ccDrop.ondragexit = attrs.ondragexit;
                elm.attr('ondragexit', '');

                scope.ccDrop.ondragleave = attrs.ondragleave;
                elm.attr('ondragleave', '');

                scope.ccDrop.ondragover = attrs.ondragover;
                elm.attr('ondragover', '');


                // Execute the attr values as angular scope functions
                elm.bind('drop', function(event)
                {
                    event.preventDefault();
                    scope.ccDrop.transfer = transfer.data;
                    scope.$eval(scope.ccDrop.ondrop);
                    scope.$apply();
                });

                elm.bind('dragenter', function()
                {
                    scope.$eval(attrs.onddragenter);
                    scope.$apply();
                });

                elm.bind('dragexit', function()
                {
                    scope.$eval(attrs.ondragexit);
                    scope.$apply();
                });

                elm.bind('dragleave', function()
                {
                    scope.$eval(attrs.ondragleave);
                    scope.$apply();
                });

                elm.bind('dragover', function(event)
                {
                    event.preventDefault();
                    scope.$eval(attrs.onddragover);
                    scope.$apply();
                });
            }
        };
    }]);