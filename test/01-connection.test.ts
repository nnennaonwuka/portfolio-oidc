import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { expect } from "chai";
import path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const TestDbConnection: PostgresConnectionOptions = {
  name: "default",
  type: "postgres",
  host: process.env.TEST_DB_HOST,
  port: Number(process.env.TEST_DB_PORT),
  username: process.env.TEST_DB_USERNAME,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  synchronize: true,
  logging: false,
  extra: {
    max: "100",
    min: "50",
  },
  entities: [path.join(__dirname, "../src/**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "../src/**/*.migration{.ts,.js}")],
  subscribers: [path.join(__dirname, "../src/**/*.subscriber{.ts,.js}")],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
async function connect(): Promise<Connection> {
  try {
    const conn = await createConnection(TestDbConnection);
    console.log("Connected to db");
    return conn;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

describe("DatabaseConnection", () => {
  let connection: Connection;

  before(async () => {
    connection = await connect();
  });

  it("should connect to the database", () => {
    // You can add specific test cases here
    expect(connection.isConnected).to.be.true;
  });
});
