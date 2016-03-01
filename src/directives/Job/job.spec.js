/*
* @Author: David
* @Date:   2016-02-26 13:39:09
* @Last Modified by:   David
* @Last Modified time: 2016-02-28 07:41:55
*/

describe('Job Directive', function()
{
    // angular vars
    var $scope,
        element;

    // mock vars
    var mockStatusTypes = [{ Id:-11, Name: 'mock type'}];
    var mockJob = { JobInfoId: -1 };
    var mockRepo = {
        getStatusTypes: function(callback)
        {
            callback(mockStatusTypes);
        },
    }




    // Import the module we want to test
    beforeEach(module('CareerClue.Job'));

    // Save these parials to template cache using ng-html2js
    beforeEach(module('directives/Job/job.html',
                        'directives/Job/partials/view.html',
                        'directives/Job/partials/edit.html'));

    // Provide mock dependencies
    beforeEach(module(function($provide)
    {
        $provide.value('Repository', mockRepo);
    }));

    // Compile the directive using a mock scope
    beforeEach(inject(function($rootScope, $compile)
    {
        $scope = $rootScope.$new();
        $scope.job = mockJob;

        element = angular.element('<job job-data="job"></job>');

        $compile(element)($scope);
        $scope.$digest();

    }));



    /*====================================*\
        #Start Testss
    \*====================================*/

    describe('OnLoad', function()
    {
        it('should get StatusTypes', function()
        {
            // console.log(element);
            expect(element.isolateScope().statusTypes).toBe(mockStatusTypes);
        });

        xit('should set default mode to job--edit for objects with an id of -1', function()
        {

        });

        xit('should set default mode to job--view for objects with an id greater than -1', function()
        {

        });
    });



    xdescribe('TimePassed', function()
    {
        it('should display DAYS passed', function()
        {
            //three days passed
        });

        it('should display MONTHS passed', function()
        {

        });

        it('should display YEARS passed', function()
        {

        });

    });



    xdescribe('Switch Modes', function()
    {
        it('should siwtch to job--view', function()
        {
            //three days passed

            // Test the scrolling effect??
        });

        it('should siwtch to job--view-expand', function()
        {

        });

        it('should siwtch to job--view-edit', function()
        {

        });

    });



    xdescribe('DataBase events', function()
    {
        it('should call save', function()
        {

        });
        it('should call cancel', function()
        {

        });
        it('should call delete', function()
        {

        });
    });



});