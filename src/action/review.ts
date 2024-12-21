"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Review, SurfSpot } from "@prisma/client";

// Calculates the mean rating of a spot based on the existing reviews of that spot.
const updateSpotRating = async (spot: SurfSpot) => {
  let currentMeanRating = 0;
  // Get all the reviews of a certain spot.
  const surfSpotReviews = await prisma.surfSpot.findUnique({
    where: {
      id: spot.id,
    },
    include: {
      reviews: true,
    },
  });

  //sum all the ratings
  surfSpotReviews.reviews.map(
    (review: Review) => (currentMeanRating += review.rating)
  );

  const newMeanRating =
    Math.round((currentMeanRating / surfSpotReviews?.reviews.length) * 100) /
    100; // This is for the two decimals

  //finaly update that spot with the calculated meanRating.
  await prisma.surfSpot.update({
    where: {
      id: spot.id,
    },
    data: {
      meanRating: newMeanRating,
    },
  });
};

const postReview = async (
  city: string,
  title: string,
  text: string,
  formData: FormData
) => {
  try {
    const session = await auth();
    const email = session?.user?.email;
    const rating = formData.get("rating");

    // First, find the spot where the review is being added. This is done by the combination of city and title since these are unique.
    const spot = await prisma.surfSpot.findUnique({
      where: {
        city_title: {
          city,
          title,
        },
      },
    });

    // Find the user that is adding the review since we need it for the relation user-review.
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
    // finally, add the review in the database.
    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        description: text,
        surfSpotId: spot?.id,
        userId: user.id,
        username: user.username,
      },
    });
    // Also, update the meanrating of the spot since a new review has been added.
    void updateSpotRating(spot);

    return { message: "Review added succesfully", toast: "success" };
  } catch (e) {
    return {
      message: "There has been an unexpected error, try again",
      toast: "error",
    };
  }
};

// get all the reviews for a certain spot
const getReviews = async (city: string, title: string) => {
  try {
    // Find the specific spot
    const spot = await prisma.surfSpot.findUnique({
      where: {
        city_title: {
          city,
          title,
        },
      },
    });

    const surfSpotId = spot?.id;

    const reviews = await prisma.review.findMany({
      where: {
        surfSpotId: surfSpotId,
      },
    });

    return { review: reviews, spotRating: spot?.meanRating };
  } catch (e) {
    console.log(`There has been an issue in Action/review ${e}`);
  }
};

const removeReview = async (reviewId: number) => {
  try {
    // Delete the review
    const deletedReview = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
    // Find the spot where the review is being deleted
    const spot = await prisma.surfSpot.findUnique({
      where: {
        id: deletedReview.surfSpotId,
      },
    });
    // Update the spot again without the removed review.
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
