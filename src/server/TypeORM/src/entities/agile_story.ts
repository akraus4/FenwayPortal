import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class agile_story {

    @PrimaryGeneratedColumn()
    agile_story_id: string;

    @Column()
    agile_story_name: string;

    @Column()
    agile_sprint_id: string;

    @Column()
    story_description: string;

    @Column()
    story_type: string;

    @Column()
    story_status: string;

    @Column()
    story_points: string;

}