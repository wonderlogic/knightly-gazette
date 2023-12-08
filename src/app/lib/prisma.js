const { PrismaClient } = require("@prisma/client");

let prisma;

// Check the environment to decide how to initialize PrismaClient
if (process.env.NODE_ENV !== "production") {
    // In a non-production environment, reuse the PrismaClient instance if it exists
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            // Uncomment the next line to enable query logging for debugging
            // log: ["query"],
        });
    }
    prisma = global.prisma;
} else {
    // In a production environment, create a new PrismaClient instance
    prisma = new PrismaClient({
        // Uncomment the next line to enable query logging for debugging
        // log: ["query"],
    });
}

// Export the PrismaClient instance for use in the application
export { prisma };