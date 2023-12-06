"use client";
import React, { useState, useEffect } from 'react';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import NewsCard from './NewsCard';

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
        <div className="grid grid-cols-1 gap-6">
        
            {articles.map((article) => (
                <NewsCard id={article.id} image={article.imageURL} title={article.title} description={article.description}/>
            ))}

      </div>
    );
};

export default Homepage;
