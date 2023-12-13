"use client";
import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

/**
 * Homepage - A component that fetches and displays a list of articles.
 */

const Homepage = () => {
    // State to store the list of articles
    const [articles, setArticles] = useState([]);

    const [isEmpty, setIsEmpty] = useState(false); // Track if articles array is empty
    const [error, setError] = useState(null); // Track errors

    // useEffect hook to fetch articles when the component mounts
    useEffect(() => {
        // Asynchronous function to fetch articles from the API
        const loadArticles = async () => {
            try {
                const response = await fetch('/api/articles');
                const data = await response.json();
                if (data.length === 0) {
                    setIsEmpty(true);
                } else {
                    setArticles(data); // Update the state with the fetched articles
                }
            } catch (err) {
                setError('Encountered an error while fetching articles, please check the logs');
            }
        }

        loadArticles(); // Invoke the function to load articles
    }, []); // Empty dependency array to ensure it runs only once on mount

    if (error) {
        return <div>{error}</div>; // Display the error message
    }

    if (isEmpty) {
        return <div>There are no articles yet. Create one now :D</div>; // Display message for empty articles
    }

    return (
        <div className="flex flex-col gap-10 mb-16 ">
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