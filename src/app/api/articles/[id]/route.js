import { prisma } from "@/app/lib/prisma";

/**
 * Asynchronously retrieves a unique article from the database based on the provided ID.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * @param {Object} context - An object containing route parameters.
 * @param {Object} context.params - Parameters extracted from the route, containing the article's ID.
 * 
 * @return {Response} - An HTTP Response object with the fetched article data.
 */

export async function GET(request, { params }) {
    // Fetching a unique article from the database using Prisma
    const data = await prisma.article.findUnique({
        where: {
            id: params.id // Using the ID from the route parameters to find the article
        }
    });

    // Returning the article data as a JSON response
    return new Response(JSON.stringify(data));
}