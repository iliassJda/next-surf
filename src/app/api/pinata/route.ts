import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinataConfig"
import { PrismaClient } from '@prisma/client';
import { auth } from "@/lib/auth";
import {Session} from "node:inspector";
import {showToast} from "@/components/toast/toast";
import { useSession } from "next-auth/react"

async function imageUpload(req: NextRequest) {
    try {
        const data = await req.formData();
        const file: File | null = data.get("file") as unknown as File;
        const uploadData = await pinata.upload.file(file)



        const url = await pinata.gateways.createSignedURL({
            cid: uploadData.cid,
            expires: Infinity,
        });

        return url

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "failed to upload image" },
            { status: 500 }
        );
    }
}




async function savePrisma(imageUrl: string){
    const prisma = new PrismaClient();
    const session = await auth();
    const user = session?.user?.id as string
    console.log(user)
    try {
        const updatedUser = await prisma.post.create({
            data: {
                title: imageUrl,
                content : imageUrl,
                published: true,
                userID: "user"
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
    const { data: session, status } = useSession();

    if(status === "authenticated") {
        try {
            const imageUrl = await imageUpload(request) as String


            // @ts-ignore
            await savePrisma(imageUrl, 10)
            return NextResponse.json(imageUrl, {status: 200});
        } catch (e) {
            console.log(e);
            return NextResponse.json(
                {error: "post request failed"},
                {status: 500}
            );
        }
    }
    else{
        showToast("error", "you must be logged in to upload media");
    }
}
