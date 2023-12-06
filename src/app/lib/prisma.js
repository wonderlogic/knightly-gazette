const { PrismaClient } = require("@prisma/client");

let prisma;

if (process.env.NODE_ENV !== "production") {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            //log: ["query"], //only uncomment if you want to debug
        });
    }
    prisma = global.prisma;
} else {
    prisma = new PrismaClient({
        //log: ["query"], //only uncomment if you want to debug
    });
}

export { prisma };