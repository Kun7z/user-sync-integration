import { db } from "../../config/database";
import { FormattedUser } from "../../types/index";

export const userRepository = {
  async findAll() {
    return db("users").select("*");
  },

  async findByEmail(email: string) {
    return db("users").where({ email }).first();
  },

  async create(user: FormattedUser) {
    return db("users").insert(user);
  },

  async update(email: string, user: FormattedUser) {
    return db("users").where({ email }).update(user);
  },
};
