import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class work_user {

    @PrimaryGeneratedColumn()
    work_user_id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

}