/*
* @Author: David
* @Date:   2016-02-28 08:07:43
* @Last Modified by:   David
* @Last Modified time: 2016-02-29 12:55:04
*/

angular.module('BusinessRules')
    .service('JobRules', ['CallStoredProcedure', 'DBConstants', function(sp, dbConst)
    {

        this.getStatusTypes = function(callback)
        {
            // Setup Stored procedure data
            var postData =
            {
                fName: dbConst.SP_JOB_STATUS,
                params: [],
                actionType: 'select',
                loginRequired: false
            };

            sp(postData, callback);
        };

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

            sp(postData, function(jobs)
            {
                // Convert to proper types
                for(var i = 0; i < jobs.length; i++)
                {
                    jobs[i].Job_Rating = parseInt(jobs[i].Job_Rating);
                    jobs[i].TravelTime = parseInt(jobs[i].TravelTime);
                    jobs[i].DateApplied = new Date(jobs[i].DateApplied);
                }

                callback(jobs);
            });
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
                    job.JobStatus_Id || 1,
                ],
                actionType: 'select',
                loginRequired: true
            };

            // Convert to proper types
            sp(postData, function(data)
            {

                var jobId = data[0]["JobId"] || null;

                callback(jobId);
            });
        };

        this.deleteJob = function(job)
        {
            // Setup Stored procedure data
            var postData =
            {
                fName: dbConst.SP_JOB_DELETE,
                params: [
                    job.JobInfo_Id
                ],
                actionType: 'update',
                loginRequired: true
            };

            sp(postData, function(){});
        };



    }]);