/*
* @Author: David G Chung
* @Date:   2015-06-26 10:37:33
* @Last Modified by:   David
* @Last Modified time: 2016-04-13 11:33:07
*/

angular.module('BusinessRules')
    .service('UserRules', ['CallStoredProcedure', 'DBConstants', '$http', function(sp, dbConst, $http)
    {
        this.userInfo = function(callback)
        {
            var postData =
            {
                fName: dbConst.SP_USER_BY_ID,
                params: ["User_Id"],
                actionType: 'select',
                loginRequired: true
            };

            sp(postData, function(data)
            {
                var user = null;
                if(data.length > 0)
                    user = data[0];

                console.log("UserInfo:", user);
                callback(user);
            });
        };



        this.updateUserInfo = function(user, callback)
        {
            var postData =
            {
                fName: dbConst.SP_USER_UPDATE_INFO,
                params: ["User_Id", user.Username, user.User_Email],
                actionType: 'select',
                loginRequired: true
            };

            sp(postData, callback);
        };

        this.updateUserPass = function(user, callback)
        {
            // call php script
            var request = $http({
                method: 'post',
                url: 'php/AuthenticatorScript.php',
                data: {
                    'method': 'updateuserpass',
                    'username': user.Username,
                    'curpass': user.curPass,
                    'newpass': user.newPass,
                    'repass': user.rePass,
                }
            });

            // execute the callback function
            request.success(function(data)
            {
                console.log('UserRules.updateUserPass: ', data);
                var val = data === 'true';
                callback(val);
            });
        };


    }]);