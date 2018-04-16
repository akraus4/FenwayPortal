var servicenow = require("./timecard-servicenow");
var database = require("./timecard-db");

servicenow.getTimecards().then(result => {
  database.postTimecards(result);
});
