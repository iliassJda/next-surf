"use client";

import styles from "./input.module.css";
import SearchLogo from "../navbar/Searchlogo/logo";
import { useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("q") || "";
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== searchQuery) {
        const encodedQuery = encodeURIComponent(inputValue);
        router.push(`/search?q=${encodedQuery}`);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(handler); // Cleanup on unmount or input change
  }, [inputValue, searchQuery, router]);

  // const onSearch = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   //console.log(query);
  //   //const encodedQuery = encodeURI(query);
  //   //router.push(`search?q=${encodedQuery}`);

  //   // const [query, setQuery] = useState("");

  //   // console.log("Current Query", encodedQuery);
  // };

  return (
    <div id={styles.search_div}>
      {/* <form onChange={onSearch}> */}
      <input
        // value={query}
        value={inputValue}
        // onChange={(event) => setQuery(event.currentTarget.value)}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        type="text"
        id={styles.search_bar}
        placeholder="Search a place to surf"
      />
      {/* </form> */}
      <SearchLogo />
    </div>
  );
}
