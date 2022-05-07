import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { ImapService } from "../services/ImapService";

@Service()
//@Controller()
export class ImapController {
  constructor(
    @Inject() private imapService: ImapService,
  ) { }
  
  async getAllUsers(_req: Request, res: Response) {
    return res.json(await this.imapService.getByNameService("bb"));
  }
}

