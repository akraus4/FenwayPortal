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

        return getManager().getRepository(AgileSprint).find({ relations: ["agile_system"], where: { agile_system: systemId } });
    }

    static getAllStoriesWithUsersBySprint(sprintId) {
        console.log("Sprint Ids = " + sprintId);
        // let stories = getManager().getRepository(AgileStory).find({ relations: ["agile_sprint"] });

        return getManager().getRepository(AgileStory).find({ relations: ["agile_sprint"] });
    }

    static saveSystem(system) {
        console.log("System = " + system);
        system = JSON.parse(system);

        return getManager().insert(AgileSystem, { 
            agile_system_name: system.agile_system_name,
            agile_system_type: system.agile_system_type,
            work_team: system.work_team,
            active: system.active
        });
    }

    static updateSystem(system) {
        console.log("System = " + system);
        system = JSON.parse(system);

        return getManager().update(AgileSystem, system.agile_system_id, { 
            agile_system_name: system.agile_system_name,
            agile_system_type: system.agile_system_type,
            work_team: system.work_team,
            active: system.active
        });
    }

    static async getAllTeamMembersByTeam(teamId) {
        return getManager().getRepository(WorkTeamMember).find({ relations: ["work_team", "work_user"], where: { work_team: teamId } });
    }

    // static async getAllTeamMembersByTeam(systemId) {
    //     const system = await getManager().getRepository(AgileSystem).findOne({ relations: ["work_team"], where: { agile_system_id: systemId } });
    //     const teamMembers = await getManager().getRepository(WorkTeamMember).find({ relations: ["work_team", "work_user"], where: { work_team: system.work_team } });
    //     const systemUsers = await getManager().getRepository(AgileSystemUser).find({ relations: ["agile_system", "work_team_member", "work_team_member.work_user"], where: { agile_system: systemId } });
    //     var i = 0;
    //     var j = 0;
    //     var newTeamMembers;
    //     // for (i = 0, i > teamMembers.length, i++) {
    //     //     for (j = 0, j > systemUsers.length, j++) {
    //     //         if (systemUsers[j].work_team_member.work_team_member_id == teamMembers[i].work_team_member_id) {
    //     //             let teamMember = {
    //     //                 agile_system_user: {
    //     //                     agile_system_user_id: systemUsers[j].agile_system_user_id,
    //     //                     agile_system_user_name: systemUsers[j].agile_system_user_name,
    //     //                     work_team_member: {
    //     //                         work_team_member_id: teamMembers[i].work_team_member_id,
    //     //                         full_name: teamMembers[i].work_user.firstname + ' ' + teamMembers[i].work_user.lastname,
    //     //                         work_user: teamMembers[i].work_user,
    //     //                         work_team: teamMembers[i].work_team,
    //     //                     }
    //     //                 }
    //     //             }
    //     //             newTeamMembers.push(teamMember);
    //     //         }
    //     //     }
    //     // }
    //     for (let teamMember of teamMembers) {
    //         for (let systemUser of systemUsers) {
    //             if (systemUser.work_team_member.work_team_member_id == teamMember.work_team_member_id) {
    //                 let tm = {
    //                     agile_system_user: {
    //                         agile_system_user_id: systemUser.agile_system_user_id,
    //                         agile_system_user_name: systemUser.agile_system_user_name,
    //                         work_team_member: {
    //                             work_team_member_id: teamMember.work_team_member_id,
    //                             full_name: teamMember.work_user.firstname + ' ' + teamMember.work_user.lastname,
    //                             work_user: teamMember.work_user,
    //                             work_team: teamMember.work_team,
    //                         }
    //                     }
    //                 }
    //                 newTeamMembers.push(tm);
    //             }
    //         }
    //     }
    //     return;
    // }

    static getAllSystemUsersBySystem(systemId) {

        return getManager().getRepository(AgileSystemUser).find({ relations: ["agile_system", "work_team_member", "work_team_member.work_user"], where: { agile_system: systemId } });
    }
}


