import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne} from "typeorm";
import { WorkTeam } from "../entities/work_team";
import { AgileSprint } from "./agile_sprint";
import { agile_story } from "./agile_story";

@Entity({name : "agile_system"})
export class AgileSystem {

    @PrimaryColumn('uuid', {name : "agile_system_id"})
    agile_system_id: string;

    @Column("varchar", {name : "agile_system_name"})
    agile_system_name: string;

    @Column("varchar", {name : "agile_system_type"})
    agile_system_type: string;

    @Column("uuid", {name : "work_team_id"})
    work_team_id: string;

    @OneToMany(type => AgileSprint, agileSprint => agileSprint.agile_system)
    agile_sprints :AgileSprint[];
}




