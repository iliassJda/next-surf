// 1. Install required dependencies
// npm install cloudinary @prisma/client
// npm install -D @types/cloudinary
const cloudinary = require("cloudinary").v2;
import { PrismaClient } from '@prisma/client'


// 2. Configure Cloudinary (typically in .env file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 3. Prisma Schema Example
// schema.prisma
// model User {
//   id        Int      @id @default(autoincrement())
//   name      String
//   profileImage String?
// }

// 4. Image Upload Function
async function uploadImageToCloudinary(file: string | Buffer) {
  try {
    // Upload file to Cloudinary
    const uploadResult: boolean = await new Promise(() => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'webtech',
          allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
          transformation: [
            { width: 500, height: 500, crop: 'limit' }
          ]
        },
      );

      // If file is a Buffer, pipe it directly
      // If it's a string (file path), read and pipe
      if (file instanceof Buffer) {
        uploadStream.end(file);
      } else {
        const fs = require('fs');
        fs.createReadStream(file).pipe(uploadStream);
      }
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Image upload failed');
  }
}

// 5. Complete Upload and Save to Database Function
async function handleImageUploadAndSave(
  file: string | Buffer,
  userId: number
) {
  const prisma = new PrismaClient();

  try {
    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(file);

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

export default handleImageUploadAndSave;