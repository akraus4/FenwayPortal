import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class agile_story_agile_system_user {

    @PrimaryGeneratedColumn()
    agile_story_agile_system_user_id: string;

    @Column()
    agile_story_id: string;

    @Column()
    agile_system_user_id: string;

    @Column()
    agile_system_user_story_points: string;

}