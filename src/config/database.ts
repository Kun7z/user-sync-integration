import knex from "knex";
import path from "path";

const dbPath = path.resolve(process.cwd(), "src/storage/database.sqlite");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

export { db };
