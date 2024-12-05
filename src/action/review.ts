"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

const postReview = async (
  city: string,
  title: string,
  text: string,
  formData: FormData
) => {
  try {
    const session = await auth();
    const email = session?.user?.email;
    console.log("ik ben hier");
    const rating = formData.get("rating");
    console.log(rating);

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

    if (!user) {
      return {
        message: "User is not registered yet",
        toast: "error",
      };
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        description: text,
        surfSpotId: spot?.id,
        userId: user?.id,
        userFirstName: user.firstname,
      },
    });

    return { message: "Review added succesfully", toast: "success" };
  } catch (e) {
    console.log(`error is ${e}`);
    return {
      message: "There has been an unexpected error, try again",
      toast: "error",
    };
  }
};

const getReviews = async (city: string, title: string) => {
  try {
    const spot = await prisma.surfSpot.findUnique({
      where: {
        city_title: {
          city,
          title,
        },
      },
    });

    const surfSpotId = spot?.id;
    //   console.log(`This is the current spot: ${surfSpotId}`);

    const reviews = await prisma.review.findMany({
      where: {
        surfSpotId: surfSpotId,
      },
    });

    //   console.log(`These are the reviews of the spot: ${JSON.stringify(reviews)}`);

    return reviews;
  } catch (e) {
    console.log(`There has been an issue in Action/review ${e}`);
  }
};

export { postReview, getReviews };
