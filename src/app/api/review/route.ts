import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const email = session?.user?.email;

    // console.log(email);

    const request = await req.json();
    const city = request.city;
    const title = request.title;
    const text = request.text;
    console.log(
      `Is the request: title = ${request.title}, text = ${request.text} and city = ${request.city}`
    );

    const spot = await prisma.surfSpot.findUnique({
      where: {
        city_title: {
          city,
          title,
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    console.log(user);

    const review = await prisma.review.create({
      data: {
        rating: 5,
        description: text,
        surfSpotId: spot?.id,
        userId: user?.id,
      },
    });

    console.log(`review: ${review.description}`);

    console.log(`This is the spot: ${spot?.userId}`);

    return NextResponse.json({ lol: "it looks great" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
