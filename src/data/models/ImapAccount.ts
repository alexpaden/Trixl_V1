import { Entity, Column } from "typeorm"
import { EmailAccount } from "./EmailAccount"

@Entity()
export class ImapAccount extends EmailAccount {

    @Column()
    password: string

    @Column()
    host: string

    @Column()
    port: string

    @Column()
    etc: string

    static getByTag(tag: string) {
        return this.createQueryBuilder("imapuser")
            .where("imapuser.tag = :tag", { tag })
            .getMany();
    }

    static getByEmail(email: string) {
        return this.createQueryBuilder("imapuser")
            .where("imapuser.email = :email", { email })
            .getOne();
    }

    public newX (tag: string, email: string, password: string, host: string, port: string){
        const imapUser = new ImapAccount();
        imapUser.tag = tag;
        imapUser.email = email;
        imapUser.password = password;
        imapUser.host = host;
        imapUser.port = port;
        imapUser.etc = "random";
        return imapUser;
    }
}