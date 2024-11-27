import prisma from "@/lib/db";
import {type NextRequest, NextResponse} from "next/server";;


async function saveToPrisma(imageUrl: string, userID: string){
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
    }
}
export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("surfSpotURL") as string;
    const userEmail = data.get("userEmail") as string;


    try {
        const imageUrl = await saveToPrisma(file, userEmail);


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