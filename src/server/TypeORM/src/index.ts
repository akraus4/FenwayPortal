import "reflect-metadata";
import {createConnection} from "typeorm";
import {agile_sprint} from "./entity/agile_sprint";
import {agile_story_agile_system_user} from "./entity/agile_story_agile_system_user";
import {agile_story} from "./entity/agile_story";
import {agile_system_user} from "./entity/agile_system_user";
import {agile_system} from "./entity/agile_system";
import {work_dailyhours} from "./entity/work_dailyhours";
import {work_team_member} from "./entity/work_team_member";
import {work_team} from "./entity/work_team";
import {work_user} from "./entity/work_user";


createConnection().then(async connection => {

    const firstUser = await connection
    .getRepository(work_user)
    .createQueryBuilder("work_user")
    .getRawMany();
    console.log(work_user);
    





    
}).catch(error => console.log(error));

