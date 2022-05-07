import { Service } from "typedi";
import { ImapUser } from "../data/models/ImapUser";

@Service()
export class ImapService {
  constructor() {

  }

   async createImapUser(id: number, name: string): Promise<ImapUser | null>{
    const imapUser = new ImapUser();
    imapUser.id = id;
    imapUser.name = name;
    const result = await imapUser.save();

    return result;
   }

  async getByNameService(name: string): Promise<ImapUser[] | null> {
    await this.createImapUser(38, "bb");
    await this.createImapUser(36, "ab");
    await this.createImapUser(31, "bb");
    let result = await ImapUser.findManyByName(name);
    
    return result;
  }
}