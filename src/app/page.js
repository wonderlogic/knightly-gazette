"use client";
import React, { useState, useEffect } from 'react';

export default function Home() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
      async function loadArticles() {
          const response = await fetch('/api/articles');
          const data = await response.json();
          setArticles(data);
      }

      loadArticles();
  }, []);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start space-x-4 py-8">
          <img src='images/knightly-gazette.png' alt='Knightly Gazette logo' className="h-24 w-24" />
          <h1 className="text-4xl font-bold">Knightly Gazette</h1>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-8">Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-700 mb-4">{article.description}</p>
              {article.imageURL && (
                <img src={article.imageURL} alt={article.title} className="w-full object-cover object-center h-48 mb-4" />
              )}
            </div>
          ))}
        </div>
      </div>
  );
}
