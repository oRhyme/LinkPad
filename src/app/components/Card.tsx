import React from 'react'

const Card = ({title,description,image}:{title:string, description:string,image:string}) => {
  return (
    <div className = "card bg-base-300 card-border w-72 h-80">
      <figure className = "w-full"><img src={image}/></figure>
      <div className="card-body">
        <h2 className = "card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
         <button className = "btn btn-primary">click</button>
        </div>
      </div>
    </div>
  )
}

export default Card