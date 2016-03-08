/*
* @Author: David
* @Date:   2016-03-08 07:54:04
* @Last Modified by:   David
* @Last Modified time: 2016-03-08 10:20:15
*/

angular.module('CareerClue.Profile', ['Repository'])
    .controller('ProfileCtrl', ['$scope', 'Repository', function($scope, Repository)
    {

        // get user info from DB
        Repository.userInfo(function(data)
        {
            if(data.length > 0)
                $scope.user = data[0];
        });



        // update user info in DB
        $scope.updateUserInfo = function()
        {
            Repository.updateUserInfo($scope.user, function(errors)
            {
                $scope.userInfoErrors = errors;
            });
        };

        // update user password in DB
        $scope.updateUserPass = function(form)
        {
            Repository.updateUserPass($scope.user, function(errors)
            {
                $scope.userPassErrors = errors;

                if(errors.length == 0)
                {
                    // Clear fields
                    $scope.user.curPass = '';
                    $scope.user.newPass ='';
                    $scope.user.rePass = '';
                    form.$setPristine();
                    form.$setUntouched();
                }
            });
        };

    }]);