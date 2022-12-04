import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const { user, company } = client;
export { user, company, client };
