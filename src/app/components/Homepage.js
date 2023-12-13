"use client";
import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

/**
 * Homepage - A component that fetches and displays a list of articles.
 */

const Homepage = () => {
    // State to store the list of articles
    const [articles, setArticles] = useState([]);

    // useEffect hook to fetch articles when the component mounts
    useEffect(() => {
        // Asynchronous function to fetch articles from the API
        const loadArticles = async () => {
            const response = await fetch('/api/articles');
            const data = await response.json();
            setArticles(data); // Update the state with the fetched articles
        }

        loadArticles(); // Invoke the function to load articles
    }, []); // Empty dependency array to ensure it runs only once on mount

    return (
        <div className="flex flex-col gap-10 mb-16 w-full">
            {/* Map over the articles array and render a NewsCard for each article */}
            {articles.map((article) => (
                <NewsCard 
                    key={article.id} // Unique key for each article
                    id={article.id} 
                    image={article.imageURL} 
                    title={article.title} 
                    description={article.description}
                />
            ))}
        </div>
    );
};

export default Homepage;