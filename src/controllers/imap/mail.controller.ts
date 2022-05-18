import { Request, Response } from "express";
import { FetchMessageObject, ImapFlow } from "imapflow";
import { ImapAccount } from "../../data/models/ImapAccount";
const simpleParser = require('mailparser').simpleParser;
const imapEmailSample = "sampler0nothing@gmail.com";

export class ImapMailController {
  async currentTesterShit(_req: Request, _res: Response) {
    try {
      const paths = await getImapFolders();
      console.log(paths[0][1])
      const emails = await getEmailsByPath(paths[0][1]);
      const simpleEmail = await parseEmailObject(emails[0]);
      //console.log(emails);
      return _res.json(simpleEmail);
    }
    catch (err){ 
      return _res.json(err); }    
  };
}

//Register New Imap User
async function setImapFlow(address: string): Promise<ImapFlow> {
  try {
    let result = await ImapAccount.getByEmail(address);
    if (!result) { 
      throw new Error("Imap not found for address"); 
    };
    const imapClient = new ImapFlow({
      host: result.host,
      port: result.port,
      secure: true,
      auth: {
          user: result.email,
          pass: result.password
      },
      logger: false,
    });
    return imapClient;
  }
  catch (err) { 
    throw new Error("Setting Imap Flow Error"); 
  }   
}

//Get Imap Folders and Paths
async function getImapFolders(): Promise<string[][]> {
  const imapClient = await setImapFlow(imapEmailSample);
  try {
  await imapClient.connect(); 
  let list = await imapClient.listTree();
  await imapClient.logout();
  let paths = [];
  for (const folder of list.folders) {
    if (folder.folders) {
      for (const nested of folder.folders) {
        paths.push([
          nested.name,
          nested.path
        ]);
      }
    } 
  }
  if(!paths[0][0]) {throw Error();}
  return paths;
} catch (err) {
    throw new Error("Error finding Folders");
  }
}

//Get Emails by Path
async function getEmailsByPath(path: string): Promise<FetchMessageObject[]> { 
  const imapClient = await setImapFlow(imapEmailSample);
  await imapClient.connect(); 
  let messages = [];
  let lock = await imapClient.getMailboxLock(path);
  try {
    if(!await imapClient.mailboxOpen(path)){throw Error()};
    for await (let message of imapClient.fetch("1:*", {
      envelope: true,
      source: true,
      flags: true,
      labels: true,
      uid: true
    })) {
      messages.push(message);
    }
    lock.release();
    await imapClient.logout();
    return messages;
  } catch (err) { 
    throw new Error("finding emails error");
  }
}

async function parseEmailObject(email: FetchMessageObject):Promise<string> {
  try {
    let parsed = await simpleParser(email.source);
    //remove html
    return parsed.text;
  } catch (err) {
    throw new Error("parsing Error");
  }
}