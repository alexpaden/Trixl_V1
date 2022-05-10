import { DataSource } from "typeorm"
import { ImapAccount } from "./models/ImapAccount";

export const AppDataSource = new DataSource({
  "type": "sqlite",
  "database": "database.sqlite",
  "synchronize": true,
  "logging": false,
  "entities": [ImapAccount],
  "migrations": [
    "migrations/*.ts"
  ],
});