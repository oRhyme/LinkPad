import React from 'react'

const Card = () => {
  return (
    <div className = "card bg-base-300 card-border w-72 h-80">
      <figure className = "w-full"><img src="mock.jpg" alt="" className = ""/></figure>
      <div className="card-body">
        <h2 className = "card-title">Don't Call Yourself</h2>
        <p>This article talks sm abt programmingggg</p>
        <div className="card-actions">
         <button className = "btn btn-primary">click</button>
        </div>
      </div>
    </div>
  )
}

export default Card