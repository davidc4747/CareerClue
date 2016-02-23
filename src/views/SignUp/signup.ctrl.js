/*
* @Author: David
* @Date:   2016-02-03 11:26:46
* @Last Modified by:   David
* @Last Modified time: 2016-02-22 13:58:37
*/

angular.module('CareerClue.SignUp', ['Repository'])
    .controller('SignUpCtrl', ['$scope', 'Repository', '$location', function($scope, Repository, $location)
    {

        $scope.user = { name: '', email: '', password: '', repass: '' };
        $scope.errors = [];

        $scope.signUp = function()
        {
            $scope.errors = [];

            //Display error message for required fields
            if($scope.user.name == '' || $scope.user.email == ''
                || $scope.user.password == '' || $scope.user.repass == '')
            {
                $scope.errors.push({mess: 'Please fill in ALL fields'});
            }



            //If all fields are filled in, attempt to signUp the user
            Repository.signUp($scope.user, function(errors)
            {
                //Display errors to user
                $scope.errors = $scope.errors.concat(errors);

                //If no errors, Go to CareerClue.MultiJob
                if(errors.length == 0)
                    $location.path('/MultiJob/applied');
            });

        };



    }]);