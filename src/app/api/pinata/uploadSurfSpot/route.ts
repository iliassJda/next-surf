import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinataConfig"
import { PrismaClient } from '@prisma/client';







async function imageUpload(req: NextRequest, file: File) {
    try {


        const uploadData = await pinata.upload.file(file)



        const url = await pinata.gateways.createSignedURL({
            cid: uploadData.cid,
            expires: Infinity,
        });

        return url

    } catch (e) {
        return NextResponse.json(
            { error: "failed to upload image" },
            { status: 500 }
        );
    }
}




async function saveToPrisma(imageUrl: string, userID: string){
    const prisma = new PrismaClient();
    try {
        const updatedUser = await prisma.post.create({
            data: {
                title: imageUrl,
                content : imageUrl,
                published: true,
                userID: userID,
            }
        });
    }
    catch (error){
        return NextResponse.json(
            {error: "prisma create failed"},
            {status: 500}
        );
    } finally {
        await prisma.$disconnect();
    }
}
export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as File;
    const userID = data.get("user") as string;


    try {
        const imageUrl = await imageUpload(request, file) as String;

            // @ts-ignore
        await saveToPrisma(imageUrl, userID);

        return NextResponse.json(imageUrl, {status: 200});
    } catch (e) {
        return NextResponse.json(
            {error: "post request failed"},
            {status: 500}
        );
    }

}
