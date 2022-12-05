import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const { user, company, job, applyJob } = client;
export { user, company, client, job, applyJob };
