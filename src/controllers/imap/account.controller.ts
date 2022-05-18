import { Request, Response } from "express";
import { ImapAccount } from "../../data/models/ImapAccount";

export class ImapAccountController {

  //Register New Imap User
  async register(_req: Request, _res: Response) {
    try {
      console.log(_req.body);
      const imapUser = new ImapAccount().newX(
        _req.body.tagname, 
        _req.body.email, 
        _req.body.password, 
        _req.body.host, 
        _req.body.port
      );
      let result = await imapUser.save();
      return _res.json(result);
    }
    catch (err){ return _res.json(err); }   
  }

  //Get All Imap Users
  async getAll(_req: Request, res: Response) { 
    return res.json(await ImapAccount.find()); 
  }

  //Get Imap User(s) by tagname
  async getByTag(req: Request, res: Response) {
    try {
      const imapUser = await ImapAccount.getByTag(req.params.tag);
      return res.json(imapUser);
    }
    catch (err){ return res.json(err); }    
  };

  //Get Imap User by email address
  async getByEmail(req: Request, res: Response) {
    try {
      const imapUser = await ImapAccount.getByEmail(req.body.email);
      return res.json(imapUser);
    }
    catch (err){ return res.json(err); }    
  };

  //Posts some random data to db as imap users
  async seedShit(_req:Request, res: Response) {
    try {
      const imap1 = new ImapAccount().newX("aleasdx dd", "email@d.com", "pass", "host", 88);
      await imap1.save();
      const imap2 = new ImapAccount().newX("alasdasdsex dd", "emasil@d.com", "padddss", "host", 88);
      let result = await imap2.save();
      return res.json(result);
    }
    catch (err){ return res.json(err); }   
  };

}
