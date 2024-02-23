import React, { useState, useEffect, useContext } from "react"
import "./details.css"
import "../../components/header/header.css"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { useParams } from "react-router-dom"
import axios from "axios"
import 'react-quill/dist/quill.bubble.css';
import DetailsAuthor from "./DetailsAuthor"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import Loader from "../../components/loader/Loader"

export const DetailsPages = () => {
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const uid = currentUser?.id
  
  useEffect(() => {
    // if(!token) {
    //   // uid = null
    // }
  })

  const { id } = useParams()
  const [blog, setBlog] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
        setBlog(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    
    getPost()
  }, [id])

  if(isLoading) {
    return <Loader />
  }

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/${id}`, {
          withCredentials: true,
          headers: {Authorization: `Bearer ${token}`}
        })
      console.log(response.data)
      if(response.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {blog ? (
        <section className='singlePage'>
          <div className='container'>
            <div className='right'>
              <div className="flex-disp">
                <h1>{blog.title}</h1>
                {(uid === blog.author ? 
                  <div className='buttons'>
                    <button className='button'>
                      <Link to={`/edit/${id}`}>
                        <BsPencilSquare size={18} />
                      </Link>
                    </button>
                    <button className='button'>
                      <AiOutlineDelete onClick={deletePost} size={18} />
                    </button>
                  </div>
                : <></>)}
              
              </div>

              <div className='left'>
                <img src={blog.thumbnail} alt='' />
              </div>
              
              <div className="desc-block">
                <p dangerouslySetInnerHTML={{__html: blog.description}}></p>
              </div>
              <DetailsAuthor author={blog.author}/>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
  