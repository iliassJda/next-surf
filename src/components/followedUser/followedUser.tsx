"use client";
import styles from "./followedUser.module.css";
import React, {useEffect,useState} from 'react';
import UserCarousel from "@/components/followedUser/userCarousel";
import { AccountInfos } from "@/types";


export default  function Following(probs: any) {
    const username = probs.username;
    const [accountInfos, setaccountInfos] = useState<AccountInfos>([]); // Default image
    const [isLoading, setIsLoading] = useState(true);
    //Fetch all the account the logged-in user follows
    useEffect(() => {
      const fetchFollowing = async () => {
        try {
          const res = await fetch(`/api/followList/following?username=${username}`);
          
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setaccountInfos(data); // Set the following list
          } 
        } catch (error) {
          console.error("Error fetching following list:", error); // Log only actual errors
        } finally {
          setIsLoading(false); // Always mark loading as complete
        }
      };
    
      fetchFollowing();
    }, [username]);
    
    

    if (isLoading) {
        return <div>Loading...</div>;
    }
    // if there are accounts that user follow show user carousel else show "doesn't follow anyone"
    return(
        <div className={styles.container}>
          {accountInfos.length === 0 ? (
            <p> Doesn't follow anyone</p>
          ) : (        
            <UserCarousel userInfos={accountInfos}/>
          )}
        </div>
    );
}
