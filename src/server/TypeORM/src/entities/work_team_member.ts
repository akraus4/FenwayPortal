import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class work_team_member {

    @PrimaryGeneratedColumn()
    work_team_member_id: string;

    @Column()
    work_team_id: string;

    @Column()
    work_user_id: string;

    @Column()
    expected_hours: string;

}