import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";

// Get all the spots and users that match the search querry.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Get the querry from the url.
    const query = searchParams.get("q");

    if (typeof query !== "string") {
      throw new Error("Invalid Request");
    }

    // Match the users and spots with the querry. This results in an array with an array of spots and an array of users.
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
