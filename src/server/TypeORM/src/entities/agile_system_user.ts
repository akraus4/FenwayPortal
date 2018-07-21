import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { AgileSystem} from "../entities/agile_system";
import { WorkTeamMember} from "../entities/work_team_member";
@Entity({name : "agile_system_user"})
export class AgileSystemUser {

    @PrimaryGeneratedColumn('uuid', {name : "agile_system_user_id"})
    agile_system_user_id: string;

    @Column("varchar", {name : "agile_system_user_name"})
    agile_system_user_name: string;

    // @Column()
    // agile_system_id: string;

    @ManyToOne(type => AgileSystem)
    @JoinColumn({name : "agile_system_id"})
    agile_system: AgileSystem;

    @ManyToOne(type => WorkTeamMember)
    @JoinColumn({name : "work_team_member_id"})
    work_team_member: WorkTeamMember;

    // @Column("varchar", {name : "work_team_member_id"})
    // work_team_member_id: string;

    // @Column("varchar", {name : "work_user_id"})
    // work_user_id: string;

}