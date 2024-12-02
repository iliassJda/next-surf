"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import styles from "./search.module.css";
import { SurfSpot } from "@prisma/client";

const fetchPosts = async (url: string) => {
  // console.log("yo thest");
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

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts
  );

  if (!data?.posts) {
    return null;
  }

  // console.log("Search Params", data.posts);
  return (
    <div className={styles.page}>
      <div className={styles.greyContainer}>
        <div>
          {data.posts.map((post: any) => (
            <div key={post.id} className={styles.post}>
              <h2>{post.title}</h2>
              <img
                src={post.imageURL}
                alt="Surf image"
                width={400}
                height={200}
              />
              <p>
                Location: {post.latitude}, {post.longitude}
              </p>
              <hr className={styles.seperator} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  {
    /* {isLoading ? <div>Still loading</div> : <div>Here is the data {data}</div>} */
  }
}
