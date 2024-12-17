"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Review, SurfSpot } from "@prisma/client";
import { useSession } from "next-auth/react";

const updateSpotRating = async (spot: SurfSpot) => {
  // const reviews = await prisma.review;
  let currentMeanRating = 0;
  const surfSpotReviews = await prisma.surfSpot.findUnique({
    where: {
      id: spot.id, // Replace with the specific SurfSpot ID
    },
    include: {
      reviews: true, // Fetch all associated reviews
    },
  });

  surfSpotReviews.reviews.map(
    (review: Review) => (currentMeanRating += review.rating)
  );

  const newMeanRating =
    Math.round((currentMeanRating / surfSpotReviews?.reviews.length) * 100) /
    100;

  await prisma.surfSpot.update({
    where: {
      id: spot.id,
    },
    data: {
      meanRating: newMeanRating,
    },
  });

  // console.log(
  //   "is the new Mean Rating of the spot",
  //   spot.meanRating,
  //   "Is the number of reviews",
  //   surfSpotReviews?.reviews.length
  // );
};

const postReview = async (
  city: string,
  title: string,
  text: string,
  formData: FormData
) => {
  try {
    const session = await auth();
    // const session = await useSession();
    const email = session?.user?.email;
    // console.log("ik ben hier");
    const rating = formData.get("rating");
    // console.log(rating);

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
    console.log("test ik ben hier");

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        description: text,
        surfSpotId: spot?.id,
        userId: user.id,
        username: user.username,
      },
    });

    void updateSpotRating(spot);

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
    // console.log(city, title);
    const spot = await prisma.surfSpot.findUnique({
      where: {
        city_title: {
          city,
          title,
        },
      },
    });

    const surfSpotId = spot?.id;
    // console.log(`This is the current spot: ${spot}`);

    const reviews = await prisma.review.findMany({
      where: {
        surfSpotId: surfSpotId,
      },
    });

    // console.log(
    //   `These are the reviews of the spot: ${JSON.stringify(reviews)}`
    // );

    console.log("and the rating of the spot: ", spot?.meanRating);

    return { review: reviews, spotRating: spot?.meanRating };
  } catch (e) {
    console.log(`There has been an issue in Action/review ${e}`);
  }
};

const removeReview = async (reviewId: number) => {
  try {
    const deletedReview = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    const spot = await prisma.surfSpot.findUnique({
      where: {
        id: deletedReview.surfSpotId,
      },
    });

    updateSpotRating(spot);

    return {
      toast: "success",
      message: "Review has been removed successfuly",
    };
  } catch (e) {
    return {
      toast: "error",
      message: "There has been some issue with removing the review",
    };
  }
};

export { postReview, getReviews, removeReview };
