import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class EmailAccount extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tag: string

    @Column({unique:true})
    email: string
}