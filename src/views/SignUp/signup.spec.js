/*
* @Author: David
* @Date:   2016-02-03 11:31:19
* @Last Modified by:   David
* @Last Modified time: 2016-02-04 08:53:39
*/

describe('SignUp Module', function()
{
    // angular vars
    var $controller,
        $rootScope,
        $location,
        $scope;

    // mmock vars
    var mockUser = { name: 'bob', email: 'new@email.com', password: '1234', repass: '1234'};
    var mockRepo = {
        signUp: function(user, callback)
        {
            var errors = [];
            if(user.email == 'test@email.com')
                errors.push({mess: 'Email address already exists'});

            if(user.password != user.repass)
                errors.push({mess: 'Passwords dont match'});

            callback(errors);
        }
    };


    // Set up vars for testing
    beforeEach(function()
    {
        module('CareerClue.SignUp');
        inject(function(_$controller_, _$rootScope_, _$location_)
        {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $location =  _$location_;
        });

        $scope = $rootScope.$new();
        $controller('SignUpCtrl', { '$scope': $scope, 'Repository': mockRepo })
    });





    xit('should validate that ALL fields are filled in', function()
    {
        //Call $scope.signUp with a blank user
        $scope.user =  { name: '', email: '', password: '', repass: '' };
        $scope.signUp();

        expect($scope.errors.length).toEqual(1);
    });

    it('should display errors from Repository', function()
    {
        //call $scope.signUp() with an invalid user
        $scope.user = { name: 'bob', email: 'test@email.com', password: '1234', repass: '12wefwe34'};
        $scope.signUp();

        expect($scope.errors.length).toBeGreaterThan(0);
    });

    it('should switch the current view', function()
    {
        spyOn($location, 'path').and.callFake(function(){});

        // call $scope.signUp() with a valid user
        $scope.user = { name: 'bob', email: 'new@email.com', password: '1234', repass: '1234'};
        $scope.signUp();

        expect($location.path).toHaveBeenCalled();
    });

});