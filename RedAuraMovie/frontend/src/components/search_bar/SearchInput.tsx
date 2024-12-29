"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./search.module.css"

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch} className={styles.wrap}>
      <div className={styles.inputContainer}>
        <input
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
          className={styles.searchTerm}
        />
        <MagnifyingGlassIcon className={styles.magnifying_glass}/>
      </div>

    </form>
  );
};

export default SearchInput;