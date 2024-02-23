import { React, useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

const DetailsAuthor = ({author}) => {
  const [authorName, setAuthorName] = useState({})

  useEffect(() => {
    const getAuthor = async () => {
      try {
        if(author) {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${author}`)
          setAuthorName(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    getAuthor()
    // console.log(authorName)
  }, [])
  
  return (
      <p className='author-name'>Author: {authorName.name}</p>
  )
}

export default DetailsAuthor