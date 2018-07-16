import "reflect-metadata";
import {createConnection, ConnectionOptions} from "typeorm";
import * as express from 'express';
import * as bodyParser from "body-parser";
import {AgileSprint} from "./entities/agile_sprint";
import {agile_story_agile_system_user} from "./entities/agile_story_agile_system_user";
import {agile_story} from "./entities/agile_story";
import {agile_system_user} from "./entities/agile_system_user";
import {AgileSystem} from "./entities/agile_system";
import "reflect-metadata";
import {work_dailyhours} from "./entities/work_dailyhours";
import {work_team_member} from "./entities/work_team_member";
import {WorkTeam} from "./entities/work_team";
import {WorkUser} from "./entities/work_user";
import { Request, Response } from "express";


const config = require('../ormconfig.json')


/**
 * Controllers (route handlers).
 */
import * as empController from "./controllers/employee-controller";
import * as wUserController from "./controllers/work_user-controller";
import * as metController from "./controllers/metricsController";


 
/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
 



/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
 

/**
 * Primary app routes.
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/GetAllEmployees", empController.getAllEmployees);
app.get("/GetAllWorkUsers", wUserController.getAllWorkUsers);
app.get("/getAllAgileSystems", metController.getAllAgileSystems);



/**
 * Create connection to DB using configuration provided in 
 * appconfig file.
 */
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "PORTAL",
    entities: [
        __dirname + "/entity/*.ts", WorkUser, AgileSystem
    ],
    synchronize: true,
    logging: false
}).then(async connection => {

}).catch(error => console.log(error));