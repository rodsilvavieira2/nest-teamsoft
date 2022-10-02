import 'dotenv/config';
import NodeEnvironment from 'jest-environment-node';
import { promisify } from 'util';

import { exec } from 'child_process';

const execPromise = promisify(exec);

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default class PrismaTestEnvironment extends NodeEnvironment {
  dbUser: string;
  dbPass: string;
  dbHost: string;
  dbPort: string;
  dbName: string;

  async setup() {
    this.dbUser = process.env.TEST_DB_USER;
    this.dbPass = process.env.TEST_DB_PASSWORD;
    this.dbHost = process.env.TEST_DB_HOST;
    this.dbPort = process.env.TEST_DB_PORT;
    this.dbName = process.env.TEST_DB_NAME;

    const connectionString = `mysql://${this.dbUser}:${this.dbPass}@${this.dbHost}:${this.dbPort}/${this.dbName}`;

    process.env.DATABASE_URL = connectionString;
    this.global.process.env.DATABASE_URL = connectionString;

    await execPromise('npx prisma db push');

    return super.setup();
  }

  async teardown() {
    await prismaClient.$connect();

    await prismaClient.$queryRaw`DROP TABLE IF EXISTS addresses`;
    await prismaClient.$queryRaw`DROP TABLE IF EXISTS clients`;

    await prismaClient.$disconnect();
  }
}
