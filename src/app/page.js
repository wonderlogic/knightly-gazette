"use client";
import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";

/**
 * Home - Main page of the web application.
 */

export default function Home() {
  // State to store articles
  const [articles, setArticles] = useState([]);

  // useEffect hook to fetch articles from the API
  useEffect(() => {
    // Asynchronous function to load articles
    async function loadArticles() {
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data); // Update the state with the fetched articles
    }

    loadArticles(); // Invoke the function to load articles
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="flex flex-col justify-top items-center">
      
      <div className="fixed z-10 flex flex-row justify-center items-center w-7/12">
        <Navbar />
      </div>
      <div className="w-7/12 mt-52">
        <Homepage />
      </div>
     
    </div>
  );
}