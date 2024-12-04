"use client";

import { auth } from "@/lib/auth";
import styles from "./review.module.css";
import Button from "@mui/material/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Review() {
  const [review, setReview] = useState("");
  const search = useSearchParams();
  const titleQuery = search ? search.get("title") : null;
  const cityQuery = search ? search.get("city") : null;

  //   const session = await auth();

  const router = useRouter();

  const handleClick = async () => {
    try {
      //   console.log(searchQuery);
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleQuery,
          text: review,
          city: cityQuery,
        }),
      });

      const body = await response.json();
      console.log(body);
      //   if (response.ok) {
      //     // Clear input and reset rating
      //     setReview("");
      //     router.push("/reviews");
      //   } else {
      //     // Handle error
      //     console.error("Review submission failed");
      //   }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Leave a review!</h1>
      <div className={styles.greyContainer}>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => setReview(e.currentTarget.value)}
        />
        <Button onClick={handleClick} variant="outlined">
          Send
        </Button>
      </div>
    </div>
  );
}
