"use client";
import prisma from "@/lib/db";
import styles from "./followedUser.module.css";
import {useSession} from "next-auth/react";
import React, {useEffect,useState} from 'react';
import UserCarousel from "@/components/followedUser/userCarousel";
import { AccountInfo, AccountInfos, } from "@/types";
import Link from "next/link";
import { getFollowingList } from "@/action/follow";


export default  function Following(probs: any) {
    const username = probs.username;
    const [accountInfos, setaccountInfos] = useState<AccountInfos>([]); // Default image
    const [isLoading, setIsLoading] = useState(true);

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
