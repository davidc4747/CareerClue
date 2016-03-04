/*
* @Author: David
* @Date:   2016-02-26 13:39:09
* @Last Modified by:   David
* @Last Modified time: 2016-03-03 16:04:21
*/

describe('Job Directive', function()
{
    // angular vars
    var $scope,
        $compile;

    // mock vars
    var mockRoute = {};
    var mockStatusTypes = [{ Id:-11, Name: 'mock type'}];
    var mockRepo = {
        getStatusTypes: function(callback)
        {
            callback(mockStatusTypes);
        },
        saveJob: function(data, callback)
        {
            callback(22);
        },
        deleteJob: function(data){},
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
        $provide.value('$routeParams', mockRoute);
        $provide.value('snapHeightOnclick', {});
    }));

    // Compile the directive using a mock scope
    beforeEach(inject(function($rootScope, _$compile_)
    {
        $scope = $rootScope.$new();
        $compile = _$compile_;

        $scope.job = { JobInfo_Id: 22 };
    }));



    var create = function()
    {
        var element, compiledElem;

        element = angular.element('<job job-data="job"></job>');
        compiledElem = $compile(element)($scope);

        $scope.$digest();

        return compiledElem.isolateScope();
    };



    /*====================================*\
        #OnLoad
    \*====================================*/

    describe('OnLoad', function()
    {
        it('should get StatusTypes', function()
        {
            var isoScope = create();
            expect(isoScope.statusTypes).toBe(mockStatusTypes);
        });

        it('should set default mode to job--edit for objects with an id of -1', function()
        {
            $scope.job = { JobInfo_Id: -1 };
            var isoScope = create();
            expect(isoScope.mode).toBe('job--edit');
        });

        it('should set default mode to job--view for objects with an id greater than -1', function()
        {
            var isoScope = create();
            expect(isoScope.mode).toBe('job--view');
        });
    });



    /*====================================*\
        #Time Passed
    \*====================================*/

    describe('TimePassed', function()
    {

        it('should display future dates as today', function()
        {
            //setup
            var now = new Date();
            now.setDate(now.getDate()+7);

            // create
            $scope.job.DateApplied = now;
            var isoScope = create();

            //No days passed
            expect(isoScope.jobData.TimePassed).toBe('Today');
            expect(isoScope.jobData.TimePassedLabel).toBe('');
        });

        it('should display Today', function()
        {
            //setup
            var now = new Date();

            // create
            $scope.job.DateApplied = now;
            var isoScope = create();

            //No days passed
            expect(isoScope.jobData.TimePassed).toBe('Today');
            expect(isoScope.jobData.TimePassedLabel).toBe('');
        });

        it('should display DAYS passed', function()
        {
            //setup
            var now = new Date();
            now.setDate(now.getDate()-3);

            // create
            $scope.job.DateApplied = now;
            var isoScope = create();

            //three days passed
            expect(isoScope.jobData.TimePassed).toBe(3);
            expect(isoScope.jobData.TimePassedLabel.toLowerCase()).toMatch('days');
        });

        it('should display MONTHS passed', function()
        {
            //setup
            var now = new Date();
            now.setMonth(now.getMonth()-3);

            // create
            $scope.job.DateApplied = now;
            var isoScope = create();

            //three days passed
            expect(isoScope.jobData.TimePassed).toBe(3);
            expect(isoScope.jobData.TimePassedLabel.toLowerCase()).toMatch('months');

        });

        it('should display YEARS passed', function()
        {
            //setup
            var now = new Date();
            now.setFullYear(now.getFullYear()-3);

            // create
            $scope.job.DateApplied = now;
            var isoScope = create();

            //three days passed
            expect(isoScope.jobData.TimePassed).toBe(3);
            expect(isoScope.jobData.TimePassedLabel.toLowerCase()).toMatch('years');

        });

    });


    /*====================================*\
        #Switching modes
    \*====================================*/

    describe('Switch Modes', function()
    {
        it('should siwtch to job--view', function()
        {
            var isoScope = create();
            isoScope.switchMode('job--view')

            expect(isoScope.mode).toBe('job--view');
            expect(isoScope.ngClass).toContain('job--view');
            expect(isoScope.template).toBe('directives/Job/partials/view.html');
        });

        it('should siwtch to job--view-expand', function()
        {
            var isoScope = create();
            isoScope.switchMode('job--view-expand')

            expect(isoScope.mode).toBe('job--view-expand');
            expect(isoScope.ngClass).toContain('job--view-expand');
            expect(isoScope.template).toBe('directives/Job/partials/view.html');
        });

        it('should siwtch to job--view-edit', function()
        {
            var isoScope = create();
            isoScope.switchMode('job--edit')

            expect(isoScope.mode).toBe('job--edit');
            expect(isoScope.ngClass).toContain('job--edit');
            expect(isoScope.template).toBe('directives/Job/partials/edit.html');
        });

    });


    /*====================================*\
        #DataBase events
    \*====================================*/

    describe('DataBase events', function()
    {
        it('should get newId from DB on Save', function()
        {
            var isoScope = create();
            isoScope.save();

            expect(isoScope.jobData.JobInfo_Id).toBe(22);// from mockRepo
            // expect(isoScope.mode).toBe('job--view-expand');
        });

        it('should delete or switch mode on Cancel', function()
        {
            // Should delete
            $scope.job = { JobInfo_Id: -1};
            var isoScope = create();

            spyOn(isoScope, '$emit');
            isoScope.cancel();
            expect(isoScope.$emit).toHaveBeenCalled();


            // Should switch
            $scope.job = { JobInfo_Id: 22};
            var isoScope = create();

            spyOn(isoScope, 'switchMode');
            isoScope.cancel();
            expect(isoScope.switchMode).toHaveBeenCalled();
        });

        it('should call delete', function()
        {
            var isoScope = create();

            spyOn(isoScope, '$emit');
            spyOn(window, 'confirm').and.callFake(function() { return true; });
            isoScope.delete();

            expect(isoScope.$emit).toHaveBeenCalled();
        });
    });



});