"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

function SearchPage() {
  const SearchParams = useSearchParams();
  const query = SearchParams.get("q");
  const category = SearchParams.get("category");
  const page = SearchParams.get("page");

  const allParams = Array.from(SearchParams.entries());
  console.log(allParams);

  return (
    <div>
      <h1>Search Page</h1>
      <p>Query: {query}</p>
      <p>Category: {category}</p>
      <p>Page: {page}</p>
    </div>
  );
}

export default SearchPage;
