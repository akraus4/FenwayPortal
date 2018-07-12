import { WorkUser } from "../entities/work_user";
import { getManager } from "typeorm";
 
export class WorkUserRepo {
 
    getAllWorkUsers() {
        // get Work_User repository and find all work_users.
        
        return getManager().getRepository(WorkUser).find();
        
    }
}