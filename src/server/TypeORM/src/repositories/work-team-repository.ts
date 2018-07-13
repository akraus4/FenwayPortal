import { AgileSystem } from "../entities/agile_system";
import { AgileSprint } from "../entities/agile_sprint";
import { WorkTeam } from "../entities/work_team";
import { getManager } from "typeorm";

export class WorkTeamRepo {

    getAllWorkTeams() {
      // get Work_User repository and find all work_users.

      return getManager().getRepository(WorkTeam).find();

  }
}
