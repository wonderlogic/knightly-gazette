import React from "react";
import ButtonSecondary from "./ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";

const NewsCard = ({id,image,title,description}) => {

  if(image!=null){
    return (
      <div key={id} className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt={title} />
        </figure>
  
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
  
          <div className="card-actions justify-between">
            <ButtonSecondary text="Edit" className={"btn"} />
            <ButtonPrimary text="Read More" className={"btn btn-primary"} onClick={()=>{console.log(id)}}/>
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div key={id} className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
  
          <div className="card-actions justify-between">
            <ButtonSecondary text="Edit" className={"btn mt-7"} />
            <ButtonPrimary text="Read More" className={"btn btn-primary mt-7"} onClick={()=>{console.log(id)}}/>
          </div>
        </div>
      </div>
    );
  }
  
};

export default NewsCard;
