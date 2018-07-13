import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert} from "typeorm";
// import uuidv4 from "uuid/v4";

@Entity({name : "work_user"})
export class WorkUser {

    @PrimaryColumn('uuid', {name : "work_user_id"})
    work_user_id: string;

    @Column("varchar", {name : "firstname"})
    firstname: string;

    @Column("varchar", {name : "lastname"})
    lastname: string;

    @Column("varchar", {name : "email"})
    email: string;

    // @BeforeInsert()
    // addId() {
    //     this.work_user_id = uuidv4();
    // }

}