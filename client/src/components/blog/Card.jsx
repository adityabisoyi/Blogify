import React from "react"
import "./blog.css"
// import { blog } from "../../assets/data/data"
import { AiOutlineTags } from "react-icons/ai"
import { Link } from "react-router-dom"
import Author from "./Author"

export const Card = ({blogId, title, description, author, date, category, thumbnail}) => {

  return (
    <>
              <div className='box boxItems' key={blogId}>
                <div className='img'>
                  <img src={thumbnail} alt='' />
                </div>
                <div className='details'>
                  <div className='tag'>
                    <AiOutlineTags className='icon' />
                    <Link to={`/categories/${category}`}>#{category}</Link>
                  </div>
                  
                  <Link to={`/posts/${blogId}`} key={blogId} className='card-link'>
                    <h3>{title}</h3>
                  </Link>
                  <p dangerouslySetInnerHTML={{__html: `${description.slice(0, 200)}...`}}></p>
                  {/* <p>{description.slice(0, 200)}...</p> */}
                  <Author author={author} date={date}/>
                </div>
              </div>
    </>
  )
}
