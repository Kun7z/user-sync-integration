jest.mock("axios");
jest.mock("../../src/modules/users/user.repository");

import axios from "axios";
import { userRepository } from "../../src/modules/users/user.repository";
import { syncUsersService } from "../../src/modules/users/sync-users.service";

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedRepo = userRepository as jest.Mocked<typeof userRepository>;

describe("syncUsersService", () => {
  it("should handle update error", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [
          {
            email: "test@test.com",
            dob: { age: 25 },
            name: { title: "Mr", first: "John", last: "Doe" },
            gender: "male",
            phone: "123",
            cell: "456",
            nat: "BR",
            location: {},
            login: {},
            picture: {},
            registered: {},
          },
        ],
      },
    } as any);

    mockedRepo.findByEmail.mockResolvedValue({ id: 1 } as any);
    mockedRepo.update.mockRejectedValueOnce(new Error("DB error"));

    const report = await syncUsersService();

    expect(report?.errors).toBe(1);
    expect(report?.errorEmails).toHaveLength(1);
  });
  it("should register error when update fails", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [
          {
            email: "test@test.com",
            dob: { age: 25 },
            name: { title: "Mr", first: "John", last: "Doe" },
            gender: "male",
            phone: "123",
            cell: "456",
            nat: "BR",
            location: {},
            login: {},
            picture: {},
            registered: {},
          },
        ],
      },
    } as any);

    mockedRepo.findByEmail.mockResolvedValue({ id: 1 } as any);

    mockedRepo.update.mockRejectedValueOnce(new Error("DB error"));

    const report = await syncUsersService();

    expect(report?.errors).toBe(1);
    expect(report?.errorEmails).toEqual([
      {
        email: "test@test.com",
        error: expect.any(Error),
      },
    ]);
  });
  it("should register error when create fails due to missing email", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [
          {
            email: undefined,
            dob: { age: 25 },
            name: { title: "Mr", first: "John", last: "Doe" },
            gender: "male",
            phone: "123",
            cell: "456",
            nat: "BR",
            location: {},
            login: {},
            picture: {},
            registered: {},
          },
        ],
      },
    } as any);

    mockedRepo.findByEmail.mockResolvedValue(null as any);

    mockedRepo.create.mockRejectedValueOnce(
      new Error("NOT NULL constraint failed: users.email"),
    );

    const report = await syncUsersService();

    expect(report?.errors).toBe(1);
    expect(report?.errorEmails).toEqual([
      {
        email: undefined,
        error: expect.any(Error),
      },
    ]);
  });
});
