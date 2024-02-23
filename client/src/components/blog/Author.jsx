import React, { useEffect, useState } from 'react'
import './blog.css'
import axios from 'axios'
import { AiOutlineClockCircle, AiOutlineUser, AiOutlineShareAlt } from "react-icons/ai"
import dateFormat from 'dateformat'



const Author = ({author, date}) => {
  const [authorName, setAuthorName] = useState({})

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${author}`)
        setAuthorName(response.data)
        // console.log(authorName)
      } catch (error) {
        console.log(error)
      }
    }
    
    getAuthor()
    // console.log(authorName)
  }, [])

  return (
    <>
      <div className='date'>
        <div className='date-attribute'>
          <AiOutlineUser className='icon' /> 
          <label className='author-name' htmlFor=''>by {authorName.name}</label>
        </div>
        <div className='date-attribute'>
          <AiOutlineClockCircle className='icon' /> 
          <label htmlFor=''>{dateFormat(date, "mmm d, yyyy")}</label>
        </div>
        <div className='date-attribute'>
          <AiOutlineShareAlt className='icon' /> 
          <label htmlFor=''>Share</label>
        </div>
      </div>
    </>
  )
}

export default Author