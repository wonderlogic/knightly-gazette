"use client";
import React, { useState, useEffect } from 'react';

const Homepage = () => {
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
        <div>
        <h1 className="text-2xl font-bold">Articles</h1>
        <div>
            {articles.map((article) => (
            <div key={article.id} className="p-4 m-4 border rounded">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p>{article.description}</p>
                {article.imageURL && <img src={article.imageURL} alt={article.title} />}
                <div>{article.body}</div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Homepage;
