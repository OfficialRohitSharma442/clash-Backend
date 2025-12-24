import { PrismaClient } from "@prisma/client/extension";
import { error } from "node:console";
const prisma = new PrismaClient({
    log: ["query","error"],
    errorFormat: "pretty",
});

export default prisma;