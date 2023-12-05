"use client";
import React, { useState, useEffect } from "react";

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
      <div className="navbar bg-base-100 justify-between">
        <div className="flex items-center space-x-4 py-8 ">
          <img
            src="images/knightly-gazette.png"
            alt="Knightly Gazette logo"
            className="h-24 w-24 rounded-md"
          />
          <h1 className="text-4xl font-bold text-base-content">
            Knightly Gazette
          </h1>
        </div>
        <div>
          <a className="btn btn-ghost text-xl">Home</a>
          <a className="btn btn-ghost text-xl">New post</a>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light"/></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark"/></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Corporate" value="corporate"/></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Business" value="business"/></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dim" value="dim"/></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
              <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
              <img src={article.imageURL} alt={article.title} />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p>{article.description}</p>
              <div className="card-actions justify-between">
                <button className="btn">Edit</button>
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
