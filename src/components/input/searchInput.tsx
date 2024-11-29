"use client";

import styles from "./input.module.css";
import SearchLogo from "../navbar/Searchlogo/logo";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(query);
    const encodedQuery = encodeURI(query);
    router.push(`search?q=${encodedQuery}`);

    // console.log("Current Query", encodedQuery);
  };

  return (
    <div id={styles.search_div}>
      <form onChange={onSearch}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          id={styles.search_bar}
          placeholder="Search a place to surf"
        />
      </form>
      <SearchLogo />
    </div>
  );
}
