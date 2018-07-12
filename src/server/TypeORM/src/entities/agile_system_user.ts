import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class agile_system_user {

    @PrimaryGeneratedColumn()
    agile_system_user_id: string;

    @Column()
    agile_system_user_name: string;

    @Column()
    agile_system_id: string;

    @Column()
    work_team_member_id: string;

    @Column()
    work_user_id: string;

}