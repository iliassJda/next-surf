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
  const [isVisible, setIsVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  // modify the navbar based on the width of the screen
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 820);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // if the screen is small the seach button change the navbar: visible search bar or visible logo and account
  const toggleVisibility = () => {
    if (!isLargeScreen) setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    setInputValue(searchQuery); // Synchronize input with the query parameter on mount or URL update
  }, [searchQuery]);

  // This serves as a debounce. So whenever a user is typing in the searchbar, after 300ms of inactivity the querry is sent. That way it is much more user friendly since the user doesn't have to press enter or press on a search button.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== searchQuery) {
        const encodedQuery = encodeURIComponent(inputValue);

        router.push(`/search?q=${encodedQuery}`);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(handler); // Cleanup on unmount or input change
  }, [inputValue, searchQuery, router]);

  return (
    <div id={isVisible ? styles.prova : styles.search_div}>
      <>

        {(isLargeScreen || (isLargeScreen == false && isVisible == true)) && (
          // the search bar is visible if the screen is large or if the screen is small and the option selected is the searchbar
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            type="text"
            id={styles.search_bar}
            placeholder="Search a place to surf"
            className={styles.small_screen}
          />
        )}
      </>
      <SearchLogo onClick={toggleVisibility} />
    </div>
  );
}
