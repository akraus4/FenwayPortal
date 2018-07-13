import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert} from "typeorm";

@Entity({name : "agile_system"})
export class AgileSystem {

    @PrimaryColumn('uuid', {name : "agile_system_id"})
    agile_system_id: string;

    @Column("varchar", {name : "agile_system_name"})
    agile_system_name: string;

    @Column("varchar", {name : "agile_system_type"})
    agile_system_type: string;

    @Column('uuid', {name : "work_team_id"})
    work_team_id: string;

}




