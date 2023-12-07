import { prisma } from "@/app/lib/prisma";

export async function GET(request){
    const data = await prisma.article.findMany();
    return new Response(JSON.stringify(data));
}