"use client";

import styles from "./input.module.css";
import SearchLogo from "../navbar/Searchlogo/logo";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("q") || "";
  const [inputValue, setInputValue] = useState(searchQuery);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 820);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleVisibility = () => {
    if(!isLargeScreen)
      setIsVisible((prev) => !prev)
  }

  useEffect(() => {
    setInputValue(searchQuery); // Synchronize input with the query parameter on mount or URL update
  }, [searchQuery]);

  useEffect(() => {
    // if (pathname !== "/search") return;

    const handler = setTimeout(() => {
      // console.log(inputValue, searchQuery);
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
    <div id={isVisible ? styles.prova : styles.search_div} >
        <>
      {(isLargeScreen || (isLargeScreen==false && isVisible==true)) && <input
        // value={query}
        value={inputValue}
        // onChange={(event) => setQuery(event.currentTarget.value)}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        type="text"
        id={styles.search_bar}
        placeholder="Search a place to surf"
        className={styles.small_screen}
      />}
      </>
    <SearchLogo onClick={toggleVisibility}/>
    </div>
  );
}
