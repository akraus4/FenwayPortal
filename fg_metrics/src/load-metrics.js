var config = require("../config/config");
var database = require("./metrics-db");

// Check that input filepath is provided
if (!process.argv[2]) {
  console.log("Please provide a filepath");
  process.exit(1);
}
console.log(`Loading metrics from ${process.argv[2]}`);

// Load filepath contents and parse data
var fs = require("fs");
var content = fs.readFileSync(process.argv[2]);
var data = JSON.parse(content);

// Send data to database load
database.loadMetrics(data);
