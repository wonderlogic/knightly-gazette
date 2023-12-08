import React from 'react';
import ButtonSecondary from './ButtonSecondary';

/**
 * SingleArticle - Component to display a single article.
 * 
 * @param {string} id - The unique identifier for the article.
 * @param {string} image - URL of the article's image.
 * @param {string} title - Title of the article.
 * @param {string} body - Body content of the article.
 * @param {string} date - Publication date of the article.
 */

const SingleArticle = ({ id, image, title, body, date }) => {
  
  // Splitting the article body into paragraphs, and formatting each with double line breaks
  const bodyParagraphs = body ? body.split('\n').map((paragraph, idx) => (
    <React.Fragment key={idx}>
      {idx !== 0 && <br />}
      {idx !== 0 && <br />}
      {paragraph}
    </React.Fragment>
  )) : [];

  // Formatting the date into a human-readable format
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  return (
    <div className="card w-full bg-base-100 shadow-xl p-10">
      <h2 className="card-title text-4xl mb-4">
        {title}
      </h2>

      {/* Displaying the formatted date */}
      <p className="text-lg mb-6">{formattedDate}</p>

      {/* 'Edit' button */}
      <div className="card-actions justify-between mb-10">
        <ButtonSecondary text="Edit" className="btn" />
      </div>

      {/* Rendering image if available */}
      {image && (
        <figure>
          <img
            src={'/' + image}
            alt={title}
          />
        </figure>
      )}

      {/* Rendering the article body */}
      <div className="card-body text-justify">
        {bodyParagraphs}
      </div>
    </div>
  );
}

export default SingleArticle;