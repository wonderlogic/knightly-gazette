import React from "react";
import ButtonSecondary from "./ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";

const NewsCard = ({id,image,title,description}) => {
  return (
    <div key={id} className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={title} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>

        <div className="card-actions justify-between">
          <ButtonSecondary text="Edit" />
          <ButtonPrimary text="Read More" />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
