/*
* @Author: David
* @Date:   2016-02-27 08:54:42
* @Last Modified by:   David
* @Last Modified time: 2016-02-27 09:36:42
*/

describe('MultiJob Module', function()
{
    // angular vars
    var $rootScope,
        $scope,
        $controller;

    // mock Objectss
    var newJob = { JobInfo_Id: -1, CompanyName:'', JobStatus_Name: 'applied' },
        mockRepo = {
            getUserJobs: function(callback)
            {
                var jobs = [];
                for (var i=1; i<=13; i++)
                {
                    jobs.push({ JobInfo_Id: i});
                }
                callback(jobs);
            },
        };


    beforeEach(function()
    {
        module('CareerClue.MultiJob');

        inject(function(_$rootScope_, _$controller_)
        {
            // init var
            $rootScope = _$rootScope_;
            $controller = _$controller_;
        });

        // setup controler
        $scope = $rootScope.$new();
        spyOn($scope, '$on').and.callThrough();
        $controller('MultiJobCtrl', { '$scope': $scope, 'Repository': mockRepo, '$routeParams': {statusType: 'applied'} });
    });



    /*====================================*\
        #On Load
    \*====================================*/

    it('should filter jobs based on $routeParams', function()
    {
        expect($scope.statusFilter).not.toBe('');
        expect($scope.statusFilter).toBeDefined();
    });



    it('should get JobData from DB', function()
    {
        expect($scope.jobs.length).toBeGreaterThan(0);
    });



    // xit('should add a second search bar to bottom if more than X jobs are in the list', function()
    // {
    //     // :p idk how to test this, or if i should
    //     var x = 8;
    //     // expect($scope.jobs.length).toBeGreaterThan(x);
    //     // expect($scope.bottomSearch).toBe(true);
    // });





    /*====================================*\
        #Create Job
    \*====================================*/

    it('should create a new job directive when add button is clicked', function()
    {
        // Count jobs
        var jobCount = $scope.jobs.length;

        // add job
        $scope.createJob();

        //  Count again
        expect($scope.jobs.length).toBe(jobCount+1);
    });

    it('should not create a new job directive if one is already open',function()
    {
        // Count jobs
        var jobCount = $scope.jobs.length;

        // add job
        $scope.createJob();
        $scope.createJob();
        $scope.createJob();
        $scope.createJob();

        //  Count again
        expect($scope.jobs.length).toBe(jobCount+1);

    });

    it('should create a new job with specific default properties so it can be displayed', function()
    {
        // add job
        $scope.createJob();
        var newJob = $scope.jobs[0];

        // Check properties exit
        expect(newJob.JobInfo_Id).toBe(-1);
        expect(newJob.CompanyName).toBe('');
        expect(newJob.JobStatus_Name).not.toBe('');
    });


    /*====================================*\
        #Remove Job
    \*====================================*/

    it('should remove job directive that trigger event', function()
    {
        var subScope = $scope.$new();
        subScope.$emit('removeJob', { Id: 2 });

        expect($scope.$on).toHaveBeenCalled();
        expect($scope.jobs).not.toContain({ JobInfo_Id: 2});
    });


    /*====================================*\
        #Drag Drop
    \*====================================*/

    it('should change jobStatus when dropped', function()
    {
    });
});