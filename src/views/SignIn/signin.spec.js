/*
* @Author: David
* @Date:   2016-02-02 11:18:11
* @Last Modified by:   David
* @Last Modified time: 2016-02-04 08:53:34
*/

describe('SignIn Module', function()
{
    // angular vars
    var $rootScope,
        $scope,
        $location,
        $controller;

    // mock vars
    var mockUser = { name: 'bob', password: '1234', remember: false };
    var mockRepo = {
        signIn: function(user, callback)
        {
            var errors = [];
            if(user.name != mockUser.name && user.password != mockUser.password)
                errors.push({ mess: 'Invalid user'});
            callback(errors);
        }
    }



    beforeEach(function()
    {
        module('CareerClue.SignIn');

        inject(function(_$rootScope_, _$controller_, _$location_)
        {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $location = _$location_;
        });

        $scope = $rootScope.$new();
        $controller('SignInCtrl', { '$scope': $scope, 'Repository': mockRepo, '$location': $location });
    });





    it('should should switch the current view', function()
    {
        spyOn($location, 'path').and.callFake(function(){});

        //Call $scope.signIn with valid user
        $scope.user = mockUser;
        $scope.signIn();

        expect($scope.errors.length).toBe(0);
        expect($location.path).toHaveBeenCalled();
    });

    it('should validate that required fields are filled in', function()
    {
        //Call $scope.signin with a blank user
        $scope.user = { name: '', password: '', remember: false };
        $scope.signIn();

        expect($scope.errors.length).toBeGreaterThan(0);

        for(i in $scope.errors)
            expect($scope.errors[i].mess).toBeDefined();
    });

    it('should should display errors from Repository', function()
    {
        //Call $scope.signin with invalid user
        $scope.user = { name: 'qwdqfgqw', password: '12qwfrdfqf34', remember: false };
        $scope.signIn();

        expect($scope.errors.length).toBeGreaterThan(0);
    });

});