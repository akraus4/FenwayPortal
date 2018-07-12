import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class work_dailyhours {

    @PrimaryGeneratedColumn()
    work_dailyhours_id: string;

    @Column()
    work_team_member_id: string;

    @Column()
    work_date: Date;

    @Column()
    hours: number;

}