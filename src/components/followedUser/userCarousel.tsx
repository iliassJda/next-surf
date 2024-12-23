import React, { useState } from "react";
import Link from "next/link";
import ShowProfilePicture from "@/components/profilePicture/showPicture/getProfilePicture";
import styles from "./userCarousel.module.css";
import {
  AccountInfos,
  AccountInfo,
} from "../../types";
//User Carousel Is similar to country carousel but is adapted to show profiles picture which redirects you
//to the profile page of the user.
export default function UserCarousel({
  userInfos
}:{
  userInfos:AccountInfos;
}
) {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev:number) => (prev + 1) % userInfos.length);
  };

  const handlePrev = () => {
    setStartIndex((prev:number) =>
      prev === 0 ? userInfos.length - 1 : prev - 1
    );
  };

  const getVisibleImages = () => {
    const totalImages = userInfos.length;
    return [
      userInfos[(startIndex - 1 + totalImages) % totalImages],
      userInfos[startIndex],
      userInfos[(startIndex + 1) % totalImages],
    ];
  };

  const visibleImages = getVisibleImages();
  //if there is 3 or less users we show them directly else we show them as a carousel
  if (userInfos.length <= 3) {
    return (
      <div className={styles.Images}>
        <div className={styles.imagesWrapper}>
          {userInfos.map((current_account:AccountInfo, index:number) => (
            <div key={current_account.id} className={styles.imageContainer}>
            <Link href={`/account/${current_account.username}`}>
            <ShowProfilePicture width="70" height="70" img={current_account.profilePictureCID}/>
            </Link>
            <p>{current_account.username}</p>
            </div>
          ))}
          </div>
      </div>
    );
  } else {
    return (
      <div className={styles.carouselContainer}>
        <button 
          onClick={handlePrev} 
          className={styles.btn}
        >
          &lt;
        </button>
        <div className={styles.Images}>
          <div className={styles.imagesWrapper}>
            {visibleImages.map((current_account:AccountInfo, index:number) => (
              <div key={current_account.id} className={styles.imageContainer}>
              <Link href={`/account/${current_account.username}`}>
                <ShowProfilePicture width="60" height="60" img={current_account.profilePictureCID}/>
              </Link>
                <p>{current_account.username}</p>
              </div>
            ))}
          </div>
        </div>
        <button 
          onClick={handleNext} 
          className={styles.btn}
        >
          &gt;
        </button>
      </div>
    );
  }
}