import React from "react";
import ButtonSecondary from "./ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";

/**
 * NewsCard - A component to display a news article card.
 * 
 * @param {string} id - The unique identifier for the article.
 * @param {string} image - The URL of the article's image.
 * @param {string} title - The title of the article.
 * @param {string} description - A brief description of the article.
 */

const NewsCard = ({ id, image, title, description }) => {
  // Handler for the 'Read More' button click event
  const handleClick = () => {
    window.location.href = `/article/${id}`;
  };

  const handleEditClick = () => {
    window.location.href = `/edit-article/${id}`;
  }

  // Conditional rendering based on the presence of an image
  if (image != null) {
    return (
      <div key={id} className="card lg:card-side bg-base-100 shadow-xl">
        <figure >
            <img src={image} alt={title} />
        </figure>

        <div className="card-body min-w-[70%]">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>

          <div className="card-actions justify-between">
            <ButtonSecondary text="Edit" className="btn" onClick={handleEditClick}/>
            <ButtonPrimary text="Read More" className="btn btn-primary" onClick={handleClick} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div key={id} className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="">{description}</p>

          <div className="card-actions justify-between">
            <ButtonSecondary text="Edit" className="btn mt-7" onClick={handleEditClick}/>
            <ButtonPrimary text="Read More" className="btn btn-primary mt-7" onClick={handleClick} />
          </div>
        </div>
      </div>
    );
  }
};

export default NewsCard;