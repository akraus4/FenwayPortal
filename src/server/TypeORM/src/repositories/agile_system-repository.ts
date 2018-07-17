import { AgileSystem } from "../entities/agile_system";
import { AgileSprint } from "../entities/agile_sprint";
import { WorkTeam } from "../entities/work_team";
import { getManager } from "typeorm";

export class AgileSystemRepo {

    static getAllAgileSystems() {
        return getManager().getRepository(AgileSystem).find({ relations: ["work_team"] });
    }
    static getAllWorkTeams() {
        return getManager().getRepository(WorkTeam).find();
    }

    static getAllSprintsBySystem(systemId) {
        return getManager().getRepository(AgileSprint).find();
    }
}
