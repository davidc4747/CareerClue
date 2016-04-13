/*
* @Author: David
* @Date:   2016-03-08 07:54:04
* @Last Modified by:   David
* @Last Modified time: 2016-04-13 17:14:09
*/

angular.module('CareerClue.Settings', ['Repository'])
    .controller('SettingsCtrl', ['$scope', 'Repository', function($scope, Repository)
    {

        // get user info from DB
        Repository.userInfo(function(user)
        {
                $scope.user = user;
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
            $scope.userPassErrors = [];
            $scope.savedPass = false;

            // Password error
            if($scope.user.newPass !== $scope.user.rePass)
                $scope.userPassErrors.push({mess: 'Passwords do not match'});

            if($scope.user.newPass.length < 3)
                $scope.userPassErrors.push({mess: 'New password needs to be longer than 3 characters'});


            if($scope.userPassErrors.length == 0)
            {
                Repository.updateUserPass($scope.user, function(isValid)
                {
                    if(isValid)
                    {
                        $scope.savedPass = true;

                        // Clear fields
                        $scope.user.curPass = '';
                        $scope.user.newPass ='';
                        $scope.user.rePass = '';
                        form.$setPristine();
                        form.$setUntouched();
                    }
                    else
                    {
                        $scope.userPassErrors.push({mess: 'Invalid `Current Password`'});
                    }
                });
            }


        };

    }]);