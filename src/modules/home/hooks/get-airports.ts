"use client";
import { useState, useEffect } from "react";
import { Daum, SearchAirportApiResponse } from "../searchairports-types";

export const useAirports = (query: string) => {
  const [results, setResults] = useState<Daum[]>([]);
  const [debounceQuery, setDebounceQuery] = useState(query);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);

    return () => clearTimeout(timeId);
  }, [query]);
  useEffect(() => {
    if (!debounceQuery.trim()) {
      setResults([]);
      return;
    }
    const fetchAirport = async () => {
      const res = await fetch(`/api/search-airports?query=${debounceQuery}`);
      const data: SearchAirportApiResponse = await res.json();
      setResults(data.data);
    };
    fetchAirport();
  }, [debounceQuery]);
  return results;
};
