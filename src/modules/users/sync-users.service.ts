import axios from "axios";
import fs from "fs";
import path from "path";
import { userRepository } from "./user.repository";
import { Report } from "../../types/index";

export async function syncUsersService(): Promise<Report | void> {
  const start = Date.now();

  const report: Report = {
    timestamp: new Date().toISOString(),
    totalFetched: 0,
    inserted: 0,
    updated: 0,
    ignored: 0,
    errors: 0,
    durationMs: 0,
  };

  try {
    const response = await axios.get("https://randomuser.me/api/?results=150");

    const users = response.data.results;

    report.totalFetched = users.length;
    for (const user of users) {
      try {
        const age = user.dob.age;

        if (age < 18) {
          report.ignored++;
          continue;
        }

        const formattedUser = {
          email: user.email,
          gender: user.gender,
          title: user.name.title,
          firstName: user.name.first,
          lastName: user.name.last,
          age,
          phone: user.phone,
          cell: user.cell,
          nat: user.nat,
          location: JSON.stringify(user.location),
          login: JSON.stringify(user.login),
          picture: JSON.stringify(user.picture),
          dob: JSON.stringify(user.dob),
          registered: JSON.stringify(user.registered),
        };

        const exists = await userRepository.findByEmail(formattedUser.email);

        if (exists) {
          await userRepository.update(formattedUser.email, formattedUser);
          report.updated++;
        } else {
          await userRepository.create(formattedUser);
          report.inserted++;
        }
      } catch (err) {
        console.log(err);
        report.errors++;
      }
    }

    return report;
  } catch (err) {
    console.log(err);
    throw new Error("Erro ao sincronizar usuários");
  } finally {
    const end = Date.now();
    report.durationMs = end - start;

    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    const fileName = `report-${Date.now()}.json`;

    fs.writeFileSync(
      path.join(logsDir, fileName),
      JSON.stringify(report, null, 2),
    );
  }
}
