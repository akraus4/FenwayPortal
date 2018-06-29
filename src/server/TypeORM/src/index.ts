import "reflect-metadata";
import {createConnection, ConnectionOptions} from "typeorm";
import {agile_sprint} from "./entity/agile_sprint";
import {agile_story_agile_system_user} from "./entity/agile_story_agile_system_user";
import {agile_story} from "./entity/agile_story";
import {agile_system_user} from "./entity/agile_system_user";
import {agile_system} from "./entity/agile_system";
import {work_dailyhours} from "./entity/work_dailyhours";
import {work_team_member} from "./entity/work_team_member";
import {work_team} from "./entity/work_team";
import {work_user} from "./entity/work_user";
const config = require('../ormconfig.json')


createConnection({
    type: "mysql",
    host: "52.55.14.143",
    port: 3306,
    username: "fg_user_dev2",
    password: "6UhjVvAgM_Jm",
    database: "fg_metrics_dev2",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    
    let userRepository = connection.getRepository(work_user);

    let allUsers = await userRepository.find();
    console.log("All users from the db: ", allUsers);

    
}).catch(error => console.log(error));