import { Request, Response } from "express";
//import { Service } from "typedi";
import { ImapUser } from "../../data/models/ImapUser";

export class ImapUserController {

  //Register New Imap User
  async register(_req: Request, _res: Response) {
    try {
      console.log(_req.body);
      const imapUser = new ImapUser().newX(_req.body.tagname, _req.body.email, _req.body.password);
      let result = await imapUser.save();
      return _res.json(result);
    }
    catch (err){
      return _res.json(err);
    }   
  }

  //Get All Imap Users
  async getAll(_req: Request, res: Response) { 
    return res.json(await ImapUser.find()); 
  }

  //Get Imap User(s) by tagname
  async getByTag (req: Request, res: Response) {
    try {
      const imapUser = await ImapUser.getByTagName(req.params.tagname);
      return res.json(imapUser);
    }
    catch (err){
      return res.json(err);
    }    
  };

  //Posts some random data to db as imap users
  async seedShit(_req:Request, res: Response) {
    try {
      const imap1 = new ImapUser().newX("aleasdx dd", "email@d.com", "pass");
      await imap1.save();
      const imap2 = new ImapUser().newX("alasdasdsex dd", "emasil@d.com", "padddss");
      let result = await imap2.save();
      return res.json(result);
    }
    catch (err){
      return res.json(err);
    }   
  };

}
