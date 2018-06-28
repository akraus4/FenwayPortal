import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class agile_sprint {

    @PrimaryGeneratedColumn()
    agile_sprint_id: string;

    @Column()
    agile_sprint_name: string;

    @Column()
    agile_system_id: string;

    @Column()
    sprint_description: number;

    @Column()
    sprint_start_date: Date;

    @Column()
    sprint_end_date: Date;

}
