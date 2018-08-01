var config = {
  servicenow: {
    instance: "fenwaygroupdemo1",
    user: "web.service",
    password: "fgservice"
    //        week_starts_on: '2018/01/01', // optional - will override number_of_days
    //        number_of_days: 30 // optional - default is 30 days
  },
  database: {
    host: "52.55.14.143",
    user: "fg_user_dev",
    password: "b_cH0RT1rH_S",
    database: "fg_metrics_dev"
  }
};

module.exports = config;
