"use client";

import React, { useState } from "react";
import styles from "@/app/account/[userName]/account.module.css";
import { showToast } from "@/components/toast/toast";
import { followProfile } from "@/action/follow";
import { redirect } from "next/navigation";


const Follow = (probs:any) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUsername = probs.currentUsername
  const usernameToFollow = probs.usernameToFollow
  const onFollow = probs.onFollow
  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/follow?currentUsername=${currentUsername}&usernameToFollow=${usernameToFollow}`,
        {method:"POST"}
      );
      //const response = await followProfile({currentUsername, usernameToFollow})

      if (response.ok) {
       showToast("success", "Followed successfully!");
       onFollow(); // Update parent state
      } 
    } catch (error) {
      showToast("error", "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
    
    redirect(`/account/${usernameToFollow}`);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={styles.button}
    >
      {isLoading ? "Following..." : "Follow"}
    </button>
  );
};

export default Follow;

