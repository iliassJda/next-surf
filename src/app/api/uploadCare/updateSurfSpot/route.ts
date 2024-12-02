import prisma from "@/lib/db";
import {type NextRequest, NextResponse} from "next/server";



async function saveToPrisma(postID: number, pictureURL: string): Promise<void> {
    try {

        await prisma.surfSpot.update({
            where: {
                id: postID,
            },
            data: {
              imageURL: pictureURL,
            }
        })
    }
    catch (error) {
        console.log("failed to save to prisma");
        console.log(error);
    }
}



export async function POST(request: NextRequest) {
    const data = await request.formData();
    const fileUrl = data.get("fileUrl") as string;
    const postID = parseInt(data.get("postsID") as string);

    console.log(fileUrl);

    try {
        await saveToPrisma(postID, fileUrl);
        return NextResponse.json({postMessage: "succeeded"}, {status: 200});
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {error: "post request failed"},

            {status: 500}
        );
    }

}