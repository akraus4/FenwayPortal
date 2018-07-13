import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity({name : "agile_sprint"})
export class AgileSprint {

    @PrimaryColumn('uuid', {name : "agile_sprint_id"})
    agile_sprint_id: string;

    @Column("varchar", {name : "agile_sprint_name"})
    agile_sprint_name: string;

    @Column('uuid', {name : "agile_system_id"})
    agile_system_id: string;

    @Column("varchar", {name : "sprint_description"})
    sprint_description: number;

    @Column("varchar", {name : "sprint_start_date"})
    sprint_start_date: Date;

    @Column("varchar", {name : "sprint_end_date"})
    sprint_end_date: Date;

}
