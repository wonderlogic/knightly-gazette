import { prisma } from "@/app/lib/prisma";
import path from 'path';
import fs from 'fs';

/**
 * DELETE - Handles the deletion of an article and its associated image, if any.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * @param {Object} context - Contains route parameters, including the article ID.
 * @return {Response} - An HTTP Response object indicating the result of the operation.
 */

export async function DELETE(request, context) {
    const { id } = context.params;

    // Retrieve the article from the database
    const article = await prisma.article.findUnique({
        where: { id },
    });

    if (!article) {
        return new Response(JSON.stringify({ error: "Article not found" }), { status: 400 });
    }

    // Delete the image file if it exists
    if (article.imageURL) {
        const imageFullPath = path.join(process.cwd(), 'public', article.imageURL);
        if (fs.existsSync(imageFullPath)) {
            fs.unlinkSync(imageFullPath);
        }
    }

    // Delete the article from the database
    try {
        await prisma.article.delete({
            where: { id },
        });

        return new Response(JSON.stringify({ message: "Article deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error('Error deleting article:', error);
        return new Response(JSON.stringify({ error: "Error deleting article" }), { status: 500 });
    }
}
