var config = require("../config/config");

const mysql = require("mysql");
const uuidv1 = require("uuid/v1");

// Load metrics objects to database
exports.loadMetrics = metrics => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database
    });
    connection.connect(err => {
      if (err) throw err;
      processMetrics(connection, metrics);
      connection.end(err => {});
    });
  });
};

// Add or update a record in the database
var insertRecord = (connection, table, columns) => {
  var sql = `insert into ${table} (${Object.keys(columns)}) 
    values (${Object.keys(columns).map(x => '"' + columns[x] + '"')})
    on duplicate key update ${Object.keys(columns).map(
      x => x + '="' + columns[x] + '"'
    )}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
};

var table = "";
var columns = {};

const processMetrics = (connection, metrics) => {
  Object.keys(metrics).forEach(key => {
    if (key.startsWith("ref:")) {
      // Store the previous or parent table before starting child
      if (table && columns && Object.keys(columns).length > 0) {
        insertRecord(connection, table, columns);
        columns = {};
      }

      // Start loading children
      table = key.split(":")[1];
      // Convert single value to array if needed
      metrics[key] = [].concat(metrics[key] || []);
      // Call recursive for next table and for each value
      metrics[key].forEach(metric => {
        processMetrics(connection, metric);
      });
    } else {
      // store the column and value
      columns[key] = metrics[key];
    }
  });
  if (table && columns && Object.keys(columns).length > 0) {
    // save the record when done
    insertRecord(connection, table, columns);
    columns = {};
  }
};
