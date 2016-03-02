/*
* @Author: David
* @Date:   2016-03-01 09:07:48
* @Last Modified by:   David
* @Last Modified time: 2016-03-01 09:07:48
*/

describe('SideBar Directive', function()
{
    // angular vars
    var $scope,
        $compile;

    // mock vars
    var mockRepo = {
        getjobStatusCount: function(callback)
        {
            var statusTypes = [];
            for (var i=0; i < 5; i++)
            {
                statusTypes.push({ JobStatus_Id: i, JobStatus_Name: 'test status '+i, JobStatus_Count: i });
            }
            callback(statusTypes);
            return statusTypes;
        },
        userInfo: function(cb)
        {
            cb([{Username: 'test user'}]);
        },
    }


    beforeEach(function()
    {
        // Import the module we want to test
        // Import partials
        module('CareerClue.SideBar');
        module('directives/SideBar/sidebar.html');

        // Provide mock dependencies
        module(function($provide)
        {
            $provide.value('Repository', mockRepo);
        })

        // inject angular vars
        inject(function($rootScope, _$compile_)
        {
            $scope = $rootScope.$new();
            $compile = _$compile_;
        })
    });



    var create = function()
    {
        var element, compiledElem;

        element = angular.element('<side-bar></side-bar>');
        compiledElem = $compile(element)($scope);

        $scope.$digest();

        return compiledElem.isolateScope();
    };



    /*====================================*\
        #OnLoad
    \*====================================*/

    it('should display user Information', function()
    {
        var isoScope = create();
        expect(isoScope.userInfo).toBeDefined();
    });

    it('should add extra navItems using the statusTypes', function()
    {
        // init
        var isoScope = create();
        var navItems = isoScope.navItems;

        // get mock status types
        expect(navItems.length).toBeGreaterThan(0);
    });



    it('should display a counter for the num of job in each statusType', function()
    {
        // init
        var isoScope = create();
        var navItems = isoScope.navItems;

        expect(navItems.length).toBeGreaterThan(0);
        for (var i = 0; i < navItems.length; i++)// skils the first navItem
        {
            if(navItems[i].Id > 0)
                expect(navItems[i].count).toBeDefined();
        }

    });



    it('should expand and collapse a list of company names in its statusType', function()
    {

    });

});