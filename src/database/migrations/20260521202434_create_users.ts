import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.string("email").primary();
    table.string("gender");
    table.string("title");
    table.string("firstName");
    table.string("lastName");
    table.integer("age");
    table.string("phone");
    table.string("cell");
    table.string("nat");
    table.text("location");
    table.text("login");
    table.text("picture");
    table.text("dob");
    table.text("registered");

    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
