import { prisma } from "@/app/lib/prisma";
import path from 'path';
import fs from 'fs';

/**
 * PUT - Handles the update of an article along with its associated image, if any.
 * 
 * @param {Request} request - The incoming HTTP request object containing form data.
 * @param {Object} context - Contains route parameters, including the article ID.
 * @return {Response} - An HTTP Response object indicating the result of the operation.
 */

export async function PUT(request, context) {
    const { id } = context.params;

    // Parse the incoming form data
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const body = formData.get('body');
    const imageFile = formData.get('image');
    const imageRemoved = formData.get('imageRemoved') === 'true';

    // Validate the input data
    if (!title || !description || !body) {
        return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
    if (title.length > 80) {
        return new Response(JSON.stringify({ error: "Title exceeds maximum length of 80 characters" }), { status: 400 });
    }
    if (description.length > 200) {
        return new Response(JSON.stringify({ error: "Description exceeds maximum length of 200 characters" }), { status: 400 });
    }

    let imagePath = null;

    if (imageRemoved) {

        // Retrieve the article from the database
        const article = await prisma.article.findUnique({
            where: { id },
        });

        if (!article) {
            return new Response(JSON.stringify({ error: "Article not found" }), {
                status: 404,
            });
        }

        // Delete the image file if it exists
        if (article.imageURL) {
            const imageFullPath = path.join(process.cwd(), 'public', article.imageURL);
            if (fs.existsSync(imageFullPath)) {
                fs.unlinkSync(imageFullPath);
            }
        }
    
    }

    // Process the image file if it exists
    if (imageFile && imageFile.size > 0) {

        // Validate the file type
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(imageFile.type)) {
            return new Response(JSON.stringify({ error: "Invalid image format. Only JPEG and PNG are allowed." }), { status: 400 });
        }

        // Check if the image size is greater than 3 MB
        const maxImageSize = 3 * 1024 * 1024; // 3 MB in bytes
        if (imageFile.size > maxImageSize) {
            return new Response(JSON.stringify({ error: "Image file size exceeds the maximum limit of 3 MB." }), { status: 400 });
        }

        // Define the path to save the image
        const imagesDir = path.join(process.cwd(), 'public', 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
    
        const imageName = Date.now() + '-' + imageFile.name;
        imagePath = path.join('images', imageName);
    
        // Save the image file to the filesystem
        const imageFullPath = path.join(imagesDir, imageName);
    
        // Convert the ArrayBuffer to Buffer
        const buffer = Buffer.from(await imageFile.arrayBuffer());
    
        // Write the buffer to the file system
        fs.writeFileSync(imageFullPath, buffer);

    }

    // Update article in the database
    try {
        let updateData = {
            title,
            description,
            body
        };

        // Conditionally add the imageURL if it exists
        if (imagePath || imageRemoved) {
            updateData.imageURL = imagePath || null;
        }

        const updatedArticle = await prisma.article.update({
            where: { id },
            data: updateData,
        });

        return new Response(JSON.stringify(updatedArticle), { status: 200 });
    } catch (error) {
        console.error('Error updating article:', error);
        return new Response(JSON.stringify({ error: "Error updating article" }), { status: 500 });
    }
}
