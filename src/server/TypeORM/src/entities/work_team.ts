import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class work_team {

    @PrimaryGeneratedColumn()
    work_team_id: string;

    @Column()
    work_team_name: string;

    @Column()
    project_namework_team: string;

    @Column()
    project_name: string;

}