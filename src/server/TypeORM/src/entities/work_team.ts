import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class WorkTeam {

    @PrimaryGeneratedColumn()
    work_team_id: string;

    @Column()
    work_team_name: string;

    @Column()
    project_namework_team: string;

    @Column()
    project_name: string;

}