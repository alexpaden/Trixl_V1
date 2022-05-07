import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class ImapUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    static findManyByName(name: string) {
        return this.createQueryBuilder("imapuser")
            .where("imapuser.name = :name", { name })
            .getMany();
    }
}