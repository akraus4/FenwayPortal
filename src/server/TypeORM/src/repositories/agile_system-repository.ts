import { AgileSystem } from "../entities/agile_system";
import { AgileSprint } from "../entities/agile_sprint";
import { AgileStory } from "../entities/agile_story";
import { AgileSystemUser } from "../entities/agile_system_user";
import { WorkTeamMember } from "../entities/work_team_member";
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
        // const sprints = await getManager().getRepository(AgileSprint).find({relations: ["agile_system"], where: {agile_system: systemId} });
        // const sprints = await getManager().getRepository(AgileSprint).find({relations: ["agile_system"] });

        return getManager().getRepository(AgileSprint).find({relations: ["agile_system"], where: {agile_system: systemId} });
    }

    static getAllStoriesWithUsersBySprint(sprintId) {
        console.log("Sprint Ids = " + sprintId);
        // let stories = getManager().getRepository(AgileStory).find({ relations: ["agile_sprint"] });

        return getManager().getRepository(AgileStory).find({ relations: ["agile_sprint"] });
    }

    static getAllTeamMembersByTeam(teamId) {

        return getManager().getRepository(WorkTeamMember).find({ relations: ["work_team"] });
    }

    static getAllSystemUsersBySystem(systemId) {

        return getManager().getRepository(AgileSystemUser).find({ relations: ["agile_system", "work_team_member",  "work_team_member.work_user"], where: {agile_system: systemId} });
    }
}
