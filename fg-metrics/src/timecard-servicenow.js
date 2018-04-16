var config = require('../config/config')

var GlideRecord = require('servicenow-rest').gliderecord;

// Get list of projects
exports.getProjects = () => {
    return new Promise((resolve, reject) => {
        var gr = new GlideRecord(config.servicenow.instance,'pm_project',config.servicenow.user,config.servicenow.password,'v2')
        gr.setReturnFields('sys_id,number,short_description');
        gr.addEncodedQuery('active=true');
        gr.query().then(function(result){ //returns promise 
            resolve(result);
        }).catch(() => {
            reject();
        })
    }) 
}

// Get list of users
exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        var gr = new GlideRecord(config.servicenow.instance,'sys_user',config.servicenow.user,config.servicenow.password,'v2')
        gr.setReturnFields('sys_id,first_name,last_name,email');
        gr.addEncodedQuery('active=true');
        gr.query().then(function(result){ //returns promise 
            resolve(result);
        }).catch(() => {
            reject();
        })
    }) 
}

// Get list of timecards
exports.getTimecards = () => {
    return new Promise((resolve, reject) => {
        var week_starts_on;
        if (config.servicenow.week_starts_on) {
            week_starts_on = config.servicenow.week_starts_on;
        } else {
            var days = config.servicenow.number_of_days ? config.servicenow.number_of_days : 30; // default to 30 days past
            var startdate = new Date();
            startdate.setDate(startdate.getDate() - days);
            week_starts_on = startdate.getFullYear() + "/" + (startdate.getMonth() + 1) + "/" + startdate.getDate();
        }

        var gr = new GlideRecord(config.servicenow.instance,'time_card',config.servicenow.user,config.servicenow.password,'v2')
        gr.setReturnFields('user.sys_id,user.first_name,user.last_name,user.email,u_pay_period,total,week_starts_on,u_week_ends_on,saturday,sunday,monday,tuesday,wednesday,thursday,friday,resource_plan.sys_id,resource_plan.short_description');
        gr.addEncodedQuery('week_starts_on>=' + week_starts_on);
        // Use gr.setLimit(10); if testing
        gr.query().then(function(result){ //returns promise 
            resolve(result);
        }).catch(() => {
            reject();
        })
    }) 
}

