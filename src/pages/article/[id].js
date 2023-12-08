import SingleArticle from '@/app/components/SingleArticle';
import Navbar from '@/app/components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Importing useRouter from Next.js
import 'src/app/globals.css';

/**
 * ArticlePage - Component for displaying a single article based on its ID.
 */

const ArticlePage = () => {
    const [article, setArticle] = useState([]); // State to store the article data
    const router = useRouter(); // Using the useRouter hook from Next.js
    const { id } = router.query; // Extracting id from the router's query parameters

    // useEffect hook to fetch article data when the component mounts or id changes
    useEffect(() => {
        // Asynchronous function to load the article based on its ID
        async function loadArticle() {
            if (id) { // Checking if the ID is available
                const response = await fetch('/api/articles/' + id);
                const data = await response.json();
                setArticle(data); // Updating the state with the fetched article
            }
        }

        loadArticle();
    }, [id]); // Adding id as a dependency to re-run the effect when id changes

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
            <div className="grid grid-cols-1 gap-6">
                {/* Rendering the single article component */}
                <SingleArticle 
                    key={article.id} 
                    image={article.imageURL} 
                    title={article.title} 
                    body={article.body} 
                    date={article.createdAt}
                />
            </div>
        </div>
    );
};

export default ArticlePage;