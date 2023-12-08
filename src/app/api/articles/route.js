import { prisma } from "@/app/lib/prisma";

/**
 * Asynchronously retrieves multiple articles from the database.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * 
 * @return {Response} - An HTTP Response object with the fetched articles data.
 */

export async function GET(request) {
    // Fetching multiple articles from the database using Prisma
    const data = await prisma.article.findMany();

    // Returning the articles data as a JSON response
    return new Response(JSON.stringify(data));
}