"use client";
import React, { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadArticles() {
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data);
    }

    loadArticles();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar/>
      <Homepage/>
    </div>
  );
}
