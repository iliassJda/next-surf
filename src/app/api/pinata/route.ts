import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinataConfig"
import { PrismaClient } from '@prisma/client';



async function imageUpload(req: NextRequest) {
    try {
        const data = await req.formData();
        const file: File | null = data.get("file") as unknown as File;
        const uploadData = await pinata.upload.file(file)


        const url = await pinata.gateways.createSignedURL({
            cid: uploadData.cid,
            expires: 2600,
        });
        return url;
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "failed to upload image" },
            { status: 500 }
        );
    }
}




async function savePrisma(imageUrl: string, userID: number){
    const prisma = new PrismaClient();
    try {
        const updatedUser = await prisma.post.create({
            data: {
                title: imageUrl,
                content: imageUrl,
                published: true,
                authorId: userID,

            }
        });
    }
    catch (error){
        console.log(error);
        return NextResponse.json(
            {error: "prisma create failed"},
            {status: 500}
        );
    } finally {
        await prisma.$disconnect();
    }
}
export async function POST(request: NextRequest) {
    try {
        const imageUrl = await imageUpload(request) as String

        // @ts-ignore
        await savePrisma(imageUrl, 10)

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            {error: "post request failed"},
            {status: 500}
        );
    }
}
