"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useSession } from "next-auth/react";

import styles from "./search.module.css";
import { SurfSpot, User } from "@prisma/client";

import { Skeleton } from "@mui/material";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("failed to fetch posts");
  }

  return response.json();
};

export default function Search() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const router = useRouter();
  const { data: session, status } = useSession();

  // Client side rendering of the fetching of data
  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts
  );

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back(); // Goes to the previous page
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleEscapeKey);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className={styles.page}>
      <Skeleton />
      <div className={styles.greyContainer}>
        <div>
          {isLoading ? null : (
            <>
              {data.spots.map((post: SurfSpot) => (
                <div key={post.id} className={styles.post}>
                  <h2>{post.title}</h2>
                  <Link
                    href={`/places/${post.country}/${post.city}/${post.title}/${post.longitude}/${post.latitude}`}
                    replace
                  >
                    <img
                      className={styles.roundedSpot}
                      src={post.imageURL}
                      alt="Surf image"
                      width={400}
                      height={200}
                    />
                  </Link>
                  <hr className={styles.seperator} />
                </div>
              ))}
              ;
              {data.users
                .filter((post: User) => post.email !== session?.user?.email)
                .map((post: User) => (
                  <div key={post.id} className={styles.post}>
                    <h2>{post.username}</h2>
                    <Link href={`/account/${post.username}`} replace>
                      <img
                        className={styles.roundedProfile}
                        src={
                          post.profilePictureCID !== "none"
                            ? post.profilePictureCID
                            : "/images/defaultProfile.png"
                        }
                        alt="Profile Picture"
                        width={400}
                        height={200}
                      />
                    </Link>
                    <hr className={styles.seperator} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
