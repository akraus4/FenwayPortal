import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class agile_system {

    @PrimaryGeneratedColumn()
    agile_system_id: string;

    @Column()
    agile_system_name: string;

    @Column()
    agile_system_type: string;

    @Column()
    work_team_id: string;

}