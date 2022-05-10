import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ImapUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tagname: string

    @Column()
    email: string

    @Column()
    password: string

    static getByTagName(tagname: string) {
        return this.createQueryBuilder("imapuser")
            .where("imapuser.tagname = :tagname", { tagname })
            .getMany();
    }

    public newX (tagname: string, email: string, password: string){
        const imapUser = new ImapUser();
        imapUser.tagname = tagname;
        imapUser.email = email;
        imapUser.password = password;
        return imapUser;
    }
}