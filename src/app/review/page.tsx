"use client";

import { auth } from "@/lib/auth";
import styles from "./review.module.css";
import Button from "@mui/material/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { postReview } from "@/action/review";

import { doToast } from "@/components/toast/toast";
import HoverRating from "@/components/rating/rating";

export default function Review() {
  const [review, setReview] = useState("");
  const search = useSearchParams();
  const titleQuery = search ? search.get("title") : null;
  const cityQuery = search ? search.get("city") : null;

  //   const session = await auth();

  const router = useRouter();

  const handleClick = async (formData: FormData) => {
    try {
      const response = await postReview(
        cityQuery as string,
        titleQuery as string,
        review,
        formData
      );
      doToast(response);
      if (response.toast == "success") {
        setReview("");
        router.back();
      } else {
        console.log("Review submission failed");
      }
    } catch (error) {
      console.log("Error submitting review:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Leave a review!</h1>
      <div className={styles.greyContainer}>
        <form action={handleClick}>
          <HoverRating />
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setReview(e.currentTarget.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
