import { PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient({
    log: ["query", "error"],
    errorFormat: "pretty",
});
export default prisma;
