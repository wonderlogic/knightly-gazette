import React from 'react'

const SingleArticle = ({id,image,title,body,date}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl p-10 ">
         <h2 className="card-title text-4xl mb-10">
          {title}
        </h2>
    
      <figure>
        <img
          src={image}
          alt={title}
        />
      </figure>

      <div className="card-body text-justify">
       
        <p>{body}</p>
      </div>
    </div>
  );
}

export default SingleArticle