import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";

// export default async function handler(req: NextRequest, res: NextResponse) {
//   return NextResponse.json({ error: "Yo man" }, { status: 200 });
// }

export async function GET(req: NextRequest) {
  //   const { q: query } = req.query;
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (typeof query !== "string") {
      throw new Error("Invalid Request");
    }

    // const posts = await prisma.surfSpot.findMany({
    //   where: {
    //     title: {
    //       contains: query.toLowerCase(),
    //     },
    //   },
    //   // include: {
    //   //   userID: true,
    //   // },
    // });

    const result = await prisma.$transaction([
      prisma.surfSpot.findMany({
        where: {
          title: {
            contains: query.toLowerCase(),
          },
        },
      }),

      prisma.user.findMany({
        where: {
          username: {
            contains: query.toLowerCase(),
          },
        },
      }),
    ]);

    return NextResponse.json({ spots: result[0], users: result[1] });
  } catch (error) {
    return NextResponse.json(
      { error: "There has been an issue" },
      { status: 500 }
    );
  }
}
