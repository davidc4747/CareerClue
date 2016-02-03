/*
* @Author: David
* @Date:   2016-02-03 11:31:19
* @Last Modified by:   David
* @Last Modified time: 2016-02-03 11:53:28
*/

describe('SignUp Module', function()
{
    // angular vars
    var $controller,
        $rootScope,
        $scope;

    // mmock vars
    var mockUser = { name: 'bob', password: '1234', remember: false };
    var mockRepo = {

    };


    // Set up vars for testing
    beforeEach(function()
    {
        module('jobTrack.SignUp');
        inject(function(_$controller_, _$rootScope_)
        {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
        });

        $scope = $rootScope.$new();
        $controller('SignUpCtrl', { '$scope': $scope, 'Repository': mockRepo })
    });





    xit('should display errors', function()
    {
        //call $scope.signUp() with an invalid user

    });

    xit('should sign in the new user if valid', function()
    {

    });

    xit('should switch view to jobTrack.MultiJob', function()
    {

    });

});