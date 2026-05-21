import type { Knex } from "knex";
import path from "path";

const root = process.cwd();

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: path.join(root, "src/storage/database.sqlite"),
  },
  useNullAsDefault: true,

  migrations: {
    directory: path.join(root, "src/database/migrations"),
  },
};

export default config;
