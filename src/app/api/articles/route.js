import { PrismaClient } from "@prisma/client";

export async function GET(request){
    const prisma = new PrismaClient();
    const data = await prisma.article.findMany();
    prisma.$disconnect;
    return new Response(JSON.stringify(data));
}