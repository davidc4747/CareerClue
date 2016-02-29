/*
* @Author: David
* @Date:   2016-02-28 08:07:43
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 07:48:30
*/

angular.module('BusinessRules')
    .service('JobRules', ['CallStoredProcedure', 'DBConstants', function(sp, dbConst)
    {


        this.getUserJobs = function(callback)
        {
            // Setup Stored procedure data
            var postData =
            {
                fName: dbConst.SP_JOB_BY_USERID,
                params: ["User_Id"],
                actionType: 'select',
                loginRequired: true
            };

            sp(postData, callback);
        };


        this.saveJob = function(job, callback)
        {
            // Setup Stored procedure data
            var postData =
            {
                fName: dbConst.SP_JOB_SAVE,
                params: [
                    "User_Id",
                    job.JobInfo_Id,
                    job.CompanyName || '',
                    job.CompanySite || '',
                    job.Job_Title || '',
                    job.Company_Address || '',
                    job.TravelTime || 0,
                    job.DateApplied || new Date().toISOString(),
                    job.Source || '',
                    job.Source_Link || '',
                    job.Job_Rating || 0,
                    job.JobDescrip_Notes || '',
                    job.Company_Notes || '',
                    job.JobStatus_Name || 'applied',
                ],
                actionType: 'select',
                loginRequired: true
            };

            sp(postData, function(data)
            {
                console.log(data);
                var jobId = data[0]["JobId"] || null;

                callback(jobId);
            });
        };



    }]);