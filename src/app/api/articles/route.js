import { prisma } from "@/app/lib/prisma";
import path from 'path';
import fs from 'fs';

/**
 * GET - Asynchronously retrieves multiple articles from the database.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * @return {Response} - An HTTP Response object with the fetched articles data.
 */

export async function GET(request) {
    // Fetching multiple articles from the database using Prisma
    const data = await prisma.article.findMany();

    // Returning the articles data as a JSON response
    return new Response(JSON.stringify(data));
}

/**
 * POST - Asynchronously handles the creation of a new article, including image upload.
 * 
 * @param {Request} request - The incoming HTTP request object.
 * @return {Response} - An HTTP Response object indicating the result of the operation.
 */

export async function POST(request) {
    // Parse the incoming form data
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const body = formData.get('body');
    const imageFile = formData.get('image'); // This is the image file

    // Validate the input data
    if (!title || !description || !body) {
        return new Response(JSON.stringify({ error: "Missing fields" }), {
            status: 400,
        });
    }

    let imagePath = null;

    // Process the image file if it exists
    if (imageFile && imageFile.size > 0) {

        // Validate the file type
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(imageFile.type)) {
            return new Response(JSON.stringify({ error: "Invalid image format. Only JPEG and PNG are allowed." }), {
                status: 400,
            });
        }

        // Check if the image size is greater than 3 MB
        const maxImageSize = 3 * 1024 * 1024; // 3 MB in bytes
        if (imageFile.size > maxImageSize) {
            return new Response(JSON.stringify({ error: "Image file size exceeds the maximum limit of 3 MB." }), {
                status: 400,
            });
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

    // Create a new article in the database using Prisma
    try {

        // Initialize the data object for Prisma
        let articleData = {
            title,
            description,
            body,
        };

        // Conditionally add the imageURL if it exists
        if (imagePath) {
            articleData.imageURL = imagePath;
        }

        const newArticle = await prisma.article.create({
            data: articleData,
        });

        // Return the created article as a JSON response
        return new Response(JSON.stringify(newArticle), {
            status: 201, // HTTP status code for created
        });
    } catch (error) {
        console.error('Error creating article:', error);
        return new Response(JSON.stringify({ error: "Error creating article" }), {
            status: 500,
        });
    }
}