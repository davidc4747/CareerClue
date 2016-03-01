/*
* @Author: David
* @Date:   2016-02-27 08:54:42
* @Last Modified by:   David
* @Last Modified time: 2016-02-27 09:36:42
*/

xdescribe('MultiJob Module', function()
{
    // angular vars
    var $rootScope,
        $scope,
        $controller;

    var mockJob = {},
        mockRepo = {};


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
        $controller('MultiJobCtrl', { '$scope': $scope, 'Repository': mockRepo});
    });


    describe('OnLoad', function()
    {
        xit('should get JobData from DB', function()
        {

        });

        xit('should add a second search bar to bottom if more than X jobs are in the list', function()
        {

        });
    });





    xit('should create a new job directive when add button is clicked', function()
    {

    });

    xit('should not create a new job directive if one is already open',function()
    {

    });





    xit('should filter jobs by Company name', function()
    {

    });

    xit('should pass JobData to job directive', function()
    {

    });


});