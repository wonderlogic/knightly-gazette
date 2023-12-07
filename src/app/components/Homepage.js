"use client";
import React, { useState, useEffect } from 'react';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import NewsCard from './NewsCard';
import SingleArticle from './SingleArticle';

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
    
    const single = articles.slice(1,2)
    return (
        <div className="grid grid-cols-1 gap-6">
            {/* {articles.map((article) => (
                <NewsCard key={article.id} id={article.id} image={article.imageURL} title={article.title} description={article.description}/>
            ))} */}

            {
               single.map((article) => (
               <SingleArticle key={article.id} image={article.imageURL} title={article.title} body={article.body} date={article.createdAt}/>
            ))
            }
      </div>
    );
};

export default Homepage;
