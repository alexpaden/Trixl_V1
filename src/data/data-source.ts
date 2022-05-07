import { DataSource } from "typeorm"
import { ImapUser } from "./models/ImapUser";

export const AppDataSource = new DataSource({
  "type": "sqlite",
  "database": "database.sqlite",
  "synchronize": true,
  "logging": false,
  "entities": [ImapUser],
  "migrations": [
    "migrations/*.ts"
  ],
});