"use server"

// 1. Install required dependencies
// npm install cloudinary @prisma/client
// npm install -D @types/cloudinary
import upload from "@/components/imageUpload/upload";

const cloudinary = require("cloudinary").v2;
import { PrismaClient } from '@prisma/client'
import uploadImage from "@/lib/cloudinaryImageUpload";


// 2. Configure Cloudinary (typically in .env file)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




// 5. Complete Upload and Save to Database Function
async function handleImageUploadAndSave(
  file: string | Buffer,
  userId: number
) {
  const prisma = new PrismaClient();

  try {
    // Upload image to Cloudinary
    const imageUrl = await uploadImage(file);

    // Save URL to database
    const addPost = await prisma.post.create({
      data: {
        title: imageUrl,
        content: imageUrl,
        authorId: userId,
      }
    });

    return addPost;
  } catch (error) {
    console.error('Upload and Save Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 6. Example Usage in an API Route
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const userId = 10; //always the same user id for now.

  // Convert File to Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result = await handleImageUploadAndSave(buffer, userId);
    return Response.json({ success: true, user: result });
  } catch (error) {
    return Response.json({ success: false, error: "error" }, { status: 500 });
  }
}


export async function GET() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()

  return Response.json(posts)
}



export default handleImageUploadAndSave;