"use client";

import React, { useState } from "react";
import styles from "@/app/account/account.module.css";
import { showToast } from "@/components/toast/toast";
import { followProfile } from "@/action/follow";
import { redirect } from "next/navigation";

// Button to let logged-in user follow another user which page we are visiting
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
      className={styles.submit}
    >
      {isLoading ? "Following..." : "Follow"}
    </button>
  );
};

export default Follow;

